import { Text } from './Text';
import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { Btn } from '../../../Tools/Button';
import { IPostType } from '../../../types/post';
import { Modal } from '../../../../styles/global';
import { color } from '../../../../styles/variants';
import { OverlayBg } from '../../../Tools/OverlayBg';
import { MobModal } from '../../../../styles/mobile';
import { useUser } from '../../../libs/client/useUser';
import { MsgModal } from '../../../Tools/Modal/Message';
import useMutation from '../../../libs/client/useMutation';
import { LoadingModal } from '../../../Tools/Modal/Loading';
import { useResponsive } from '../../../libs/client/useTools';
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
  const { isDesk } = useResponsive();
  const size = isDesk ? '2rem' : '3.3rem';
  return (
    <>
      {open && (
        <Cont isDesk={isDesk}>
          <Modal
            exit="exit"
            custom={theme}
            variants={vars}
            initial="initial"
            animate="animate"
            className="modal"
            layoutId={layoutId}
          >
            <Svg
              type="close"
              theme={theme}
              item={{ size }}
              onClick={() => setModal('read')}
            />
            <Text />
            <Btn
              type="button"
              onClick={onClick}
              item={{ theme, name: 'Delete' }}
            />
          </Modal>
          <OverlayBg
            dark={0.8}
            zIndex={112}
            closeModal={() => setModal('read')}
          />
        </Cont>
      )}
      {Loading && <LoadingModal layoutId={layoutId} theme={theme} />}
      <MsgModal _data={{ msg, theme, layoutId }} />
    </>
  );
};
const Cont = styled(MobModal)`
  .modal {
    z-index: 114;
    h2 {
      .small {
        font-size: ${(p) => (p.isDesk ? '1.3rem' : '2.4rem')};
      }
      font-size: ${(p) => (p.isDesk ? '1.5rem' : '2.5rem')};
    }
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
