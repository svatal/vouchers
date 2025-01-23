import { contextBridge, ipcRenderer } from "electron";
import { ITexts } from "./sharedTypes";

contextBridge.exposeInMainWorld("voucher", {
  preview: (voucherId: string, texts: ITexts) =>
    ipcRenderer.invoke("voucher-preview", voucherId, texts),
  create: (voucherId: string, texts: ITexts) =>
    ipcRenderer.invoke("voucher-create", voucherId, texts),
});

contextBridge.exposeInMainWorld("settings", {
  get: () => ipcRenderer.invoke("settings-get"),
});
