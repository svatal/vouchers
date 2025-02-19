export interface ITexts {
  code: string;
  validUntil: string;
}

export interface IVoucherTemplate {
  name: string;
  templateFileId: string;
  page: number;
  codePosition: { x: number; y: number };
  validUntilPosition: { x: number; y: number };
}

export interface IVoucherTemplateFile {
  filename: string;
  pageCount: number;
}

export interface ISettings {
  templates: { [id: string]: IVoucherTemplate };
  templateFiles: { [id: string]: IVoucherTemplateFile };
}
