import styled from '@emotion/styled';
import { Svg } from '../../Tools/Svg';
import { Btn } from '../../Tools/Button';
import { Modal } from '../../../styles/global';
import { color } from '../../../styles/variants';
import { MsgModal } from '../../Tools/msg_modal';
import { OverlayBg } from '../../Tools/overlay';
import useMutation from '../../libs/client/useMutation';
import { LoadingModal } from '../../Tools/Modal/loading_modal';
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
  const handleSubmit = () => {
    if (loading) return;
    if (!isMyPost) return;
    if (!post_id) return;
    setLoading(true);
    return post({ isDelete: true });
  };

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) setMsg(data.error);
        if (data.ok) setMsg('deleted');
        setModal('');
      }, 1000);
    }
  }, [data, setLoading, setMsg]);

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
            <h2>
              <span className="kor">
                <span>이 포스트를 삭제하시겠습니까?</span>
                <span className="small">
                  * 포스트는 삭제 후 복구가 불가합니다.
                </span>
              </span>
              <span className="eng">
                <span>Do you like to delete this post?</span>
                <span className="small">
                  * The post can not be recoverd after this action.
                </span>
              </span>
            </h2>
            <form onSubmit={handleSubmit}>
              <Btn type="submit" item={{ theme, name: 'Delete' }} />
            </form>
          </DeleteModal>
          <OverlayBg
            dark={0.8}
            zIndex={112}
            closeModal={() => setModal('read')}
          />
        </>
      )}
      {Loading && (
        <LoadingModal layoutId={layoutId} theme={theme} zindex={112} />
      )}
      <MsgModal _data={{ msg, theme, layoutId }} />
    </>
  );
};
const DeleteModal = styled(Modal)`
  .close {
    top: 1.3rem;
    left: 1.7rem;
  }
  top: 15rem;
  z-index: 114;
  padding: 3rem 2rem;
  height: fit-content;
  button {
    width: 150px;
    font-size: 1.3rem;
    padding: 10px 20px;
  }
  h2 {
    text-align: center;
    font-size: 1.4rem;
    .small {
      opacity: 0.7;
      font-size: 1.3rem;
      font-style: italic;
    }
    span {
      display: block;
      line-height: 30px;
    }
    > span {
      padding: 10px;
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
