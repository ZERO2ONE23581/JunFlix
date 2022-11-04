import styled from '@emotion/styled';
import { OverlayBg } from './overlay';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { variants } from '../../styles/variants';
import { FlexCol, Modal } from '../../styles/global';

interface IMsgModal {
  _data: {
    msg: string;
    theme: boolean;
    layoutId?: string;
  };
}
export const MsgModal = ({ _data }: IMsgModal) => {
  const msg = _data?.msg!;
  const theme = _data?.theme!;
  const layoutId = _data?.layoutId!;
  const router = useRouter();
  const [text, setText] = useState({ eng: '', kor: '' });
  const reload = () => {
    setTimeout(() => {
      return router.reload();
    }, 2000);
  };
  //
  useEffect(() => {
    if (msg === 'error') alert('error! check your console');
    if (msg === 'create_user_done')
      return setText({ eng: 'Welcome!', kor: ' 가입을 축하합니다!' });
    if (msg === 'updated') {
      setText({ eng: 'Updated.', kor: '업데이트 되었습니다.' });
      return reload();
    }
    if (msg === 'created') {
      setText({ eng: 'Saved.', kor: '저장되었습니다.' });
      return reload();
    }
    if (msg === 'need_login') {
      setText({ eng: 'You must Login.', kor: '로그인이 필요합니다.' });
      return reload();
    }
    if (msg === 'deleted') {
      setText({ eng: 'Deleted.', kor: '삭제완료' });
      return reload();
    } else {
      return setText({ eng: msg, kor: '' });
    }
  }, [msg, setText]);
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
            layoutId={layoutId}
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
  z-index: 999;
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
