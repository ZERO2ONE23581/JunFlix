import { MessageType } from './Type';
import styled from '@emotion/styled';
import { OverlayBg } from '../overlay';
import { Modal } from '../../../styles/global';
import { AnimatePresence } from 'framer-motion';
import { UseFormClearErrors } from 'react-hook-form';
import { color, redColor } from '../../../styles/variants';

interface IErrMsg {
  _data: {
    id?: string;
    theme: boolean;
    error?: string;
    clearErrors?: UseFormClearErrors<any>;
  };
}
export const ErrModal = ({ _data }: IErrMsg) => {
  const { id, theme, error, clearErrors } = _data;
  const { txt } = MessageType({ error });
  const closeModal = () => clearErrors!(id);
  return (
    <AnimatePresence>
      {error && (
        <>
          <Cont
            exit="exit"
            custom={theme}
            initial="initial"
            animate="animate"
            className="err-modal"
            variants={errModalVar}
          >
            <span className="txt">
              {txt.kor && <span className="kor">{txt.kor}</span>}
              {txt.eng && <span>{txt.eng}</span>}
            </span>
          </Cont>
          <OverlayBg dark={0.8} zIndex={221} closeModal={closeModal} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  z-index: 222;
  height: 200px;
  min-height: 150px;
  margin-top: 20rem;
  font-size: 1.3rem;
  width: fit-content;
  height: fit-content;
  .txt {
    text-align: center;
    span {
      display: block;
      font-size: 1.6rem;
    }
    .kor {
      font-size: 1.5rem;
    }
  }
`;
const errModalVar = {
  initial: (theme: boolean) => ({
    scale: 0.1,
    opacity: 0,
  }),
  animate: (theme: boolean) => ({
    scale: 1,
    opacity: 1,
    color: redColor,
    transition: { duration: 0.3 },
    backgroundColor: color(!theme),
  }),
  exit: (theme: boolean) => ({
    scale: 0.1,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};
