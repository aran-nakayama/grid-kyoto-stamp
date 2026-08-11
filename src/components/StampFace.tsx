"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { StampDesign } from "@/lib/types";

// 画像パスには basePath が自動で付かないため明示的に前置する
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

interface StampFaceProps {
  design: StampDesign;
  /** 円の大きさを指定するクラス（例: "w-20 h-20"） */
  className?: string;
  /** 仮デザイン（絵文字）の大きさ */
  emojiClassName?: string;
  style?: CSSProperties;
}

/**
 * スタンプの絵柄を丸く描画する。
 * design.image が設定されていれば画像を、無ければ絵文字を表示するので、
 * 本番イラストへの差し替えは data/streets.ts の変更だけで完了する。
 */
export function StampFace({
  design,
  className = "",
  emojiClassName = "text-3xl",
  style,
}: StampFaceProps) {
  return (
    <div
      className={`relative rounded-full overflow-hidden flex items-center justify-center stamp-3d ${className}`}
      style={{ backgroundColor: design.color, ...style }}
    >
      {design.image ? (
        <Image
          src={`${BASE_PATH}${design.image}`}
          alt=""
          fill
          sizes="160px"
          className="object-cover"
        />
      ) : (
        <span className={emojiClassName}>{design.emoji}</span>
      )}
      {/* 縁の陰影を重ねて、押された印影らしく見せる */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full stamp-impression pointer-events-none"
      />
    </div>
  );
}
