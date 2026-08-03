"use client";

import { Suspense, useEffect, useRef, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  completeClaim,
  findStreetByToken,
  getClaimOutcome,
  getServerClaimOutcome,
  startClaim,
  subscribeStamps,
} from "@/lib/stamps";
import { useStamps } from "@/hooks/useStamps";
import { useI18n } from "@/contexts/I18nContext";
import { findDesign, streetText } from "@/data/streets";
import { StampFace } from "@/components/StampFace";

function StampContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const { t, locale } = useI18n();
  const { designIdOf } = useStamps();

  // 判定はストア側で一度だけ行い、ここでは結果を購読するだけにする。
  // effect 内で状態を更新しないので、獲得直後に「取得済み」で上書きされることがない
  const result = useSyncExternalStore(
    subscribeStamps,
    () => getClaimOutcome(token),
    getServerClaimOutcome
  );

  // 開発時の effect 二重実行で判定がやり直されないよう、トークンごとに一度だけ処理する
  const startedToken = useRef<string | null>(null);

  useEffect(() => {
    if (!token || startedToken.current === token) return;
    startedToken.current = token;
    startClaim(token);
  }, [token]);

  // 絵柄の選択待ちの間は自動遷移しない
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

  const street = findStreetByToken(token);
  const name = street ? streetText(street, locale).name : "";

  // 未獲得のときは、どちらの絵柄にするか選んでもらう
  if (result === "choosing" && street) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-sm w-full">
          <p
            className="text-sm font-medium mb-1"
            style={{ color: street.color }}
          >
            {name}
          </p>
          <h1 className="text-xl font-bold mb-2">{t.stamp.choose}</h1>
          <p className="text-sm text-muted mb-8">{t.stamp.chooseDesc}</p>

          <div className="flex justify-center gap-6">
            {street.designs.map((design) => (
              <button
                key={design.id}
                onClick={() => completeClaim(token, design.id)}
                className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
              >
                <StampFace
                  design={design}
                  className="w-28 h-28 shadow-lg"
                  emojiClassName="text-5xl"
                  style={{ boxShadow: `0 10px 15px -3px ${design.color}66` }}
                />
                <span className="text-sm font-medium">
                  {locale === "en" ? design.nameEn : design.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const design = street ? findDesign(street, designIdOf(street.id)) : null;

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="text-center max-w-sm">
        {design && (
          <div className="flex justify-center mb-4">
            <StampFace
              design={design}
              className={`w-24 h-24 shadow-lg ${
                result === "success" ? "animate-bounce" : ""
              }`}
              emojiClassName="text-4xl"
              style={{ boxShadow: `0 10px 15px -3px ${design.color}66` }}
            />
          </div>
        )}
        <h1 className="text-2xl font-bold mb-2">
          {result === "success" ? t.stamp.success : t.stamp.already}
        </h1>
        <p
          className="text-lg font-medium mb-1"
          style={street ? { color: street.color } : undefined}
        >
          {name}
        </p>
        <p className="text-muted mb-6">
          {result === "success" ? t.stamp.successDesc : t.stamp.alreadyDesc}
        </p>
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
