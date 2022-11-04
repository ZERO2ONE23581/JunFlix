import { Text } from './Text';
import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { Btn } from '../../../Tools/Button';
import { IPostType } from '../../../types/post';
import { Modal } from '../../../../styles/global';
import { color } from '../../../../styles/variants';
import { MsgModal } from '../../../Tools/msg_modal';
import { OverlayBg } from '../../../Tools/overlay';
import { useUser } from '../../../libs/client/useUser';
import useMutation from '../../../libs/client/useMutation';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IDeletePost {
  _data: {
    modal: string;
    theme: boolean;
    post: IPostType;
    setModal: Dispatch<SetStateAction<string>>;
  };
}
export const DeletePost = ({ _data }: IDeletePost) => {
  const { modal, theme, post, setModal } = _data;
  const post_id = post?.id;
  const { user_id } = useUser();
  const host_id = post?.host_id;
  const layoutId = post_id + '';

  const [delete_post, { data, loading }] = useMutation(
    `/api/post/${post_id}/delete`
  );
  const [Loading, setLoading] = useState(false);
  const onClick = () => {
    if (loading) return;
    const isMyPost = Boolean(user_id === host_id);
    if (!isMyPost) return alert('invalid host');
    if (!post_id) return alert('no post id');
    setLoading(true);
    return delete_post({ isDelete: true });
  };
  const [msg, setMsg] = useState('');
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

  const open = Boolean(modal === 'delete') && !Loading;
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
            <Svg type="close" theme={theme} onClick={() => setModal('read')} />
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
