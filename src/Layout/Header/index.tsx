import { Logo } from './Logo';
import { UserMenu } from './User';
import { MainMenu } from './Main';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ITheme } from '../../../styles/theme';
import { headerVar } from '../../../styles/variants';

export const Header = ({ theme }: ITheme) => {
  return (
    <Cont
      className="header"
      exit="exit"
      animate="animate"
      initial="initial"
      custom={!theme}
      variants={headerVar}
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    //border: 5px solid cornflowerblue;
    .main-menu {
      width: 60%;
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
`;
