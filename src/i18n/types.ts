export type Locale = "ja" | "en";

export interface TranslationDict {
  siteName: string;
  siteDescription: string;
  nav: {
    stamps: string;
    scan: string;
  };
  home: {
    title: string;
    subtitle: string;
    sheetTitle: string;
  };
  progress: {
    label: string;
    complete: string;
    completeMessage: string;
  };
  /** 全部集めたときのお祝い画面 */
  celebrate: {
    message: string;
    sub: string;
    close: string;
    replay: string;
  };
  /** スタンプ詳細（ストリート情報）で使う文言 */
  streets: {
    themeLabel: string;
    acquired: string;
    notAcquired: string;
    acquiredDesc: string;
    notAcquiredDesc: string;
    designLabel: string;
    changeDesign: string;
  };
  scan: {
    title: string;
    subtitle: string;
    instruction: string;
    cameraError: string;
    cameraPermission: string;
    cameraUnavailable: string;
  };
  stamp: {
    choose: string;
    chooseDesc: string;
    checking: string;
    success: string;
    successDesc: string;
    already: string;
    alreadyDesc: string;
    invalid: string;
    invalidDesc: string;
    backToTop: string;
    redirecting: string;
  };
  admin: {
    title: string;
    login: string;
    password: string;
    loginButton: string;
    wrongPassword: string;
    loginError: string;
    logout: string;
    qrCodes: string;
    generate: string;
    stampStatus: string;
    noStamps: string;
    resetStamps: string;
    resetConfirm: string;
    resetDo: string;
    resetCancel: string;
    resetDone: string;
    resetNote: string;
  };
}
