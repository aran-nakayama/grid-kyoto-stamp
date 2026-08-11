import { TranslationDict } from "./types";

export const en: TranslationDict = {
  siteName: "GRID KYOTO Stamp Rally",
  siteDescription:
    "GRID KYOTO — Kyoto's city culture festival. A stamp rally across five themed streets.",
  nav: {
    stamps: "Stamps",
    scan: "Scan",
  },
  home: {
    title: "GRID KYOTO",
    subtitle: "Kyoto's city culture festival — explore the five streets",
    sheetTitle: "STAMP SHEET",
  },
  progress: {
    label: "Stamps",
    complete: "Trick or Treat!",
    completeMessage:
      "You've visited all five streets.\nHappy Halloween!",
  },
  celebrate: {
    message: "You visited all five streets!",
    sub: "Happy Halloween!",
    close: "See my stamp sheet",
    replay: "Watch again",
  },
  streets: {
    acquired: "Stamp collected",
    notAcquired: "Not collected",
    acquiredDesc: "You've already collected this street's stamp",
    notAcquiredDesc:
      "Scan the QR code on the street to collect its stamp",
    designLabel: "Stamp design",
    changeDesign: "Tap to change the design",
  },
  scan: {
    title: "QR Scan",
    subtitle: "Scan a street's QR code",
    instruction: "Point your camera at the QR code displayed on each street",
    cameraError: "Camera Error",
    cameraPermission:
      "Could not start the camera. Please allow camera access.",
    cameraUnavailable:
      "The camera is not available over this connection. Browsers only allow it on secure (https) connections — please use the published site.",
  },
  stamp: {
    choose: "Which stamp would you like?",
    chooseDesc: "Tap a design to collect it (you can change it later)",
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
  admin: {
    title: "Admin Panel",
    login: "Admin Login",
    password: "Password",
    loginButton: "Log in",
    wrongPassword: "Incorrect password",
    loginError: "Login failed. Please reload the page and try again.",
    logout: "Log out",
    qrCodes: "Street QR Codes",
    generate: "Generate",
    stampStatus: "Stamps on this device",
    noStamps: "No stamps collected yet",
    resetStamps: "Reset stamps",
    resetConfirm: "Really delete them?",
    resetDo: "Delete",
    resetCancel: "Cancel",
    resetDone: "Stamps have been reset",
    resetNote:
      "This only clears stamps saved on this device. Other visitors are unaffected.",
  },
};
