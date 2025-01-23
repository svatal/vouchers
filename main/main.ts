import { app, BrowserWindow, dialog, ipcMain } from "electron";
import * as path from "path";
import { createVoucher, previewVoucher } from "./pdf";
import * as fs from "fs";
import { getSettings } from "./settings";

class Main {
  mainWindow: BrowserWindow | null = null;

  init() {
    app.on("ready", this.createWindow);
    app.on("window-all-closed", this.onWindowAllClosed);
  }

  createWindow = () => {
    ipcMain.handle("settings-get", getSettings);
    ipcMain.handle("voucher-preview", (event, voucherId, texts) =>
      previewVoucher(voucherId, texts)
    );
    ipcMain.handle("voucher-create", async (event, voucherId, texts) => {
      const dialogResult = await dialog.showSaveDialog(this.mainWindow!, {
        defaultPath: path.join(app.getPath("downloads"), "voucher.pdf"),
      });
      if (!dialogResult.canceled) {
        const bytes = await createVoucher(voucherId, texts);
        fs.writeFileSync(dialogResult.filePath, bytes);
      }
    });
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
