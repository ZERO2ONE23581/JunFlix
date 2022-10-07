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
    width: 100%;
    height: 100%;
    position: relative;
    color: ${(p) => p.theme.color.font};
    min-width: ${(p) => p.width && `${p.width}px`};
    background-color: ${(p) => p.theme.color.bg};
  }
  .header {
    padding: 12px 10em;
    //border: 2px solid hotpink;
    .logo {
      //border: 5px solid cornflowerblue;
    }
    .flex {
      width: 100%;
      //border: 5px solid cornflowerblue;
      .main-menu {
        width: 50%;
        //border: 2px solid yellow;
      }
      .user-menu {
        //border: 2px solid red;
        .logged-in {
          //border: 2px solid yellow;
        }
        .unlogged-in {
          //border: 2px solid yellow;
        }
      }
      span {
        cursor: pointer;
      }
    }
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
        // border: 1px solid red;
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
