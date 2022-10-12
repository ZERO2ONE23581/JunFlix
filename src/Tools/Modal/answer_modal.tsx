import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Modal, Overlay } from '../../../styles/global';
import { ITheme } from '../../../styles/theme';
import { AnimatePresence } from 'framer-motion';
import { answerVar } from '../../../styles/variants';
import { AnswerTexts } from './answer_texts';

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
            custom={theme}
            exit="exit"
            initial="initial"
            animate="animate"
            variants={answerVar}
          >
            <Svg
              size="2rem"
              type="close"
              theme={theme!}
              onClick={() => closeModal(false)}
            />
            <ul>
              <AnswerTexts type={type} max={max} />
            </ul>
          </Cont>
          <Overlay
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => closeModal(false)}
          />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  font-size: 1.4rem;
  min-width: 300px;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
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
