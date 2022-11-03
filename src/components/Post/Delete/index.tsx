import { Text } from './Text';
import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { Btn } from '../../../Tools/Button';
import { Modal } from '../../../../styles/global';
import { color } from '../../../../styles/variants';
import { MsgModal } from '../../../Tools/msg_modal';
import { OverlayBg } from '../../../Tools/overlay';
import useMutation from '../../../libs/client/useMutation';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IDeletePost {
  _data: {
    modal: string;
    theme: boolean;
    post_id: number;
    isMyPost: boolean;
    setModal: Dispatch<SetStateAction<string>>;
  };
}
export const DeletePost = ({ _data }: IDeletePost) => {
  const modal = _data?.modal!;
  const theme = _data?.theme!;
  const post_id = _data?.post_id!;
  const isMyPost = _data?.isMyPost!;
  const setModal = _data?.setModal!;
  //
  const layoutId = post_id + '';
  const [msg, setMsg] = useState('');
  const [Loading, setLoading] = useState(false);
  const open = Boolean(modal === 'delete') && !Loading;
  const [post, { data, loading }] = useMutation(`/api/post/${post_id}/delete`);
  const onClick = () => {
    if (loading) return;
    if (!isMyPost) return alert('invalid host');
    if (!post_id) return alert('no post id');
    setLoading(true);
    return post({ isDelete: true });
  };
  useEffect(() => {
    if (data) {
      setModal('');
      setTimeout(() => {
        setLoading(false);
        if (data.error) setMsg(data.error);
        if (data.ok) setMsg('deleted');
      }, 1000);
    }
  }, [data, setLoading, setMsg]);
  const closeModal = () => setModal('read');
  return (
    <>
      {open && (
        <>
          <DeleteModal
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            variants={vars}
            layoutId={layoutId}
          >
            <Svg type="close" theme={theme} onClick={closeModal} />
            <Text />
            <Btn
              type="button"
              onClick={onClick}
              item={{ theme, name: 'Delete' }}
            />
          </DeleteModal>
          <OverlayBg
            dark={0.8}
            zIndex={112}
            closeModal={() => setModal('read')}
          />
        </>
      )}
      {Loading && <LoadingModal layoutId={layoutId} theme={theme} />}
      <MsgModal _data={{ msg, theme, layoutId }} />
    </>
  );
};
const DeleteModal = styled(Modal)`
  top: 15rem;
  z-index: 114;
  padding: 3rem 2rem;
  height: fit-content;
  button {
    width: 150px;
    font-size: 1.3rem;
    padding: 10px 20px;
  }
  .close {
    top: 1.3rem;
    left: 1.7rem;
  }
`;
const vars = {
  initial: () => ({
    opacity: 0,
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    color: '#E50914',
    border: '3px solid #E50914',
    backgroundColor: color(!theme),
    transition: { duration: 0.3 },
  }),
  exit: () => ({
    opacity: 0,
  }),
};
