import type { ISettings, ITexts, IVoucherSetting } from "./sharedTypes";

export {};

declare global {
  interface Window {
    voucher: {
      preview: (voucherId: string, texts: ITexts) => Promise<string>;
      create: (voucherId: string, texts: ITexts) => Promise<void>;
    };
    settings: {
      get: () => Promise<ISettings>;
    };
    template: {
      upload: () => Promise<void>;
      preview: (voucher: IVoucherSetting) => Promise<string>;
      create: (voucher: IVoucherSetting) => Promise<void>;
    };
  }
}
