import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { Modal, Overlay } from '../../styles/global';
import { ITheme } from '../../styles/theme';
import { Btn } from './Button';
import { Svg } from './Svg';

interface IErrModal extends ITheme {
  error: string;
  setDataErr: Dispatch<SetStateAction<string>>;
}
export const ErrModal = ({ error, theme, setDataErr }: IErrModal) => {
  const errVar = {
    initial: (theme: boolean) => ({
      opacity: 0,
      //color: theme ? '#000000' : '#ffffff',
      color: theme ? '#000000' : '#ffffff',
      borderColor: theme ? '#000000' : '#ffffff',
      backgroundColor: theme ? '#ffffff' : '#000000',
    }),
    animate: (theme: boolean) => ({
      opacity: 1,
      transition: {
        duration: 0.3,
      },
      color: '#ff0000',
      borderColor: '#ff0000',
      backgroundColor: theme ? '#ffffff' : '#000000',
    }),
    exit: (theme: boolean) => ({
      opacity: 0,
    }),
  };
  //
  return (
    <AnimatePresence>
      {error && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            className="err-modal"
            custom={theme}
            variants={errVar}
          >
            <Svg
              size="2rem"
              type="close"
              theme={theme!}
              onClick={() => setDataErr('')}
            />
            <span>{error}</span>
            <Btn
              name="OK"
              type="button"
              theme={theme}
              onClick={() => setDataErr('')}
            />
          </Cont>
          <Overlay exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  font-size: 2rem;
  padding: 40px;
  min-width: 400px;
  padding-top: 50px;
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-width: 3px;
  ul {
    li {
      text-align: center;
      line-height: 25px;
      :nth-of-type(1) {
        margin-bottom: 10px;
      }
    }
    .err {
      opacity: 0.9;
      font-style: italic;
    }
  }
  button {
    width: 80px;
    padding: 5px 10px;
    span {
    }
  }
`;
