"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { StampGrid } from "@/components/StampGrid";
import { StreetDetailModal } from "@/components/StreetDetailModal";
import { useStamps } from "@/hooks/useStamps";
import { useI18n } from "@/contexts/I18nContext";
import { Street } from "@/lib/types";

export default function Home() {
  const { t } = useI18n();
  const [selectedStreet, setSelectedStreet] = useState<Street | null>(null);
  const { hasStamp, isLoaded } = useStamps();

  return (
    <>
      <Header title={t.home.title} subtitle={t.home.subtitle} />
      <div className="max-w-lg mx-auto px-4 py-6">
        <StampGrid onSelectStreet={setSelectedStreet} />
      </div>

      {selectedStreet && (
        <StreetDetailModal
          street={selectedStreet}
          acquired={isLoaded ? hasStamp(selectedStreet.id) : false}
          onClose={() => setSelectedStreet(null)}
        />
      )}
    </>
  );
}
