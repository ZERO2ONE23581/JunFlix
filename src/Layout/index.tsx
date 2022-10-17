import {
  useState,
  Dispatch,
  useEffect,
  ReactElement,
  SetStateAction,
} from 'react';
import { Header } from './Header';
import { Footer } from './footer';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ThemeBtn } from '../Tools/Button/Theme';
import { variants } from '../../styles/variants';

interface ILayoutProps {
  theme: boolean;
  children: ReactElement;
  setTheme: Dispatch<SetStateAction<boolean>>;
}
export const Layout = ({ theme, children, setTheme }: ILayoutProps) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (typeof window !== undefined) setWidth(window?.innerWidth);
  }, []);
  return (
    <Cont
      width={width}
      exit="exit"
      animate="animate"
      initial="initial"
      custom={theme}
      variants={variants}
    >
      <Header theme={theme} />
      <section className="children">{children}</section>
      <Footer theme={!theme} />
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

  .header {
    min-height: 86px;
    //border: 2px solid hotpink;
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
  //배경이 들어감으로 패딩을 직접 주지 말것
  .children {
    padding: 0;
    .home {
      .movie-wrap,
      .post-board-wrap {
        padding: 0 8em;
      }
    }
  }
`;
