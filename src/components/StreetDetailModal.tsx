"use client";

import { Street } from "@/lib/types";
import { findDesign, streetText } from "@/data/streets";
import { useI18n } from "@/contexts/I18nContext";
import { useStamps } from "@/hooks/useStamps";
import { StampFace } from "./StampFace";

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
  const { designIdOf, changeDesign } = useStamps();
  const text = streetText(street, locale);
  const selectedId = findDesign(street, designIdOf(street.id)).id;

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

        {acquired ? (
          <div className="rounded-xl p-4 bg-green-50 border border-green-200 space-y-3">
            <p className="text-sm font-bold text-green-800 text-center">
              ✅ {t.streets.acquired}
            </p>
            <p className="text-xs text-muted text-center">
              {t.streets.designLabel}
              {street.designs.length > 1 && `（${t.streets.changeDesign}）`}
            </p>
            <div className="flex justify-center gap-5">
              {street.designs.map((design) => {
                const isSelected = design.id === selectedId;
                return (
                  <button
                    key={design.id}
                    onClick={() => changeDesign(street.id, design.id)}
                    className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <StampFace
                      design={design}
                      className={`w-16 h-16 transition-all ${
                        isSelected
                          ? "ring-4 ring-offset-2 ring-green-500"
                          : "opacity-40"
                      }`}
                      emojiClassName="text-2xl"
                    />
                    <span
                      className={`text-xs ${
                        isSelected ? "font-bold" : "text-muted"
                      }`}
                    >
                      {locale === "en" ? design.nameEn : design.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="rounded-xl p-4 text-center text-sm bg-stamp-empty/50 text-muted border border-border">
            <p className="font-bold mb-1">{t.streets.notAcquired}</p>
            <p>{t.streets.notAcquiredDesc}</p>
          </div>
        )}

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
