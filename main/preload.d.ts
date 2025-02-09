import type { ISettings, ITexts, IVoucherSetting } from "./sharedTypes";

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
      preview: (voucher: IVoucherSetting) => Promise<string>;
      /** @returns voucherId */
      create: (voucher: IVoucherSetting) => Promise<string>;
    };
  }
}
