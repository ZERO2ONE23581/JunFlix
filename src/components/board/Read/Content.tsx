import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { NoData } from '../../../Tools/NoData';
import { PostSchema } from '../../Post/Schema';
import { CreatePost } from '../../Post/Create';
import { MsgModal } from '../../../Tools/msg_modal';
import { Blur, FlexPage } from '../../../../styles/global';
import { useGetPosts } from '../../../libs/client/usePosts';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IBoardCnt {
  _blur: {
    msg: string;
    IsBlur: boolean;
  };
  _data: {
    theme: boolean;
    host_id: number;
    board_id: number;
    createPost: boolean;
  };
  _set: {
    setFixed: Dispatch<SetStateAction<boolean>>;
    setCreatePost: Dispatch<SetStateAction<boolean>>;
  };
}

export const BoardContent = ({ _data, _blur, _set }: IBoardCnt) => {
  const { msg: blur_msg, IsBlur } = _blur;
  const { setFixed, setCreatePost } = _set;
  const { theme, host_id, board_id, createPost } = _data;
  const { posts, isPost } = useGetPosts({ host_id, board_id });
  const closeModal = () => {
    setFixed(false);
    setCreatePost(false);
  };
  const [msg, setMsg] = useState('');
  const onSvg = () => {
    setFixed(true);
    setMsg(blur_msg);
  };
  useEffect(() => {
    if (createPost) setFixed(true);
  }, [setFixed, createPost]);
  return (
    <Cont>
      {IsBlur && (
        <>
          <MsgModal _data={{ msg, theme }} />
          <Svg type="lock" theme={theme} onClick={onSvg} />
        </>
      )}
      <CreatePost _data={{ theme, createPost, closeModal }} />
      <Blur isBlur={IsBlur}>
        {isPost && (
          <PostSchema setFixed={setFixed} _data={{ theme, posts, grid: 5 }} />
        )}
        {!isPost && <NoData theme={theme} />}
      </Blur>
    </Cont>
  );
};

const Cont = styled(FlexPage)`
  padding: 0 10rem;
  position: relative;
  justify-content: flex-start;
  .lock {
    top: 25%;
    left: 50%;
    z-index: 1;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;
