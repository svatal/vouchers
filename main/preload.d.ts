import type { ISettings, ITexts, IVoucherTemplate } from "./sharedTypes";

export {};

declare global {
  interface Window {
    voucher: {
      /** @returns pdfContent */
      preview: (voucherId: string, texts: ITexts) => Promise<string>;
      create: (voucherId: string, texts: ITexts) => Promise<void>;
    };
    settings: {
      get: () => Promise<ISettings>;
    };
    template: {
      /** @returns templateId */
      upload: () => Promise<string>;
      /** @returns pdfContent */
      preview: (voucher: IVoucherTemplate) => Promise<string>;
      /** @returns voucherId */
      create: (voucher: IVoucherTemplate) => Promise<string>;
    };
  }
}
