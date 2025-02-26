export interface IVoucherTexts {
  code: string;
  validUntil: string;
}

export interface IVoucherInputs extends IVoucherTexts {
  templateId: string;
  note: string;
}

export interface IVoucher extends IVoucherInputs {
  createdAtTicks: number;
  isRedeemed: boolean;
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
  vouchers: { [id: string]: IVoucher };
  templates: { [id: string]: IVoucherTemplate };
  templateFiles: { [id: string]: IVoucherTemplateFile };
}
