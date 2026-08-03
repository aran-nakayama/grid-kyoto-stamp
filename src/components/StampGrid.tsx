"use client";

import { useState } from "react";
import { useStamps } from "@/hooks/useStamps";
import { CompleteCelebration } from "./CompleteCelebration";
import { useI18n } from "@/contexts/I18nContext";
import { Street } from "@/lib/types";
import { streets } from "@/data/streets";
import { StampSlot } from "./StampSlot";
import { ProgressBar } from "./ProgressBar";

interface StampGridProps {
  onSelectStreet: (street: Street) => void;
}

export function StampGrid({ onSelectStreet }: StampGridProps) {
  const { hasStamp, designIdOf, progress, isComplete } = useStamps();
  const { t } = useI18n();
  const [showCelebration, setShowCelebration] = useState(false);

  return (
    <div className="space-y-5">
      <ProgressBar acquired={progress.acquired} total={progress.total} />

      {/* 紙のスタンプ台紙に見えるよう、丸い枠と切り取り線風の区切りで囲う */}
      {/* 枠(4px)と余白の合計が広すぎると3列に収まらなくなるので p-3 にしている */}
      <div className="bg-gradient-to-b from-white to-[#fff7ec] rounded-[2rem] border-4 border-primary/15 shadow-lg p-3">
        <div className="text-center pb-3 mb-5 border-b-2 border-dashed border-primary/20">
          <p className="text-base font-bold text-primary">
            🎃 {t.home.sheetTitle} 🦇
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-2 gap-y-6">
          {streets.map((street, index) => (
            <StampSlot
              key={street.id}
              street={street}
              index={index}
              acquired={hasStamp(street.id)}
              designId={designIdOf(street.id)}
              onSelect={onSelectStreet}
            />
          ))}
        </div>

        {isComplete && (
          // タップすればお祝い画面を何度でも見返せる
          <button
            onClick={() => setShowCelebration(true)}
            className="w-full mt-5 pt-4 border-t-2 border-dashed border-primary/20 text-center animate-party-pop active:scale-95 transition-transform"
            style={{ animationDelay: "600ms" }}
          >
            <p className="text-3xl mb-1 animate-party-wiggle inline-block">🎉</p>
            <p className="text-lg font-bold text-primary">
              {t.progress.complete}
            </p>
            <p className="text-sm text-muted mt-1">
              {t.progress.completeMessage}
            </p>
            <p className="text-xs text-primary/70 font-bold mt-2">
              ▶ {t.celebrate.replay}
            </p>
          </button>
        )}
      </div>

      {showCelebration && (
        <CompleteCelebration onClose={() => setShowCelebration(false)} />
      )}
    </div>
  );
}
