import { LanguageSwitcher } from "./LanguageSwitcher";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    // 夜空のグラデーション＋かぼちゃ色のラインでハロウィンらしさを出す
    <header className="bg-gradient-to-br from-night via-night to-night-light text-white px-4 py-5 relative z-[10000] border-b-4 border-primary-light">
      <div className="max-w-lg mx-auto flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-sm text-white/80 mt-1">{subtitle}</p>
          )}
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
