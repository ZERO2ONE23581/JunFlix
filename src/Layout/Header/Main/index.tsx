import { useState } from 'react';
import { MenuModal } from './modal';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ITheme } from '../../../../styles/theme';
import { menuTextVar, TweenTrans } from '../../../../styles/variants';
import { useCapLetter } from '../../../libs/client/useTools';

export const MainMenu = ({ theme }: ITheme) => {
  const [selected, setSelected] = useState('');
  const menuArr = ['board', 'post', 'review', 'movie'];
  const isModal = (i: string) => Boolean(selected === i);
  const index = (item: string) => Number(menuArr.indexOf(item));
  //
  return (
    <Cont className="main-menu">
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
    </Cont>
  );
};
const Cont = styled(motion.article)`
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
