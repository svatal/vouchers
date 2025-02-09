import { app } from "electron";
import * as path from "path";
import * as fs from "fs";
import type {
  ISettings,
  IVoucherSetting,
  IVoucherTemplate,
} from "./sharedTypes";

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
      vouchers: {
        "300": {
          name: "300 Kč",
          templateId: "voucher",
          page: 1,
          codePosition: { x: 270, y: 35 },
          validUntilPosition: { x: 300, y: 53 },
        },
        "500": {
          name: "500 Kč",
          templateId: "voucher",
          page: 0,
          codePosition: { x: 270, y: 35 },
          validUntilPosition: { x: 300, y: 53 },
        },
        "1000": {
          name: "1000 Kč",
          templateId: "voucher",
          page: 2,
          codePosition: { x: 270, y: 35 },
          validUntilPosition: { x: 300, y: 53 },
        },
      },
      templates: {
        voucher: {
          filename: "voucher-template.pdf",
          pageCount: 3,
        },
      },
    };
  }
  return settings;
}

export function addTemplate(template: IVoucherTemplate) {
  if (!settings) {
    loadSettings();
  }
  const id = generateId();
  settings!.templates[id] = template;
  saveSettings();
  return id;
}

export function addVoucherSetting(voucher: IVoucherSetting) {
  if (!settings) {
    loadSettings();
  }
  const id = generateId();
  settings!.vouchers[id] = voucher;
  saveSettings();
  return id;
}

export function editVoucherSetting(id: string, voucher: IVoucherSetting) {
  if (!settings) {
    loadSettings();
  }
  if (settings!.vouchers[id]) {
    settings!.vouchers[id] = voucher;
    saveSettings();
  }
}

function saveSettings() {
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
