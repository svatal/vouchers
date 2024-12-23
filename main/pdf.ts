import * as fs from "fs/promises";
import * as path from "path";
import { PDFDocument, rgb } from "pdf-lib";

export interface IText {
  text: string;
  x: number;
  y: number;
}

export async function previewVoucher(pageNumber: number, texts: IText[]) {
  const voucherDoc = await prepareVoucher(pageNumber, texts);
  return await voucherDoc.saveAsBase64({ dataUri: true });
}

export async function createVoucher(pageNumber: number, texts: IText[]) {
  const voucherDoc = await prepareVoucher(pageNumber, texts);
  return await voucherDoc.save();
}

export async function prepareVoucher(pageNumber: number, texts: IText[]) {
  const template = path.join(__dirname, "..", "assets", "voucher-template.pdf");
  const bytes = await fs.readFile(template);
  const origDoc = await PDFDocument.load(bytes);
  const targetDoc = await PDFDocument.create();
  const [origPage] = await targetDoc.copyPages(origDoc, [pageNumber]);
  const page = targetDoc.addPage(origPage);

  page.setFontColor(rgb(1, 1, 1));
  page.setFontSize(10);
  texts.forEach(({ text, x, y }) => page.drawText(text, { x, y }));

  return targetDoc;
}
