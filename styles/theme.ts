import { Theme } from '@emotion/react';

export const lightTheme: Theme = {
  color: {
    bg: 'white',
    font: 'black',
    btn: 'black',
    logo: '#E50914',
    green: '#2ecc71',
  },
  border: {
    thin: 'none',
    thick: 'none',
  },
  boxShadow: {
    nav: `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px`,
    input: `rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;`,
  },
  svg: {
    calendar: 'url("/img/calendar.svg") center / cover no-repeat',
  },
};
export const darkTheme: Theme = {
  color: {
    bg: 'black',
    font: 'white',
    btn: '#dfe6e9',
    logo: '#E50914',
    green: '#2ecc71',
  },
  border: {
    thin: '1px solid #2D2C2C',
    thick: '1px solid #636e72',
  },
  boxShadow: {
    nav: `rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px`,
    input: `rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;`,
  },
  svg: {
    calendar: 'url("/img/calendar-invert.svg") center / cover no-repeat',
  },
};
