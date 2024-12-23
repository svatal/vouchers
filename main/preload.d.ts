export {};

interface IText {
  text: string;
  x: number;
  y: number;
}

declare global {
  interface Window {
    voucher: {
      preview: (pageNumber: number, texts: IText[]) => Promise<void>;
      create: (pageNumber: number, texts: IText[]) => Promise<string>;
    };
  }
}
