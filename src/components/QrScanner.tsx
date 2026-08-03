"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useI18n } from "@/contexts/I18nContext";

interface QrScannerProps {
  onScan: (decodedText: string) => void;
}

// カメラAPIは「安全なコンテキスト」（https または localhost）でしか露出しない。
// LAN IP 経由の http では navigator.mediaDevices ごと undefined になる
const subscribeCameraSupport = () => () => {};
const getCameraSupported = () =>
  typeof navigator !== "undefined" &&
  typeof navigator.mediaDevices?.getUserMedia === "function";
const getServerCameraSupported = () => true;

function safeStop(scanner: Html5Qrcode | null): void {
  if (!scanner) return;
  try {
    scanner.stop().catch(() => {});
  } catch {
    // ignore
  }
}

export function QrScanner({ onScan }: QrScannerProps) {
  const { t } = useI18n();
  const cameraSupported = useSyncExternalStore(
    subscribeCameraSupport,
    getCameraSupported,
    getServerCameraSupported
  );
  // 翻訳済みの文言ではなく失敗フラグだけ持つ。
  // これで起動処理が言語設定に依存しなくなり、言語切替でカメラが再起動しない
  const [cameraFailed, setCameraFailed] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const stateRef = useRef<"idle" | "starting" | "running" | "stopped">("idle");

  const onScanRef = useRef(onScan);
  // ref の書き換えは描画中ではなく effect で行う（カメラ起動より先に実行される）
  useEffect(() => {
    onScanRef.current = onScan;
  }, [onScan]);

  useEffect(() => {
    // カメラが使えない接続では起動を試みない（試みても必ず失敗する）
    if (!cameraSupported) return;

    // ページ遷移時にvideoのplay()が中断されるとブラウザがunhandled rejectionを投げる。
    // html5-qrcodeライブラリ内部のpromiseなのでcatchできないため、ここで抑制する。
    function suppressAbort(e: PromiseRejectionEvent) {
      if (e.reason instanceof DOMException && e.reason.name === "AbortError") {
        e.preventDefault();
      }
    }
    window.addEventListener("unhandledrejection", suppressAbort);

    let cancelled = false;

    const timerId = setTimeout(() => {
      if (cancelled) return;

      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;
      stateRef.current = "starting";

      scanner
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            if (stateRef.current !== "running") return;
            stateRef.current = "stopped";
            safeStop(scanner);
            onScanRef.current(decodedText);
          },
          () => {}
        )
        .then(() => {
          if (cancelled) {
            stateRef.current = "stopped";
            safeStop(scanner);
          } else {
            stateRef.current = "running";
          }
        })
        .catch((err: unknown) => {
          if (cancelled) return;
          if (err instanceof DOMException && err.name === "AbortError") return;
          setCameraFailed(true);
        });
    }, 100);

    return () => {
      cancelled = true;
      clearTimeout(timerId);
      if (stateRef.current !== "stopped") {
        stateRef.current = "stopped";
        safeStop(scannerRef.current);
      }
      scannerRef.current = null;
      // ブラウザのAbortErrorはクリーンアップ後に非同期で発生するため、削除を遅延する
      setTimeout(() => {
        window.removeEventListener("unhandledrejection", suppressAbort);
      }, 1000);
    };
  }, [cameraSupported]);

  if (!cameraSupported || cameraFailed) {
    return (
      <div className="text-center p-6">
        <p className="text-5xl mb-4">📷</p>
        <p className="text-primary font-medium mb-2">{t.scan.cameraError}</p>
        <p className="text-sm text-muted">
          {cameraSupported ? t.scan.cameraPermission : t.scan.cameraUnavailable}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div id="qr-reader" className="rounded-xl overflow-hidden" />
    </div>
  );
}
