import { Header } from './Header';
import { Footer } from './Footer';
import styled from '@emotion/styled';
import { ReactElement, useEffect, useState } from 'react';
import { ThemeBtn, IBtns } from '../Tools/Button/Theme';

interface ILayoutProps extends IBtns {
  children: ReactElement;
}
export const Layout = ({ theme, children, setTheme }: ILayoutProps) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (typeof window !== undefined) setWidth(window?.innerWidth);
  }, []);
  return (
    <Cont width={width}>
      <Header theme={theme} />
      <section className="children">{children}</section>
      <Footer theme={theme} />
      <ThemeBtn theme={theme} setTheme={setTheme} />
    </Cont>
  );
};

const Cont = styled.section<{ width?: number }>`
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  .header,
  .children,
  .footer {
    min-width: ${(p) => p.width && `${p.width}px`};
    min-width: 1500px;
  }
  .header {
    padding: 0.6em 12em;
    border: 2px solid hotpink;
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
