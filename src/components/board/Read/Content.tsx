import styled from '@emotion/styled';
import { NoData } from '../../../Tools/NoData';
import { PostSchema } from '../../Post/Schema';
import { CreatePost } from '../../Post/Create';
import { Dispatch, SetStateAction, useState } from 'react';
import { Blur, FlexPage } from '../../../../styles/global';
import { useGetPosts } from '../../../libs/client/usePosts';
import { Svg } from '../../../Tools/Svg';
import { MsgModal } from '../../../Tools/msg_modal';

interface IBoardCnt {
  _data: {
    theme: boolean;
    host_id: number;
    IsBlur: boolean;
    board_id: number;
    createPost: boolean;
    setFixed: Dispatch<SetStateAction<boolean>>;
    setCreatePost: Dispatch<SetStateAction<boolean>>;
  };
}

export const BoardContent = ({ _data }: IBoardCnt) => {
  const {
    theme,
    IsBlur,
    host_id,
    board_id,
    setFixed,
    createPost,
    setCreatePost,
  } = _data;
  const { posts, isPost } = useGetPosts({ host_id, board_id });
  const closeModal = () => {
    setFixed(false);
    setCreatePost(false);
  };
  const [msg, setMsg] = useState('');
  const onSvg = () => {
    setFixed(true);
    setMsg('blur_board');
  };
  return (
    <Cont>
      {IsBlur && (
        <>
          <MsgModal _data={{ msg, theme }} />
          <Svg type="lock" theme={theme} onClick={onSvg} />
        </>
      )}
      <Blur isBlur={IsBlur}>
        <CreatePost _data={{ theme, createPost, closeModal }} />
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
    z-index: 999;
    position: absolute;
  }
`;
