"use client";

import { Street } from "@/lib/types";
import { streetText } from "@/data/streets";
import { useI18n } from "@/contexts/I18nContext";

interface StreetDetailModalProps {
  street: Street;
  acquired: boolean;
  onClose: () => void;
}

export function StreetDetailModal({
  street,
  acquired,
  onClose,
}: StreetDetailModalProps) {
  const { t, locale } = useI18n();
  const text = streetText(street, locale);

  return (
    <div
      className="fixed inset-0 z-[10001] bg-black/50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-card w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl text-white shrink-0"
            style={{ backgroundColor: street.color }}
          >
            {street.emoji}
          </div>
          <div>
            <h2 className="text-lg font-bold">{text.name}</h2>
            <p className="text-sm text-muted">
              {t.streets.themeLabel}: {text.theme}
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed">{text.description}</p>

        <div
          className={`rounded-xl p-4 text-center text-sm ${
            acquired
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-stamp-empty/50 text-muted border border-border"
          }`}
        >
          <p className="font-bold mb-1">
            {acquired ? `✅ ${t.streets.acquired}` : t.streets.notAcquired}
          </p>
          <p>{acquired ? t.streets.acquiredDesc : t.streets.notAcquiredDesc}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-primary text-white py-3 rounded-full font-medium hover:bg-primary-light transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
}
