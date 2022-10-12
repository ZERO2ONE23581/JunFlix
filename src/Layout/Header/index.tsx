import { Logo } from './Logo';
import { UserMenu } from './user';
import { MainMenu } from './main';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ITheme } from '../../../styles/theme';

export const Header = ({ theme }: ITheme) => {
  return (
    <Cont
      className="header"
      animate="animate"
      initial="initial"
      variants={headerVar}
      custom={{ theme, isBorder: true }}
    >
      <Logo />
      <div className="flex">
        <MainMenu theme={theme} />
        <UserMenu theme={theme} />
      </div>
    </Cont>
  );
};
const Cont = styled(motion.header)`
  gap: 3rem;
  display: flex;
  font-size: 1.3em;
  margin-bottom: 5px;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${(p) => p.theme.boxShadow.input};
  .logo {
    //border: 5px solid cornflowerblue;
  }
  .flex {
    width: 100%;
    min-width: 620px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .main-menu {
      width: 60%;
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
`;
const headerVar = {
  initial: (light: boolean) => ({
    borderBottom: light ? 'none' : '1px solid black',
  }),
  animate: (light: boolean) => ({
    borderBottom: light ? 'none' : '1px solid black',
  }),
};
