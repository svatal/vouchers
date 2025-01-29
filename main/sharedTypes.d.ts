export interface ITexts {
  code: string;
  validUntil: string;
}

export interface IVoucherSetting {
  id: string;
  name: string;
  templateId: string;
  page: number;
  codePosition: { x: number; y: number };
  validUntilPosition: { x: number; y: number };
}

export interface IVoucherTemplate {
  filename: string;
  pageCount: number;
}

export interface ISettings {
  vouchers: IVoucherSetting[];
  templates: { [filename: string]: IVoucherTemplate };
}
