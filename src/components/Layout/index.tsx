import { Header } from './Header';
import { Footer } from './Footer';
import styled from '@emotion/styled';
import { ReactElement, useEffect, useState } from 'react';
import { ThemeBtn, IBtns } from '../Tools/Button/Theme';

interface ILayoutProps extends IBtns {
  children: ReactElement;
}
export const Layout = ({ children, setTheme, isLight }: ILayoutProps) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (typeof window !== undefined) setWidth(window?.innerWidth);
  }, [setWidth]);

  return (
    <Cont width={width}>
      <Header />
      <section className="children">{children}</section>
      <Footer />
      <ThemeBtn isLight={isLight} setTheme={setTheme} />
    </Cont>
  );
};

const Cont = styled.section<{ width: number }>`
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  .header,
  .children,
  .footer {
    min-width: ${(p) => p.width && `${p.width}px`};
  }
  .header {
    padding: 0.6em 12em;
    //border: 5px solid red;
  }
  .footer {
    padding: 0 12em;
    border: 1px solid blue;
  }
  .children {
    //border: 10px solid orange;
    .home {
      .movie-wrap,
      .post-board-wrap {
        padding: 0 8em;
        border: 1px solid red;
      }
      .movie-wrap {
      }
      .post-board-wrap {
      }
    }
  }
  .footer {
    //border: 5px solid yellow;
  }
`;
