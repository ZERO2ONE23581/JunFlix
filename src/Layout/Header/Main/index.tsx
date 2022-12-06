import { Modal } from './Modal';
import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Flex } from '../../../../styles/global';
import { ITheme } from '../../../../styles/theme';
import { useCapLetter } from '../../../libs/client/useTools';
import { colorVar, hoverScale } from '../../../../styles/variants';

export const Main = ({ theme }: ITheme) => {
  const textVar = { ...colorVar, ...hoverScale };
  const [selected, setSelected] = useState('');
  const menuArr = ['board', 'post', 'review', 'movie'];
  const isModal = (i: string) => Boolean(selected === i);
  const index = (item: string) => Number(menuArr.indexOf(item));
  //
  return (
    <Cont>
      {menuArr.map((i) => (
        <div key={index(i)} className="array">
          <motion.div
            custom={theme}
            variants={textVar}
            onClick={() => setSelected(i)}
            exit="exit"
            className="txt"
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            {useCapLetter(i)}
          </motion.div>
          <Modal
            theme={theme}
            selected={selected}
            isModal={isModal(i)}
            setSelected={setSelected}
          />
        </div>
      ))}
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 4rem;
  min-width: 440px;
  .array {
    position: relative;
    .txt {
      display: block;
      cursor: pointer;
    }
  }
`;
