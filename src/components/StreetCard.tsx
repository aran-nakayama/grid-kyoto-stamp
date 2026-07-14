"use client";

import { Street } from "@/lib/types";
import { streetText } from "@/data/streets";
import { useI18n } from "@/contexts/I18nContext";

interface StreetCardProps {
  street: Street;
  acquired: boolean;
}

export function StreetCard({ street, acquired }: StreetCardProps) {
  const { t, locale } = useI18n();
  const text = streetText(street, locale);

  return (
    <div
      className="bg-card rounded-xl border border-border p-4 flex gap-4"
      style={{ borderLeftWidth: 4, borderLeftColor: street.color }}
    >
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0 ${
          acquired ? "text-white" : "bg-stamp-empty text-muted"
        }`}
        style={acquired ? { backgroundColor: street.color } : undefined}
      >
        {acquired ? street.emoji : "?"}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="font-bold">{text.name}</h2>
          <span
            className="text-xs px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: street.color }}
          >
            {text.theme}
          </span>
        </div>
        <p className="text-sm text-muted mt-1 leading-relaxed">
          {text.description}
        </p>
        <p
          className={`text-xs mt-2 font-medium ${
            acquired ? "text-green-700" : "text-muted"
          }`}
        >
          {acquired ? `✅ ${t.streets.acquired}` : t.streets.notAcquired}
        </p>
      </div>
    </div>
  );
}
