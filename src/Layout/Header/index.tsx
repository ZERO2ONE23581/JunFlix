import { Logo } from './Logo';
import { useState } from 'react';
import { MenuModal } from './modal';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useCapLetter } from '../../libs/client/useTools';
import { TweenTrans } from '../../../styles/variants';
import { UserMenu } from './User';

export const Header = ({ theme }: any) => {
  const [selected, setSelected] = useState('');
  const menuArr = ['board', 'post', 'review', 'movie'];
  const index = (item: string) => Number(menuArr.indexOf(item));
  const isModal = (i: string) => Boolean(selected === i);
  //
  const menuTextVar = {
    initial: (darkTheme: boolean) => ({
      scale: 1,
      color: darkTheme ? '#000000' : '#ffffff',
    }),
    animate: (darkTheme: boolean) => ({
      scale: 1,
      color: darkTheme ? '#000000' : '#ffffff',
    }),
    hover: (darkTheme: boolean) => ({
      scale: 1.25,
      color: '#E50914',
    }),
  };
  return (
    <Cont className="header">
      <Logo />
      <div className="flex">
        <MainMenu className="main-menu">
          {menuArr.map((i) => (
            <div key={index(i)}>
              <motion.span
                custom={theme}
                initial="initial"
                animate="animate"
                whileHover={'hover'}
                className="menu-text"
                variants={menuTextVar}
                transition={TweenTrans}
                onClick={() => setSelected(i)}
              >
                {useCapLetter(i)}
              </motion.span>
              <MenuModal
                isModal={isModal(i)}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          ))}
        </MainMenu>
        <UserMenu theme={theme} />
      </div>
    </Cont>
  );
};
const Cont = styled.header`
  gap: 3em;
  display: flex;
  font-size: 1.3em;
  margin-bottom: 5px;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border-bottom: ${(p) => p.theme.border.thin};
  background-color: ${(p) => p.theme.color.bg};
  .flex {
    width: 100%;
    gap: 10em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    //border: 5px solid cornflowerblue;
    .main-menu {
      width: 70%;
      //border: 2px solid yellow;
    }
    .user-menu {
      width: 30%;
      //border: 2px solid red;
      .isNotLogged {
      }
    }
    span {
      cursor: pointer;
    }
  }
`;
const MainMenu = styled(motion.article)`
  display: flex;
  align-content: center;
  justify-content: space-around;
  > div {
    position: relative;
    .menu-text {
      display: block;
      cursor: pointer;
    }
  }
`;
