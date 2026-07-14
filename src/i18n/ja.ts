import { TranslationDict } from "./types";

export const ja: TranslationDict = {
  siteName: "GRID KYOTO スタンプラリー",
  siteDescription: "GRID KYOTO 〜京都まちの文化祭〜 5つのストリートを巡るスタンプラリー",
  nav: {
    stamps: "スタンプ",
    streets: "ストリート",
    scan: "スキャン",
    map: "会場マップ",
  },
  home: {
    title: "GRID KYOTO",
    subtitle: "京都まちの文化祭 〜5つのストリートを巡ろう〜",
  },
  progress: {
    label: "スタンプ",
    complete: "コンプリート！",
    completeMessage: "5つのストリートをすべて巡りました！おめでとうございます！",
  },
  streets: {
    title: "ストリート",
    subtitle: "5つのテーマストリート",
    themeLabel: "テーマ",
    acquired: "スタンプ獲得済み",
    notAcquired: "未獲得",
    acquiredDesc: "このストリートのスタンプは獲得済みです",
    notAcquiredDesc: "ストリートに設置されたQRコードを読み取ってスタンプを獲得しよう",
  },
  scan: {
    title: "QRスキャン",
    subtitle: "ストリートのQRコードを読み取ろう",
    instruction: "各ストリートに設置されたQRコードにカメラを向けてください",
    cameraError: "カメラエラー",
    cameraPermission:
      "カメラを起動できませんでした。カメラの使用を許可してください。",
  },
  stamp: {
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
  map: {
    title: "会場マップ",
    subtitle: "京都市役所前広場・ゼスト御池",
    venuePlaza: "京都市役所前広場",
    venuePlazaDesc: "メイン会場（5つのストリート）",
    venueZest: "ゼスト御池地下街",
    venueZestDesc: "会場",
  },
  admin: {
    title: "管理画面",
    login: "管理者ログイン",
    password: "パスワード",
    loginButton: "ログイン",
    wrongPassword: "パスワードが正しくありません",
    logout: "ログアウト",
    qrCodes: "ストリートQRコード",
    generate: "生成",
  },
};
