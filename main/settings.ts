import { app } from "electron";
import * as path from "path";
import * as fs from "fs";
import type { IEditableVoucherTemplate, ISettings } from "./sharedTypes";

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
          templateIds: ["500", "300", "1000"],
        },
      },
    };
  }
  return settings;
}

export function addTemplateFile(template: {
  filename: string;
  pageCount: number;
}) {
  if (!settings) {
    loadSettings();
  }
  const id = generateId();
  settings!.templateFiles[id] = {
    filename: template.filename,
    templateIds: Array.from({ length: template.pageCount }).map(generateId),
  };
  settings!.templateFiles[id].templateIds.forEach((tid, i) => {
    settings!.templates[tid] = {
      name: `${template.filename}: ${i + 1}`,
      templateFileId: id,
      page: i,
      codePosition: { x: 0, y: 0 },
      validUntilPosition: { x: 0, y: 0 },
    };
  });
  saveSettings();
  return id;
}

export function editTemplate(id: string, template: IEditableVoucherTemplate) {
  if (!settings) {
    loadSettings();
  }
  const oldTemplate = settings!.templates[id];
  settings!.templates[id] = { ...oldTemplate, ...template };
  saveSettings();
}

function saveSettings() {
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
