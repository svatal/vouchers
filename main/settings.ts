import { app } from "electron";
import * as path from "path";
import * as fs from "fs";
import type {
  ISettings,
  IVoucherTemplate,
  IVoucherTemplateFile,
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
      templates: {
        "300": {
          name: "300 Kč",
          templateFileId: "voucher",
          page: 1,
          codePosition: { x: 270, y: 35 },
          validUntilPosition: { x: 300, y: 53 },
        },
        "500": {
          name: "500 Kč",
          templateFileId: "voucher",
          page: 0,
          codePosition: { x: 270, y: 35 },
          validUntilPosition: { x: 300, y: 53 },
        },
        "1000": {
          name: "1000 Kč",
          templateFileId: "voucher",
          page: 2,
          codePosition: { x: 270, y: 35 },
          validUntilPosition: { x: 300, y: 53 },
        },
      },
      templateFiles: {
        voucher: {
          filename: "voucher-template.pdf",
          pageCount: 3,
        },
      },
    };
  }
  return settings;
}

export function addTemplateFile(template: IVoucherTemplateFile) {
  if (!settings) {
    loadSettings();
  }
  const id = generateId();
  settings!.templateFiles[id] = template;
  saveSettings();
  return id;
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

export function editTemplate(id: string, template: IVoucherTemplate) {
  if (!settings) {
    loadSettings();
  }
  if (settings!.templates[id]) {
    settings!.templates[id] = template;
    saveSettings();
  }
}

function saveSettings() {
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
