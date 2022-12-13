import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Flex } from '../../../styles/global';
import { hoverVars } from '../../../styles/variants';
import { useCapLetters } from '../../libs/client/useTools';

interface ISlideTitle {
  _data: {
    type: string;
    theme: boolean;
  };
}
export const Title = ({ _data }: ISlideTitle) => {
  const [txt, setTxt] = useState('');
  const { theme, type } = _data;
  useEffect(() => {
    if (type) {
      if (type === 'tv') return setTxt('TV');
      else return setTxt(useCapLetters(type));
    }
  }, [type, setTxt]);
  const onClick = () => {};
  return (
    <Cont onClick={onClick} className="title">
      <Txt
        custom={theme}
        variants={hoverVars}
        animate="animate"
        whileHover="hover"
      >
        {txt}
      </Txt>
    </Cont>
  );
};
const Cont = styled(Flex)`
  font-size: 1.8rem;
  width: fit-content;
  margin-left: 3.3rem;
  margin-bottom: 1.5rem;
`;
const Txt = styled(motion.h1)`
  cursor: pointer;
`;
