import { app, BrowserWindow } from "electron";
import { join } from "path";

function createwindow(): void {
   const window: BrowserWindow = new BrowserWindow({
      width: 800,
      height: 6000,
      webPreferences: {
         nodeIntegration: true
      }
   });

   void window.loadFile(join(__dirname, "../pages/index.html"));
}

void app.whenReady().then(createwindow);

app.on("window-all-closed", () => {
   if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
   if (BrowserWindow.getAllWindows().length === 0) createwindow();
});
