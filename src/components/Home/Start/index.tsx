import { Txts } from './Txts';
import { StartBtn } from './Btn';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { opacityVar } from '../../../../styles/variants';
import { FlexCol, FlexPage } from '../../../../styles/global';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface IStartPage {
  _data: {
    theme: boolean;
    isHide: boolean;
    setStart: Dispatch<SetStateAction<boolean>>;
  };
}
export const Start = ({ _data }: IStartPage) => {
  const { theme, isHide, setStart } = _data;
  return (
    <AnimatePresence>
      {isHide && (
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          variants={opacityVar}
        >
          <Front>
            <Txts type="main" />
            <StartBtn _data={{ theme, setStart }} />
            <Txts type="sub" />
          </Front>
        </Cont>
      )}
    </AnimatePresence>
  );
};

const Cont = styled(FlexPage)`
  padding: 0 2rem;
  justify-content: center;
  background: linear-gradient(to top, black, transparent),
    url('/img/1.jpg') center / cover no-repeat;
`;
const Front = styled(FlexCol)`
  gap: 2rem;
  padding-top: 4rem;
  color: whitesmoke;
`;
