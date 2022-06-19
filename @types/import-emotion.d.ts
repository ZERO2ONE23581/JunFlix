import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      bg: string;
      btn: string;
      font: string;
      logo: string;
      ok: string;
    };
    border?: string;
    boxShadow: {
      nav: string;
      input: string;
    };
  }
}
