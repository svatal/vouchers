import * as fs from "fs/promises";
import * as path from "path";
import { PDFDocument, rgb } from "pdf-lib";
import { ITexts } from "./sharedTypes";
import { getSettings } from "./settings";

export async function previewVoucher(voucherId: string, texts: ITexts) {
  const voucherDoc = await prepareVoucher(voucherId, texts);
  return await voucherDoc.saveAsBase64({ dataUri: true });
}

export async function createVoucher(voucherId: string, texts: ITexts) {
  const voucherDoc = await prepareVoucher(voucherId, texts);
  return await voucherDoc.save();
}

export async function prepareVoucher(voucherId: string, texts: ITexts) {
  const voucherSetting = getSettings().vouchers.find((v) => v.id === voucherId);
  if (!voucherSetting) {
    throw new Error("Voucher setting not found");
  }
  const template = path.join(
    __dirname,
    "..",
    "assets",
    voucherSetting.filename
  );
  const bytes = await fs.readFile(template);
  const origDoc = await PDFDocument.load(bytes);
  const targetDoc = await PDFDocument.create();
  const [origPage] = await targetDoc.copyPages(origDoc, [voucherSetting.page]);
  const page = targetDoc.addPage(origPage);

  page.setFontColor(rgb(1, 1, 1));
  page.setFontSize(10);
  [
    { text: texts.code, position: voucherSetting.codePosition },
    { text: texts.validUntil, position: voucherSetting.validUntilPosition },
  ].forEach(({ text, position }) => page.drawText(text, position));

  return targetDoc;
}
