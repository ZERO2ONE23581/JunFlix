import { Svg } from '../../Svg';
import { TxtLists } from './Txts';
import styled from '@emotion/styled';
import { OverlayBg } from '../../Overlay';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { Modal } from '../../../../styles/global';
import { scaleVar } from '../../../../styles/variants';

interface IAnswer {
  _data: {
    type: string;
    theme?: boolean;
    answer?: boolean;
    closeModal: Dispatch<SetStateAction<boolean>>;
    max?: {
      board: {
        title: number;
        desc: number;
      };
    };
  };
}
export const Answer = ({ _data }: IAnswer) => {
  const max = _data?.max!;
  const type = _data?.type!;
  const theme = _data?.theme!;
  const answer = _data?.answer!;
  const closeModal = _data?.closeModal!;
  return (
    <AnimatePresence>
      {answer && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            variants={scaleVar}
            custom={{ theme, duration: 0.6 }}
          >
            <Svg
              type="close"
              theme={theme!}
              onClick={() => closeModal(false)}
            />
            <ul>
              <TxtLists type={type} max={max} />
            </ul>
          </Cont>
          <OverlayBg closeModal={() => closeModal(false)} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  z-index: 100;
  max-width: 800px;
  margin-top: 12rem;
  font-size: 1.4rem;
  width: fit-content;
  height: fit-content;
  padding: 2.5rem 2rem;
  ul {
    li {
      text-align: center;
      line-height: 30px;
      font-style: italic;
    }
  }
  .logo {
    margin: 0 8px;
    color: ${(p) => p.theme.color.logo};
  }
`;
