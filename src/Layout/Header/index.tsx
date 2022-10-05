import { Logo } from './Logo';
import { useState } from 'react';
import { MenuModal } from './modal';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useCapLetter } from '../../libs/client/useTools';
import { eachMenuVar, TweenTrans } from '../../../styles/variants';
import { UserMenu } from './User';

export const Header = ({ theme }: any) => {
  const [selected, setSelected] = useState('');
  const menuArr = ['board', 'post', 'review', 'movie'];
  const index = (item: string) => Number(menuArr.indexOf(item));
  const isMatch = (item: string) => Boolean(selected === item);
  return (
    <Cont className="header">
      <Logo />
      <Flex className="flex">
        <Menu className="menu">
          {menuArr.map((item) => (
            <Each
              key={index(item)}
              variants={eachMenuVar}
              transition={TweenTrans}
            >
              <Title
                onClick={() => setSelected(item)}
                whileHover={{ color: '#E50914', scale: 1.25 }}
              >
                {useCapLetter(item)}
              </Title>
              <MenuModal
                selected={selected}
                isModal={isMatch(item)}
                setSelected={setSelected}
              />
            </Each>
          ))}
        </Menu>
        <UserMenu theme={theme} />
      </Flex>
    </Cont>
  );
};
const Cont = styled.header`
  gap: 50px;
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border-bottom: ${(p) => p.theme.border.thin};
  background-color: ${(p) => p.theme.color.background};
  .flex {
    border: 5px solid blue;
    .menu {
      border: 2px solid yellow;
    }
    .user-menu {
      border: 2px solid red;
      .isNotLogged {
      }
    }
  }
`;
const Flex = styled.div`
  width: 100%;
  padding-left: 5em;
  padding-right: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Menu = styled(motion.article)`
  gap: 3rem;
  display: flex;
  align-content: center;
  justify-content: center;
`;

const Each = styled(motion.div)`
  cursor: pointer;
  position: relative;
  text-align: center;
  min-width: 100px;
`;
const Title = styled(motion.span)`
  display: block;
  color: white;
`;
