import * as fs from "fs/promises";
import { PDFDocument, rgb } from "pdf-lib";
import { IVoucherTexts, IVoucherTemplate } from "./sharedTypes";
import { getSettings } from "./settings";
import { getTemplatePath } from "./files";

export async function previewVoucher(templateId: string, texts: IVoucherTexts) {
  const voucherDoc = await prepareVoucherFromTemplate(templateId, texts);
  return await voucherDoc.saveAsBase64({ dataUri: true });
}

export async function createVoucher(templateId: string, texts: IVoucherTexts) {
  const voucherDoc = await prepareVoucherFromTemplate(templateId, texts);
  return await voucherDoc.save();
}

async function prepareVoucherFromTemplate(
  templateId: string,
  texts: IVoucherTexts
) {
  const settings = getSettings();
  const template = settings.templates[templateId];
  if (!template) {
    throw new Error("Voucher template not found");
  }
  return await prepareVoucher(template, texts);
}

export async function prepareVoucher(
  template: IVoucherTemplate,
  texts: IVoucherTexts
) {
  const settings = getSettings();
  const templateFileName = getTemplatePath(
    settings.templateFiles[template.templateFileId].filename
  );
  const bytes = await fs.readFile(templateFileName);
  const origDoc = await PDFDocument.load(bytes);
  const targetDoc = await PDFDocument.create();
  const [origPage] = await targetDoc.copyPages(origDoc, [template.page]);
  const page = targetDoc.addPage(origPage);

  page.setFontColor(rgb(1, 1, 1));
  page.setFontSize(10);
  [
    { text: texts.code, position: template.codePosition },
    { text: texts.validUntil, position: template.validUntilPosition },
  ].forEach(({ text, position }) => page.drawText(text, position));

  return targetDoc;
}

export async function getPdfPageCount(filePath: string): Promise<number> {
  const bytes = await fs.readFile(filePath);
  const pdfDoc = await PDFDocument.load(bytes);
  return pdfDoc.getPageCount();
}
