import { contextBridge, ipcRenderer } from "electron";
import {
  IEditableVoucherTemplate,
  IVoucherTexts,
  IVoucherTemplate,
  IVoucherInputs,
} from "./sharedTypes";

contextBridge.exposeInMainWorld("voucher", {
  preview: (templateId: string, texts: IVoucherTexts) =>
    ipcRenderer.invoke("voucher-preview", templateId, texts),
  create: (inputs: IVoucherInputs) =>
    ipcRenderer.invoke("voucher-create", inputs),
  redeem: (voucherId: string, redeem?: boolean) =>
    ipcRenderer.invoke("voucher-redeem", voucherId, redeem),
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
