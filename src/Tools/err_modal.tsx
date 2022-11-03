import styled from '@emotion/styled';
import { OverlayBg } from './overlay';
import { Modal } from '../../styles/global';
import { AnimatePresence } from 'framer-motion';
import { UseFormClearErrors } from 'react-hook-form';
import { color, redColor } from '../../styles/variants';

interface IErrMsg {
  _data: {
    id: string;
    theme: boolean;
    error?: string;
    clearErrors?: UseFormClearErrors<any>;
  };
}
export const ErrModal = ({ _data }: IErrMsg) => {
  const id = _data?.id!;
  const theme = _data?.theme!;
  const error = _data?.error!;
  const clearErrors = _data?.clearErrors!;

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
            <span>{error}</span>
          </Cont>
          <OverlayBg
            closeModal={() => clearErrors(id)}
            zIndex={221}
            dark={0.8}
          />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  z-index: 222;
  height: 200px;
  width: fit-content;
  height: fit-content;
  min-height: 150px;
  margin-top: 20rem;
  font-size: 1.3rem;
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
