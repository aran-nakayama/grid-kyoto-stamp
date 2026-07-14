import { TranslationDict } from "./types";

export const en: TranslationDict = {
  siteName: "GRID KYOTO Stamp Rally",
  siteDescription:
    "GRID KYOTO — Kyoto's city culture festival. A stamp rally across five themed streets.",
  nav: {
    stamps: "Stamps",
    streets: "Streets",
    scan: "Scan",
    map: "Venue Map",
  },
  home: {
    title: "GRID KYOTO",
    subtitle: "Kyoto's city culture festival — explore the five streets",
  },
  progress: {
    label: "Stamps",
    complete: "Complete!",
    completeMessage:
      "You've visited all five streets! Congratulations!",
  },
  streets: {
    title: "Streets",
    subtitle: "Five themed streets",
    themeLabel: "Theme",
    acquired: "Stamp collected",
    notAcquired: "Not collected",
    acquiredDesc: "You've already collected this street's stamp",
    notAcquiredDesc:
      "Scan the QR code on the street to collect its stamp",
  },
  scan: {
    title: "QR Scan",
    subtitle: "Scan a street's QR code",
    instruction: "Point your camera at the QR code displayed on each street",
    cameraError: "Camera Error",
    cameraPermission:
      "Could not start the camera. Please allow camera access.",
  },
  stamp: {
    checking: "Checking...",
    success: "Stamp collected!",
    successDesc: "Added to your stamp card!",
    already: "Already collected",
    alreadyDesc: "You've already collected this street's stamp.",
    invalid: "Invalid QR Code",
    invalidDesc: "This QR code is not a valid stamp rally code.",
    backToTop: "Back to top",
    redirecting: "Redirecting to your stamp card in 3 seconds...",
  },
  map: {
    title: "Venue Map",
    subtitle: "Kyoto City Hall Front Plaza & Zest Oike",
    venuePlaza: "Kyoto City Hall Front Plaza",
    venuePlazaDesc: "Main venue — the five streets",
    venueZest: "Zest Oike (underground mall)",
    venueZestDesc: "Venue",
  },
  admin: {
    title: "Admin Panel",
    login: "Admin Login",
    password: "Password",
    loginButton: "Log in",
    wrongPassword: "Incorrect password",
    logout: "Log out",
    qrCodes: "Street QR Codes",
    generate: "Generate",
  },
};
