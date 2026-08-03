"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { useStamps } from "@/hooks/useStamps";
import { clearStamps } from "@/lib/stamps";
import { streets, findDesign, streetText } from "@/data/streets";
import { StampFace } from "@/components/StampFace";

/** 動作確認を繰り返せるよう、この端末のスタンプを消すための管理用パネル */
export function AdminStampReset() {
  const { t, locale } = useI18n();
  const { hasStamp, designIdOf, progress } = useStamps();
  const [confirming, setConfirming] = useState(false);
  const [justCleared, setJustCleared] = useState(false);

  // 「リセットしました」の表示はしばらくしたら自動で消す
  useEffect(() => {
    if (!justCleared) return;
    const timer = setTimeout(() => setJustCleared(false), 4000);
    return () => clearTimeout(timer);
  }, [justCleared]);

  const acquired = streets.filter((s) => hasStamp(s.id));

  const handleReset = () => {
    clearStamps();
    setConfirming(false);
    setJustCleared(true);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-bold">{t.admin.stampStatus}</h2>
        <span className="text-sm text-gray-500">
          {progress.acquired} / {progress.total}
        </span>
      </div>

      {acquired.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {acquired.map((street) => {
            const design = findDesign(street, designIdOf(street.id));
            return (
              <div key={street.id} className="flex flex-col items-center gap-1">
                <StampFace
                  design={design}
                  className="w-11 h-11"
                  emojiClassName="text-xl"
                />
                <span className="text-[11px] text-gray-500">
                  {streetText(street, locale).shortName}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-400">{t.admin.noStamps}</p>
      )}

      {justCleared && (
        <p className="text-sm font-medium text-green-700">
          ✅ {t.admin.resetDone}
        </p>
      )}

      {confirming ? (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-red-600">
            {t.admin.resetConfirm}
          </span>
          <button
            onClick={handleReset}
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            {t.admin.resetDo}
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {t.admin.resetCancel}
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirming(true)}
          disabled={acquired.length === 0}
          className="border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          {t.admin.resetStamps}
        </button>
      )}

      <p className="text-xs text-gray-400 leading-relaxed">
        {t.admin.resetNote}
      </p>
    </div>
  );
}
