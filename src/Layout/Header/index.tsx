import { Logo } from './logo';
import { MainMenu } from './menu';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ITheme } from '../../../styles/theme';
import { LoginMenu } from './login_menu';

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
        <LoginMenu theme={theme} />
      </div>
    </Cont>
  );
};
const Cont = styled(motion.header)`
  padding: 0 10em;
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
  initial: (dark: boolean) => ({
    borderBottom: dark ? '1px solid #ffffff' : '1px solid transparent',
  }),
  animate: (dark: boolean) => ({
    borderBottom: dark ? '1px solid #ffffff' : '1px solid transparent',
  }),
};
