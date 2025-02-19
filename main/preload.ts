import { contextBridge, ipcRenderer } from "electron";
import { ITexts, IVoucherTemplate } from "./sharedTypes";

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
  preview: (voucher: IVoucherTemplate) =>
    ipcRenderer.invoke("template-preview", voucher),
  create: (voucher: IVoucherTemplate) =>
    ipcRenderer.invoke("template-create", voucher),
});
