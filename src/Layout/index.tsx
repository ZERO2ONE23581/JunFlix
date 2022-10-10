import { Header } from './Header';
import { Footer } from './Footer';
import styled from '@emotion/styled';
import { ReactElement, useEffect, useState } from 'react';
import { ThemeBtn, IBtns } from '../Tools/Button/Theme';
import { motion } from 'framer-motion';
import { variants } from '../../styles/variants';

interface ILayoutProps extends IBtns {
  children: ReactElement;
}
export const Layout = ({ theme, children, setTheme }: ILayoutProps) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (typeof window !== undefined) setWidth(window?.innerWidth);
  }, []);
  return (
    <Cont
      width={width}
      custom={theme}
      variants={variants}
      exit="exit"
      animate="animate"
      initial="initial"
    >
      <Header theme={theme} />
      <section className="children">{children}</section>
      <Footer theme={theme} />
      <ThemeBtn theme={theme} setTheme={setTheme} />
    </Cont>
  );
};

const Cont = styled(motion.section)<{ width?: number }>`
  .header,
  .children,
  .footer {
    width: 100%;
    height: 100%;
    position: relative;
    min-width: ${(p) => p.width && `${p.width}px`};
  }
  .header,
  .footer {
    padding: 0 10em;
  }
  .header {
    min-height: 86px;
    //border: 2px solid hotpink;
    .logo {
      ////border: 5px solid cornflowerblue;
    }
    .flex {
      width: 100%;
      //border: 5px solid cornflowerblue;
      .main-menu {
        width: 50%;
        //border: 2px solid yellow;
      }
      .user-menu {
        width: fit-content;
        //border: 3px solid red;
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
    //border: 1px solid blue;
  }
  //배경이 들어감으로 패딩을 직접 주지 말것
  .children {
    padding: 0;
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
