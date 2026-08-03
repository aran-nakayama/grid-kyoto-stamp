"use client";

import { Street } from "@/lib/types";
import { findDesign, streetText } from "@/data/streets";
import { useI18n } from "@/contexts/I18nContext";
import { StampFace } from "./StampFace";

interface StampSlotProps {
  street: Street;
  acquired: boolean;
  /** 獲得済みのとき、来場者が選んだ絵柄の id */
  designId?: string;
  onSelect: (street: Street) => void;
}

export function StampSlot({
  street,
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
      className="flex flex-col items-center gap-2"
    >
      {acquired ? (
        <StampFace
          design={design}
          className="w-20 h-20 border-2 shadow-lg transition-all duration-300"
          style={{
            borderColor: design.color,
            boxShadow: `0 10px 15px -3px ${design.color}4d`,
          }}
        />
      ) : (
        <div className="w-20 h-20 rounded-full flex items-center justify-center border-2 bg-stamp-empty border-border text-muted scale-95 opacity-60 transition-all duration-300">
          <span className="text-sm">?</span>
        </div>
      )}
      <span
        className={`text-xs text-center leading-tight max-w-[88px] line-clamp-2 ${
          acquired ? "text-foreground font-medium" : "text-muted"
        }`}
      >
        {text.name}
      </span>
    </button>
  );
}
