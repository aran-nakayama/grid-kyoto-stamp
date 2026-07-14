"use client";

import { Header } from "@/components/Header";
import { StreetCard } from "@/components/StreetCard";
import { useStamps } from "@/hooks/useStamps";
import { useI18n } from "@/contexts/I18nContext";
import { streets } from "@/data/streets";

export default function StreetsPage() {
  const { hasStamp, isLoaded } = useStamps();
  const { t } = useI18n();

  return (
    <>
      <Header title={t.streets.title} subtitle={t.streets.subtitle} />
      <div className="max-w-lg mx-auto px-4 py-4 space-y-3">
        {streets.map((street) => (
          <StreetCard
            key={street.id}
            street={street}
            acquired={isLoaded ? hasStamp(street.id) : false}
          />
        ))}
      </div>
    </>
  );
}
