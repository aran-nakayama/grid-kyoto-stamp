import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

// 本番ビルド（GitHub Pages）のみサブパス配下で配信。開発時は http://localhost:3000 直下
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/grid-kyoto-stamp" : "";

// スマホ実機確認用に、このマシンのLAN IPからの開発サーバーアクセスを許可する。
// Wi-Fiが変わってIPが変わっても追従するよう、固定値ではなく実際のIPを列挙する
function localNetworkAddresses(): string[] {
  return Object.values(networkInterfaces())
    .flat()
    .filter((iface) => iface?.family === "IPv4" && !iface.internal)
    .map((iface) => iface!.address);
}

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // 静的書き出しでは画像の最適化サーバーが無いため、そのまま配信する
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: localNetworkAddresses(),
};

export default nextConfig;
