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
import { variants } from '../../styles/variants';

interface ILayoutProps {
  children: ReactElement;
  _data: {
    hide: boolean;
    theme: boolean;
    setTheme: Dispatch<SetStateAction<boolean>>;
    setHide: Dispatch<SetStateAction<boolean>>;
  };
}
export const Layout = ({ _data, children }: ILayoutProps) => {
  const [width, setWidth] = useState(0);
  const { theme, hide, setTheme, setHide } = _data;
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
      {!hide && <Header theme={theme} setTheme={setTheme} />}
      <section className="children">{children}</section>
      {!hide && <Footer theme={!theme} />}
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
    //min-height: 86px;
    .flex {
      width: 100%;
      .main-menu {
        width: 50%;
      }
      .user-menu {
        width: fit-content;
        .logged-in {
        }
        .unlogged-in {
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
