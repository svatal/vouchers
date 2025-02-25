import { app } from "electron";
import * as path from "path";

export function getTemplatePath(filename: string) {
  return path.join(app.getPath("userData"), "templates", filename);
}
