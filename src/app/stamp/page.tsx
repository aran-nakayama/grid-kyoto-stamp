"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { findStreetByToken } from "@/lib/stamps";
import { useStamps } from "@/hooks/useStamps";
import { useI18n } from "@/contexts/I18nContext";
import { streets, streetText } from "@/data/streets";
import { Street } from "@/lib/types";

type StampResult = "success" | "already" | "invalid";

function StampContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const { addStamp, hasStamp, isLoaded } = useStamps();
  const { t, locale } = useI18n();
  const [result, setResult] = useState<StampResult | null>(null);
  const [street, setStreet] = useState<Street | null>(null);
  // addStamp が stamps を更新すると hasStamp の identity が変わりこの effect が再実行される。
  // 判定をトークンごとに一度だけに固定しないと、獲得直後に「取得済み」で上書きされる
  const processedToken = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !token) return;
    if (processedToken.current === token) return;
    processedToken.current = token;

    const found = findStreetByToken(token, streets);
    if (!found) {
      setResult("invalid");
      return;
    }

    setStreet(found);

    if (hasStamp(found.id)) {
      setResult("already");
    } else {
      addStamp(found.id);
      setResult("success");
    }
  }, [token, isLoaded, addStamp, hasStamp]);

  useEffect(() => {
    if (result === "success" || result === "already") {
      const timer = setTimeout(() => router.push("/"), 3000);
      return () => clearTimeout(timer);
    }
  }, [result, router]);

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-muted">{t.stamp.checking}</p>
        </div>
      </div>
    );
  }

  if (result === "invalid") {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">❌</div>
          <h1 className="text-xl font-bold mb-2">{t.stamp.invalid}</h1>
          <p className="text-muted mb-6">{t.stamp.invalidDesc}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary-light transition-colors"
          >
            {t.stamp.backToTop}
          </button>
        </div>
      </div>
    );
  }

  const name = street ? streetText(street, locale).name : "";

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="text-center max-w-sm">
        {result === "success" ? (
          <>
            <div className="text-6xl mb-4 animate-bounce">
              {street?.emoji ?? "🎉"}
            </div>
            <h1 className="text-2xl font-bold mb-2">{t.stamp.success}</h1>
            <p
              className="text-lg font-medium mb-1"
              style={street ? { color: street.color } : undefined}
            >
              {name}
            </p>
            <p className="text-muted mb-6">{t.stamp.successDesc}</p>
          </>
        ) : (
          <>
            <div className="text-5xl mb-4">✅</div>
            <h1 className="text-xl font-bold mb-2">{t.stamp.already}</h1>
            <p
              className="text-lg font-medium mb-1"
              style={street ? { color: street.color } : undefined}
            >
              {name}
            </p>
            <p className="text-muted mb-6">{t.stamp.alreadyDesc}</p>
          </>
        )}
        <p className="text-sm text-muted">{t.stamp.redirecting}</p>
      </div>
    </div>
  );
}

export default function StampPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }
    >
      <StampContent />
    </Suspense>
  );
}
