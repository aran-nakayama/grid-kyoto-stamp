import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { I18nProvider } from "@/contexts/I18nContext";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  // metadata.manifest には basePath が自動付与されないため明示的に付ける
  manifest: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/manifest.json`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  themeColor: "#2a1a35",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans" style={{ paddingBottom: "64px" }} suppressHydrationWarning>
        <I18nProvider>
          {children}
          <BottomNav />
        </I18nProvider>
      </body>
    </html>
  );
}
