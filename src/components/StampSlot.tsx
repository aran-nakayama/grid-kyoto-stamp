"use client";

import { Street } from "@/lib/types";
import { streetText } from "@/data/streets";
import { useI18n } from "@/contexts/I18nContext";

interface StampSlotProps {
  street: Street;
  acquired: boolean;
  onSelect: (street: Street) => void;
}

export function StampSlot({ street, acquired, onSelect }: StampSlotProps) {
  const { locale } = useI18n();
  const text = streetText(street, locale);

  return (
    <button
      onClick={() => onSelect(street)}
      className="flex flex-col items-center gap-2"
    >
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
          acquired
            ? "text-white shadow-lg scale-100"
            : "bg-stamp-empty border-border text-muted scale-95 opacity-60"
        }`}
        style={
          acquired
            ? {
                backgroundColor: street.color,
                borderColor: street.color,
                boxShadow: `0 10px 15px -3px ${street.color}4d`,
              }
            : undefined
        }
      >
        {acquired ? (
          <span className="text-3xl">{street.emoji}</span>
        ) : (
          <span className="text-sm">?</span>
        )}
      </div>
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
