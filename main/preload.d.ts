import type {
  IEditableVoucherTemplate,
  ISettings,
  IVoucherTexts,
  IVoucherTemplate,
  IVoucherInputs,
} from "./sharedTypes";

export {};

declare global {
  interface Window {
    voucher: {
      /** @returns pdfContent */
      preview: (templateId: string, texts: IVoucherTexts) => Promise<string>;
      create: (inputs: IVoucherInputs) => Promise<void>;
      redeem: (voucherId: string, redeem?: boolean) => Promise<void>;
    };
    settings: {
      get: () => Promise<ISettings>;
    };
    template: {
      /** @returns templateId */
      upload: () => Promise<string>;
      /** @returns pdfContent */
      preview: (template: IVoucherTemplate) => Promise<string>;
      edit: (
        templateId: string,
        template: IEditableVoucherTemplate
      ) => Promise<void>;
    };
  }
}
