import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      bg: string;
      font: string;
    };
  }
}
