export interface ITexts {
  code: string;
  validUntil: string;
}

export interface IVoucherSetting {
  id: string;
  name: string;
  filename: string;
  page: number;
  codePosition: { x: number; y: number };
  validUntilPosition: { x: number; y: number };
}

export interface ISettings {
  vouchers: IVoucherSetting[];
}
