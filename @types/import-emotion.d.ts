import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      bg: string;
      background: string;
      btn: string;
      font: string;
      logo: string;
      green: string;
      grey: {
        reg: string;
        dark: string;
        light: string;
      };
    };
    border: {
      thin: string;
      thick: string;
    };
    boxShadow: {
      nav: string;
      input: string;
    };
    svg: {
      calendar: string;
    };
  }
}
