export interface ITexts {
  code: string;
  validUntil: string;
}

export interface IEditableVoucherTemplate {
  name: string;
  codePosition: { x: number; y: number };
  validUntilPosition: { x: number; y: number };
}

export interface IVoucherTemplate extends IEditableVoucherTemplate {
  templateFileId: string;
  page: number;
}

export interface IVoucherTemplateFile {
  filename: string;
  templateIds: string[];
}

export interface ISettings {
  templates: { [id: string]: IVoucherTemplate };
  templateFiles: { [id: string]: IVoucherTemplateFile };
}
