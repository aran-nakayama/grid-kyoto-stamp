"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { useI18n } from "@/contexts/I18nContext";

const VenueMap = dynamic(
  () => import("@/components/VenueMap").then((mod) => mod.VenueMap),
  { ssr: false }
);

export default function MapPage() {
  const { t } = useI18n();

  return (
    <>
      <Header title={t.map.title} subtitle={t.map.subtitle} />
      <div className="h-[calc(100vh-10rem)]">
        <VenueMap />
      </div>
    </>
  );
}
