import type { NextConfig } from "next";

// 本番ビルド（GitHub Pages）のみサブパス配下で配信。開発時は http://localhost:3000 直下
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/grid-kyoto-stamp" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  allowedDevOrigins: ["192.168.0.48"],
};

export default nextConfig;
