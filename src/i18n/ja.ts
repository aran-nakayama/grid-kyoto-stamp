import { TranslationDict } from "./types";

export const ja: TranslationDict = {
  siteName: "GRID KYOTO スタンプラリー",
  siteDescription: "GRID KYOTO 〜京都まちの文化祭〜 5つのストリートを巡るスタンプラリー",
  nav: {
    stamps: "スタンプ",
    scan: "スキャン",
  },
  home: {
    title: "GRID KYOTO",
    subtitle: "🎃 京都まちの文化祭 〜5つのストリートを巡ろう〜",
    sheetTitle: "スタンプシート",
  },
  progress: {
    label: "スタンプ",
    complete: "Trick or Treat！",
    completeMessage:
      "5つのストリートをすべて巡りました！ハッピーハロウィン！",
  },
  celebrate: {
    message: "5つのストリートを ぜんぶまわったね！",
    sub: "ハッピーハロウィン！",
    close: "スタンプシートを見る",
    replay: "もういちど見る",
  },
  streets: {
    themeLabel: "テーマ",
    acquired: "スタンプ獲得済み",
    notAcquired: "未獲得",
    acquiredDesc: "このストリートのスタンプは獲得済みです",
    notAcquiredDesc: "ストリートに設置されたQRコードを読み取ってスタンプを獲得しよう",
    designLabel: "スタンプの絵柄",
    changeDesign: "タップで絵柄を変更できます",
  },
  scan: {
    title: "QRスキャン",
    subtitle: "ストリートのQRコードを読み取ろう",
    instruction: "各ストリートに設置されたQRコードにカメラを向けてください",
    cameraError: "カメラエラー",
    cameraPermission:
      "カメラを起動できませんでした。カメラの使用を許可してください。",
    cameraUnavailable:
      "この接続ではカメラを利用できません。ブラウザの制限のため、暗号化された接続（https）でのみ動作します。公開サイトからお試しください。",
  },
  stamp: {
    choose: "どちらのスタンプにしますか？",
    chooseDesc: "好きな絵柄をタップして獲得しよう（あとから変更できます）",
    checking: "確認中...",
    success: "スタンプ獲得！",
    successDesc: "スタンプカードに追加されました！",
    already: "取得済みです",
    alreadyDesc: "このストリートのスタンプは既に獲得しています。",
    invalid: "無効なQRコード",
    invalidDesc: "このQRコードは有効なスタンプラリーのコードではありません。",
    backToTop: "トップに戻る",
    redirecting: "3秒後にスタンプカードへ移動します...",
  },
  admin: {
    title: "管理画面",
    login: "管理者ログイン",
    password: "パスワード",
    loginButton: "ログイン",
    wrongPassword: "パスワードが正しくありません",
    loginError: "ログイン処理に失敗しました。ページを再読み込みしてお試しください。",
    logout: "ログアウト",
    qrCodes: "ストリートQRコード",
    generate: "生成",
    stampStatus: "この端末のスタンプ",
    noStamps: "まだスタンプはありません",
    resetStamps: "スタンプをリセット",
    resetConfirm: "本当に消しますか？",
    resetDo: "消す",
    resetCancel: "やめる",
    resetDone: "リセットしました",
    resetNote:
      "この端末に保存されたスタンプだけを消します。他の来場者のスタンプには影響しません。",
  },
};
