import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Modal, Overlay } from '../../../styles/global';
import { ITheme } from '../../../styles/theme';
import { AnimatePresence } from 'framer-motion';
import { AnswerTexts } from './answer_texts';
import { scaleVar } from '../../../styles/variants';
import { OverlayBg } from '../overlay';

interface IAnswer extends ITheme {
  type: string;
  answer?: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
  max?: {
    board: {
      title: number;
      desc: number;
    };
  };
}
export const Answer = ({ max, answer, theme, type, closeModal }: IAnswer) => {
  return (
    <AnimatePresence>
      {answer && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            variants={scaleVar}
          >
            <Svg
              type="close"
              theme={theme!}
              onClick={() => closeModal(false)}
            />
            <ul>
              <AnswerTexts type={type} max={max} />
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
