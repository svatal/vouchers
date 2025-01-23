import { app } from "electron";
import * as path from "path";
import * as fs from "fs";
import type { ISettings } from "./sharedTypes";

const settingsPath = path.join(app.getPath("userData"), "settings.json");

let settings: ISettings | null = null;

export function getSettings() {
  if (!settings) {
    loadSettings();
  }
  return settings!;
}

function loadSettings() {
  try {
    settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
  } catch (e) {
    settings = {
      vouchers: [
        {
          id: "300",
          name: "300 Kč",
          filename: "voucher-template.pdf",
          page: 1,
          codePosition: { x: 270, y: 35 },
          validUntilPosition: { x: 300, y: 53 },
        },
        {
          id: "500",
          name: "500 Kč",
          filename: "voucher-template.pdf",
          page: 0,
          codePosition: { x: 270, y: 35 },
          validUntilPosition: { x: 300, y: 53 },
        },
        {
          id: "1000",
          name: "1000 Kč",
          filename: "voucher-template.pdf",
          page: 2,
          codePosition: { x: 270, y: 35 },
          validUntilPosition: { x: 300, y: 53 },
        },
      ],
    };
  }
  return settings;
}

export function updateSettings(newSettings: ISettings) {
  settings = newSettings;
  fs.writeFileSync(settingsPath, JSON.stringify(settings));
}
