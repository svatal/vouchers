import { contextBridge, ipcRenderer } from "electron";
import { IText } from "./pdf";

contextBridge.exposeInMainWorld("voucher", {
  preview: (pageNumber: number, texts: IText[]) =>
    ipcRenderer.invoke("voucher-preview", pageNumber, texts),
  create: (pageNumber: number, texts: IText[]) =>
    ipcRenderer.invoke("voucher-create", pageNumber, texts),
});
