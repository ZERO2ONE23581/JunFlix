import { Svg } from './Svg';
import { Btn } from './Button';
import styled from '@emotion/styled';
import { ITheme } from '../../styles/theme';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Modal, Overlay } from '../../styles/global';
import { variants, opacityVar } from '../../styles/variants';
import { useRouter } from 'next/router';

interface IMessageModal extends ITheme {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}
export const MessageModal = ({ message, theme, setMessage }: IMessageModal) => {
  const router = useRouter();
  const [text, setText] = useState({ eng: '', kor: '' });
  const isPostCreated = Boolean(
    message === 'create_post' || message === 'update_post_skip'
  );
  useEffect(() => {
    if (message) {
      if (message === 'create-user-done')
        return setText({
          eng: 'Welcome!',
          kor: ' 가입을 축하합니다!',
        });
      if (isPostCreated) return setText({ eng: 'saved.', kor: '저장완료.' });
      if (message === 'update_post')
        return setText({ eng: 'updated.', kor: '업데이트 완료' });
      //
      else return setText({ eng: message, kor: '' });
    }
  }, [setText, message]);

  const isReload = Boolean(
    message === 'create_post' ||
      message === 'update_post' ||
      message === 'update_post_skip'
  );

  const onClick = () => {
    if (message === 'create-user-done') return router.replace('/login');
    if (isReload) return router.reload();
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
            variants={variants}
            className="msg-modal"
          >
            <Svg
              type="close"
              theme={theme!}
              onClick={onClick}
              item={{ size: '2rem' }}
            />
            {Boolean(text.eng || text.kor) && (
              <Text>
                <span className="eng">{text.eng}</span>
                <span className="kor">{text.kor}</span>
              </Text>
            )}
            <Btn type="button" onClick={onClick} item={{ theme, name: 'OK' }} />
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

const Text = styled(motion.span)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 1.8rem;
  .kor {
    font-size: 1.5rem;
  }
`;
const Cont = styled(Modal)`
  z-index: 101;
  gap: 20px;
  padding: 40px;
  min-width: 400px;
  min-height: 270px;
  padding-top: 50px;
  button {
    width: 120px;
  }
`;
