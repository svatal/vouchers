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
      templates: {},
      templateFiles: {},
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
      codePosition: { x: 10, y: 10 },
      validUntilPosition: { x: 10, y: 10 },
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
