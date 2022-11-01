import { useState } from 'react';
import { MenuModal } from './Modal';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ITheme } from '../../../../styles/theme';
import { useCapLetter } from '../../../libs/client/useTools';
import { colorVar, hoverScale } from '../../../../styles/variants';

export const MainMenu = ({ theme }: ITheme) => {
  const textVar = { ...colorVar, ...hoverScale };
  const [selected, setSelected] = useState('');
  const menuArr = ['board', 'post', 'review', 'movie'];
  const isModal = (i: string) => Boolean(selected === i);
  const index = (item: string) => Number(menuArr.indexOf(item));
  //
  return (
    <Cont className="main-menu">
      {menuArr.map((i) => (
        <div key={index(i)} className="array">
          <Text
            exit="exit"
            animate="animate"
            initial="initial"
            whileHover="hover"
            custom={theme}
            variants={textVar}
            onClick={() => setSelected(i)}
          >
            {useCapLetter(i)}
          </Text>

          <MenuModal
            theme={theme}
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
  .array {
    position: relative;
  }
`;
const Text = styled(motion.span)`
  display: block;
  cursor: pointer;
`;
