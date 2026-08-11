"use client";

import type { CSSProperties } from "react";
import { streets, findDesign, streetText } from "@/data/streets";
import { useI18n } from "@/contexts/I18nContext";
import { useStamps } from "@/hooks/useStamps";
import { StampFace } from "./StampFace";

interface CompleteCelebrationProps {
  onClose: () => void;
}

// 空から降ってくるお菓子。乱数だとサーバー側の描画と食い違うので固定値にしている
const FALLING = [
  { emoji: "🍬", left: "6%", delay: "0s", dur: "3.2s", size: "text-3xl", spin: "320deg" },
  { emoji: "🎃", left: "18%", delay: "1.1s", dur: "4.1s", size: "text-4xl", spin: "-260deg" },
  { emoji: "🍭", left: "29%", delay: "0.4s", dur: "3.6s", size: "text-3xl", spin: "400deg" },
  { emoji: "👻", left: "41%", delay: "1.8s", dur: "4.4s", size: "text-4xl", spin: "-180deg" },
  { emoji: "🍫", left: "52%", delay: "0.8s", dur: "3.1s", size: "text-2xl", spin: "300deg" },
  { emoji: "🦇", left: "63%", delay: "2.2s", dur: "3.9s", size: "text-3xl", spin: "-340deg" },
  { emoji: "🧁", left: "74%", delay: "0.2s", dur: "4.2s", size: "text-3xl", spin: "280deg" },
  { emoji: "⭐", left: "86%", delay: "1.5s", dur: "3.4s", size: "text-2xl", spin: "360deg" },
  { emoji: "🍬", left: "94%", delay: "2.6s", dur: "3.7s", size: "text-3xl", spin: "-300deg" },
  { emoji: "🌙", left: "12%", delay: "2.9s", dur: "4.6s", size: "text-2xl", spin: "220deg" },
  { emoji: "🍭", left: "35%", delay: "3.3s", dur: "3.3s", size: "text-2xl", spin: "-380deg" },
  { emoji: "🎃", left: "58%", delay: "3.8s", dur: "4.0s", size: "text-3xl", spin: "340deg" },
  { emoji: "✨", left: "80%", delay: "3.0s", dur: "3.5s", size: "text-2xl", spin: "300deg" },
  { emoji: "🍫", left: "24%", delay: "4.3s", dur: "3.8s", size: "text-3xl", spin: "-240deg" },
  { emoji: "👻", left: "68%", delay: "4.7s", dur: "4.3s", size: "text-2xl", spin: "260deg" },
];

export function CompleteCelebration({ onClose }: CompleteCelebrationProps) {
  const { t, locale } = useI18n();
  const { designIdOf } = useStamps();

  return (
    <div className="fixed inset-0 z-[10002] overflow-hidden bg-gradient-to-b from-night via-night-light to-night flex items-center justify-center px-5">
      {/* 降ってくるお菓子 */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {FALLING.map((item, i) => (
          <span
            key={i}
            className={`absolute top-0 ${item.size} animate-candy-fall`}
            style={
              {
                left: item.left,
                animationDelay: item.delay,
                "--dur": item.dur,
                "--spin": item.spin,
              } as CSSProperties
            }
          >
            {item.emoji}
          </span>
        ))}
      </div>

      <div className="relative text-center text-white max-w-sm w-full">
        <p className="text-7xl mb-3 animate-hop inline-block">🎃</p>

        <h1 className="text-4xl font-bold mb-3 animate-title-pop text-primary-light drop-shadow-lg">
          {t.progress.complete}
        </h1>

        <p
          className="text-lg font-bold mb-1 animate-title-pop"
          style={{ animationDelay: "200ms" }}
        >
          {t.celebrate.message}
        </p>
        <p
          className="text-sm text-white/70 mb-7 animate-title-pop"
          style={{ animationDelay: "320ms" }}
        >
          {t.celebrate.sub}
        </p>

        {/* 集めた5つのスタンプを順番に見せる */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {streets.map((street, i) => {
            const design = findDesign(street, designIdOf(street.id));
            return (
              <div
                key={street.id}
                className="flex flex-col items-center gap-1 animate-stamp-pop"
                style={{ animationDelay: `${450 + i * 130}ms` }}
              >
                <StampFace
                  design={design}
                  className="w-24 h-24 border-2 border-white/90"
                  emojiClassName="text-5xl"
                />
                <span className="text-xs text-white/80">
                  {streetText(street, locale).shortName}
                </span>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="bg-primary-light text-white px-8 py-3.5 rounded-full font-bold text-base shadow-lg active:scale-95 transition-transform animate-title-pop"
          style={{ animationDelay: "1.2s" }}
        >
          {t.celebrate.close}
        </button>
      </div>
    </div>
  );
}
