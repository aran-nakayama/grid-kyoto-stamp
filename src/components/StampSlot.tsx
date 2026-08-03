"use client";

import type { CSSProperties } from "react";
import { Street } from "@/lib/types";
import { findDesign, streetText } from "@/data/streets";
import { useI18n } from "@/contexts/I18nContext";
import { StampFace } from "./StampFace";

interface StampSlotProps {
  street: Street;
  /** シート上の位置。押した時の傾きを変えるためだけに使う（巡る順番ではない） */
  index: number;
  acquired: boolean;
  /** 獲得済みのとき、来場者が選んだ絵柄の id */
  designId?: string;
  onSelect: (street: Street) => void;
}

// 手で押したような気持ちにするため、マスごとに少しだけ傾きを変える
const TILT = [-6, 5, -4, 6, -5];

export function StampSlot({
  street,
  index,
  acquired,
  designId,
  onSelect,
}: StampSlotProps) {
  const { locale } = useI18n();
  const text = streetText(street, locale);
  const design = findDesign(street, designId);

  return (
    <button
      onClick={() => onSelect(street)}
      className="flex flex-col items-center gap-2 w-24 active:scale-95 transition-transform"
    >
      {acquired ? (
        <StampFace
          design={design}
          // 傾きは CSS 変数で渡し、ポンと現れるアニメーションの終点にも使う
          className="w-24 h-24 border-4 border-white shadow-lg stamp-tilt animate-stamp-pop"
          emojiClassName="text-5xl"
          style={
            {
              boxShadow: `0 6px 16px -3px ${design.color}80`,
              "--tilt": `${TILT[index % TILT.length]}deg`,
              animationDelay: `${index * 90}ms`,
            } as CSSProperties
          }
        />
      ) : (
        // 空きマスは点線の丸。番号を振ると巡る順番に見えてしまうので「?」にしている
        <div className="w-24 h-24 rounded-full flex items-center justify-center border-4 border-dashed border-primary/25 bg-primary/5">
          <span className="text-3xl font-bold text-primary/30">?</span>
        </div>
      )}
      <span
        className={`text-sm text-center leading-tight ${
          acquired ? "text-foreground font-bold" : "text-muted font-medium"
        }`}
      >
        {text.shortName}
      </span>
    </button>
  );
}
