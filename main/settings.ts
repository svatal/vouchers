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
      vouchers: [
        {
          id: "300",
          name: "300 Kč",
          templateId: "voucher",
          page: 1,
          codePosition: { x: 270, y: 35 },
          validUntilPosition: { x: 300, y: 53 },
        },
        {
          id: "500",
          name: "500 Kč",
          templateId: "voucher",
          page: 0,
          codePosition: { x: 270, y: 35 },
          validUntilPosition: { x: 300, y: 53 },
        },
        {
          id: "1000",
          name: "1000 Kč",
          templateId: "voucher",
          page: 2,
          codePosition: { x: 270, y: 35 },
          validUntilPosition: { x: 300, y: 53 },
        },
      ],
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
  const templateId = template.filename.replace(".pdf", "");
  settings!.templates[templateId] = template;
  saveSettings();
  return templateId;
}

export function addVoucherSetting(voucher: IVoucherSetting) {
  if (!settings) {
    loadSettings();
  }
  settings!.vouchers.push(voucher);
  saveSettings();
}

export function editVoucherSetting(voucher: IVoucherSetting) {
  if (!settings) {
    loadSettings();
  }
  const index = settings!.vouchers.findIndex((v) => v.id === voucher.id);
  if (index !== -1) {
    settings!.vouchers[index] = voucher;
    saveSettings();
  }
}

function saveSettings() {
  fs.writeFileSync(settingsPath, JSON.stringify(settings));
}
