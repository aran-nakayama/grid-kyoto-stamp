import QRCode from "qrcode";
import { streets } from "../src/data/streets";
import * as fs from "fs";
import * as path from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUTPUT_DIR = path.join(__dirname, "..", "public", "qrcodes");

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const street of streets) {
    const url = `${BASE_URL}/stamp/${street.stampToken}`;
    const outputPath = path.join(OUTPUT_DIR, `${street.id}.png`);

    await QRCode.toFile(outputPath, url, {
      width: 400,
      margin: 2,
      color: { dark: "#2d2320", light: "#ffffff" },
    });

    console.log(`Generated: ${street.id} - ${street.name} -> ${url}`);
  }

  console.log(`\nDone! ${streets.length} QR codes saved to ${OUTPUT_DIR}`);
}

main().catch(console.error);
