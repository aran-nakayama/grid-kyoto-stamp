// スマホ実機で開発中の画面を確認するための起動スクリプト。
// LAN IP を自動検出し、そのURLとQRコードをターミナルに表示してから next dev を起動する。
//
//   npm run dev:mobile          … http で起動（カメラ以外はすべて確認できる）
//   npm run dev:mobile -- --https … https で起動（QRスキャンのカメラを試したいとき）
import { spawn } from "node:child_process";
import { networkInterfaces } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const useHttps = process.argv.includes("--https");
const port = process.env.PORT || "3000";

function findLanAddress() {
  const candidates = Object.values(networkInterfaces())
    .flat()
    .filter((iface) => iface?.family === "IPv4" && !iface.internal)
    .map((iface) => iface.address);

  // 家庭・オフィスのWi-Fiで使われるプライベートアドレスを優先する
  return (
    candidates.find((ip) => ip.startsWith("192.168.")) ??
    candidates.find((ip) => ip.startsWith("10.")) ??
    candidates[0] ??
    null
  );
}

const ip = findLanAddress();

if (!ip) {
  console.error(
    "\nLANのIPアドレスが見つかりませんでした。Wi-Fiに接続されているか確認してください。\n"
  );
  process.exit(1);
}

const url = `${useHttps ? "https" : "http"}://${ip}:${port}`;

console.log(`\nスマホで以下のURLを開いてください（同じWi-Fiに接続している必要があります）\n`);
console.log(`    ${url}\n`);
console.log(await QRCode.toString(url, { type: "terminal", small: true }));

if (useHttps) {
  console.log(
    "https モードです。初回は証明書の作成でMacのパスワードを聞かれることがあります。\n" +
      "スマホでは「この接続ではプライバシーが保護されません」と警告が出ますが、\n" +
      "詳細を開いてそのまま進めばアクセスできます。\n"
  );
}

const args = ["dev"];
if (useHttps) {
  // 証明書に載せるホスト名として渡す必要があるため、LAN IP を明示する
  args.push("--experimental-https", "-H", ip);
}

// node で直接実行された場合も動くよう、next の実体を絶対パスで解決する
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextBin = path.join(projectRoot, "node_modules", ".bin", "next");

spawn(nextBin, args, { stdio: "inherit" }).on("exit", (code) =>
  process.exit(code ?? 0)
);
