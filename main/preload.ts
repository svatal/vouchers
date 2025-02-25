import { contextBridge, ipcRenderer } from "electron";
import {
  IEditableVoucherTemplate,
  ITexts,
  IVoucherTemplate,
} from "./sharedTypes";

contextBridge.exposeInMainWorld("voucher", {
  preview: (voucherId: string, texts: ITexts) =>
    ipcRenderer.invoke("voucher-preview", voucherId, texts),
  create: (voucherId: string, texts: ITexts) =>
    ipcRenderer.invoke("voucher-create", voucherId, texts),
});

contextBridge.exposeInMainWorld("settings", {
  get: () => ipcRenderer.invoke("settings-get"),
});

contextBridge.exposeInMainWorld("template", {
  upload: () => ipcRenderer.invoke("template-upload"),
  preview: (template: IVoucherTemplate) =>
    ipcRenderer.invoke("template-preview", template),
  edit: (templateId: string, template: IEditableVoucherTemplate) =>
    ipcRenderer.invoke("template-edit", templateId, template),
});
