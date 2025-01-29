import type { ISettings, ITexts } from "./sharedTypes";

export {};

declare global {
  interface Window {
    voucher: {
      preview: (voucherId: string, texts: ITexts) => Promise<void>;
      create: (voucherId: string, texts: ITexts) => Promise<string>;
    };
    settings: {
      get: () => Promise<ISettings>;
    };
    template: {
      upload: () => Promise<void>;
    };
  }
}
