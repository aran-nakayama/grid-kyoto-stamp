export type Locale = "ja" | "en";

export interface TranslationDict {
  siteName: string;
  siteDescription: string;
  nav: {
    stamps: string;
    streets: string;
    scan: string;
    map: string;
  };
  home: {
    title: string;
    subtitle: string;
  };
  progress: {
    label: string;
    complete: string;
    completeMessage: string;
  };
  streets: {
    title: string;
    subtitle: string;
    themeLabel: string;
    acquired: string;
    notAcquired: string;
    acquiredDesc: string;
    notAcquiredDesc: string;
  };
  scan: {
    title: string;
    subtitle: string;
    instruction: string;
    cameraError: string;
    cameraPermission: string;
  };
  stamp: {
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
  map: {
    title: string;
    subtitle: string;
    venuePlaza: string;
    venuePlazaDesc: string;
    venueZest: string;
    venueZestDesc: string;
  };
  admin: {
    title: string;
    login: string;
    password: string;
    loginButton: string;
    wrongPassword: string;
    logout: string;
    qrCodes: string;
    generate: string;
  };
}
