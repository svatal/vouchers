export interface ITexts {
  code: string;
  validUntil: string;
}

export interface IVoucherSetting {
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
  vouchers: { [id: string]: IVoucherSetting };
  templates: { [id: string]: IVoucherTemplate };
}
