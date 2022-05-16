import { css, Theme } from '@emotion/react';

export const lightTheme: Theme = {
  color: {
    bg: 'white',
    font: 'black',
    logo: '#E50914',
  },
  border: 'none',
  boxShadow: {
    nav: `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px`,
    // input: `rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;`,
    input: `rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;`,
  },
};
export const darkTheme: Theme = {
  color: {
    bg: 'black',
    font: 'white',
    logo: '#E50914',
  },
  border: '1px solid white',
  boxShadow: {
    nav: `rgba(255, 255, 255, .3) 1.95px 1.95px 2.6px;`,
    // input: `rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;`,
    input: `rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;`,
  },
};
