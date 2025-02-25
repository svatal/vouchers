import { app, BrowserWindow, dialog, ipcMain } from "electron";
import * as path from "path";
import {
  createVoucher,
  previewVoucher,
  getPdfPageCount,
  prepareVoucher,
} from "./pdf";
import * as fs from "fs";
import { getSettings, addTemplateFile, editTemplate } from "./settings";
import {
  IEditableVoucherTemplate,
  ITexts,
  IVoucherTemplate,
} from "./sharedTypes";
import { getTemplatePath } from "./files";

class Main {
  mainWindow: BrowserWindow | null = null;

  init() {
    app.on("ready", this.createWindow);
    app.on("window-all-closed", this.onWindowAllClosed);
  }

  createWindow = () => {
    ipcMain.handle("settings-get", getSettings);
    ipcMain.handle(
      "voucher-preview",
      (event, voucherId: string, texts: ITexts) =>
        previewVoucher(voucherId, texts)
    );
    ipcMain.handle(
      "voucher-create",
      async (event, voucherId: string, texts: ITexts) => {
        const dialogResult = await dialog.showSaveDialog(this.mainWindow!, {
          defaultPath: path.join(app.getPath("downloads"), "voucher.pdf"),
        });
        if (!dialogResult.canceled) {
          const bytes = await createVoucher(voucherId, texts);
          fs.writeFileSync(dialogResult.filePath, bytes);
        }
      }
    );
    ipcMain.handle("template-upload", async () => {
      const dialogResult = await dialog.showOpenDialog(this.mainWindow!, {
        properties: ["openFile"],
        filters: [{ name: "PDF Files", extensions: ["pdf"] }],
      });
      if (!dialogResult.canceled && dialogResult.filePaths.length > 0) {
        const filePath = dialogResult.filePaths[0];
        const filename = path.basename(filePath);
        const destination = getTemplatePath(filename);
        await fs.promises.mkdir(path.dirname(destination), { recursive: true });
        await fs.promises.copyFile(filePath, destination);
        const pageCount = await getPdfPageCount(destination);
        return addTemplateFile({ filename, pageCount });
      }
    });
    ipcMain.handle(
      "template-edit",
      async (event, templateId: string, template: IEditableVoucherTemplate) => {
        return editTemplate(templateId, template);
      }
    );

    ipcMain.handle(
      "template-preview",
      async (event, voucher: IVoucherTemplate) => {
        const now = new Date();
        const preview = await prepareVoucher(voucher, {
          code: "ABCDEFG",
          validUntil: `${now.getDate()}.${
            now.getMonth() + 1
          }.${now.getFullYear()}`,
        });
        return preview.saveAsBase64({ dataUri: true });
      }
    );

    this.mainWindow = new BrowserWindow({
      width: 1000,
      height: 800,
      webPreferences: {
        // nodeIntegration: true,
        preload: path.join(__dirname, "preload.js"),
      },
    });

    this.mainWindow.loadFile("renderer/dist/index.html");
    this.mainWindow.on("closed", () => {
      this.mainWindow = null;
    });
  };

  onWindowAllClosed = () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  };
}

const main = new Main();
main.init();
