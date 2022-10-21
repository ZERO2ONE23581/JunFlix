import { Svg } from './Svg';
import { Btn } from './Button';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ITheme } from '../../styles/theme';
import { FlexCol, Modal, Overlay } from '../../styles/global';
import { AnimatePresence, motion } from 'framer-motion';
import { variants, opacityVar } from '../../styles/variants';
import { OverlayBg } from './overlay';

interface IMsgModal extends ITheme {
  msg: string;
  closeModal: () => void;
}
export const MsgModal = ({ msg, theme, closeModal }: IMsgModal) => {
  const router = useRouter();
  const [text, setText] = useState({ eng: '', kor: '' });
  const isReload = Boolean(msg === 'update_done' || msg === 'delete_done');
  //
  useEffect(() => {
    if (msg === 'create_user_done')
      setText({ eng: 'Welcome!', kor: ' 가입을 축하합니다!' });
    if (msg === 'update_done')
      setText({ eng: 'Updated.', kor: '업데이트 되었습니다.' });
    if (msg === 'update_fail')
      setText({ eng: 'Update Failed.', kor: '업데이트 실패.' });
    if (msg === 'create_done')
      setText({ eng: 'Saved.', kor: '저장되었습니다.' });
    if (msg === 'delete_done') setText({ eng: 'Deleted.', kor: '삭제완료' });
    //
    if (msg === 'error') alert('error! check your console');
    if (msg) {
      setTimeout(() => {
        closeModal();
        if (isReload) return router.reload();
        if (msg === 'create_user_done') return router.replace('/login');
      }, 2000);
    }
  }, [setText, msg, closeModal, isReload, router]);
  //
  return (
    <AnimatePresence>
      {msg && (
        <>
          <Cont
            exit="exit"
            custom={theme}
            initial="initial"
            animate="animate"
            variants={variants}
            className="msg-modal"
          >
            <Text>
              {text.kor && <span className="kor">{text.kor}</span>}
              {text.eng && <span className="eng">{text.eng}</span>}
            </Text>
          </Cont>
          <OverlayBg zIndex={200} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  top: 30%;
  width: fit-content;
  height: fit-content;
  z-index: 201;
  padding: 40px;
  font-size: 1.5rem;
`;
const Text = styled(FlexCol)`
  gap: 10px;
  align-items: center;
  justify-content: center;
`;
