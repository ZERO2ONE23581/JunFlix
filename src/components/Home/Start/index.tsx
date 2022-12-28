import { Txts } from './Txts';
import { StartBtn } from './Btn';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { FlexCol } from '../../../../styles/global';
import { AnimatePresence, motion } from 'framer-motion';
import { opacityVar } from '../../../../styles/variants';
import { useResponsive } from '../../../libs/client/useTools';

interface IStartPage {
  _data: {
    theme: boolean;
    isHide: boolean;
    setStart: Dispatch<SetStateAction<boolean>>;
  };
}
export const Start = ({ _data }: IStartPage) => {
  const { isDesk } = useResponsive();
  const { theme, isHide, setStart } = _data;
  return (
    <AnimatePresence>
      {isHide && (
        <Cont
          exit="exit"
          isDesk={isDesk}
          initial="initial"
          animate="animate"
          variants={opacityVar}
        >
          <Front className="front">
            <Txts type="main" />
            <StartBtn _data={{ isDesk, theme, setStart }} />
            <Txts type="sub" />
          </Front>
        </Cont>
      )}
    </AnimatePresence>
  );
};

const Cont = styled(motion.section)<{ isDesk: boolean }>`
  padding: 2.5rem;
  padding-top: 20vh;
  color: whitesmoke;
  min-height: ${(p) => (p.isDesk ? '100%' : '220vh')};
  font-size: ${(p) => (p.isDesk ? '1.4rem' : '2.8rem')};
  background: url('/img/up.jpg') center / cover no-repeat;
  .start_btn {
  }
  > .kor {
    font-size: 1.4rem;
    font-size: ${(p) => (p.isDesk ? '1.4rem' : '2.5rem')};
  }
  .main {
    font-size: 2rem;
    .kor {
      font-size: 1.8rem;
    }
  }
`;
const Front = styled(FlexCol)`
  gap: 2rem;
  padding-top: 4rem;
  color: whitesmoke;
`;
