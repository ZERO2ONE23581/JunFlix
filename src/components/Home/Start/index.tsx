import { Txts } from './Txts';
import { StartBtn } from './Btn';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { opacityVar } from '../../../../styles/variants';
import { FlexCol, Mob } from '../../../../styles/global';
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
        <Cont isDesk={isDesk}>
          <Container
            exit="exit"
            initial="initial"
            animate="animate"
            className="start"
            variants={opacityVar}
          >
            <Front className="front">
              <Txts type="main" />
              <StartBtn _data={{ isDesk, theme, setStart }} />
              <Txts type="sub" />
            </Front>
          </Container>
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Mob)`
  .start {
    min-height: ${(p) => (p.isDesk ? '100vh' : '220vh')};
    font-size: ${(p) => (p.isDesk ? '1.4rem' : '2.8rem')};
    > .kor {
      font-size: 1.4rem;
      font-size: ${(p) => (p.isDesk ? '1.4rem' : '2.5rem')};
    }
  }
`;
const Container = styled(motion.section)`
  padding: 2.5rem;
  padding-top: 20vh;
  color: whitesmoke;
  background: url('/img/up.jpg') center / cover no-repeat;

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
