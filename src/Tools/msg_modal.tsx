import { Svg } from './Svg';
import { Btn } from './Button';
import styled from '@emotion/styled';
import { ITheme } from '../../styles/theme';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Modal, Overlay } from '../../styles/global';
import { modalVar, opacityVar } from '../../styles/variants';
import { useRouter } from 'next/router';

interface IMessageModal extends ITheme {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}
export const MessageModal = ({ message, theme, setMessage }: IMessageModal) => {
  const router = useRouter();
  const [text, setText] = useState('');

  useEffect(() => {
    if (message) {
      if (message === 'create-user-done') {
        setText('Welcome to Join us! (가입을 축하합니다!)');
      } else setText(message);
    }
  }, [setText, message]);

  const onClick = () => {
    if (message === 'create-user-done') return router.replace('/login');
    else return setMessage('');
  };

  return (
    <AnimatePresence>
      {message && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            variants={modalVar}
            className="msg-modal"
          >
            <Svg size="2rem" type="close" theme={theme!} onClick={onClick} />
            {text && <span>{text}</span>}
            <Btn name="OK" type="button" theme={theme} onClick={onClick} />
          </Cont>
          <Overlay
            zindex={100}
            exit="exit"
            initial="initial"
            animate="animate"
            variants={opacityVar}
          />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  z-index: 101;
  gap: 20px;
  padding: 40px;
  min-width: 400px;
  font-size: 1.4rem;
  padding-top: 50px;
  button {
    width: 120px;
  }
`;
