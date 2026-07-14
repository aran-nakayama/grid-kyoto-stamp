"use client";

import { useStamps } from "@/hooks/useStamps";
import { useI18n } from "@/contexts/I18nContext";
import { Street } from "@/lib/types";
import { streets } from "@/data/streets";
import { StampSlot } from "./StampSlot";
import { ProgressBar } from "./ProgressBar";

interface StampGridProps {
  onSelectStreet: (street: Street) => void;
}

export function StampGrid({ onSelectStreet }: StampGridProps) {
  const { hasStamp, progress, isComplete, isLoaded } = useStamps();
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <ProgressBar acquired={progress.acquired} total={progress.total} />

      {isComplete && (
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/30 rounded-xl p-4 text-center">
          <p className="text-2xl mb-1">🎉</p>
          <p className="font-bold text-foreground">{t.progress.complete}</p>
          <p className="text-sm text-muted mt-1">
            {t.progress.completeMessage}
          </p>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 py-2">
        {streets.map((street) => (
          <StampSlot
            key={street.id}
            street={street}
            acquired={isLoaded ? hasStamp(street.id) : false}
            onSelect={onSelectStreet}
          />
        ))}
      </div>
    </div>
  );
}
