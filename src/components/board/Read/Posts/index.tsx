import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../../../Tools/Svg';
import { NoData } from '../../../../Tools/NoData';
import { PostSchema } from '../../../Post/Schema';
import { CreatePost } from '../../../Post/Create';
import { IBoardType } from '../../../../types/board';
import { IsBlur } from '../../../../libs/client/useBlur';
import { MsgModal } from '../../../../Tools/Modal/Message';
import { Blur, FlexPage } from '../../../../../styles/global';
import { useGetPosts } from '../../../../libs/client/usePosts';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IBoardPosts {
  _data: {
    theme: boolean;
    board: IBoardType;
    createPost: boolean;
    setFixed: Dispatch<SetStateAction<boolean>>;
    setCreatePost: Dispatch<SetStateAction<boolean>>;
  };
}
export const BoardPosts = ({ _data }: IBoardPosts) => {
  const { board, theme, createPost, setFixed, setCreatePost } = _data;
  const router = useRouter();
  const host_id = board?.host_id!;
  const [msg, setMsg] = useState('');
  const board_id = Number(router.query.board_id);
  const result = IsBlur({ host_id, board_id })?.msg!;
  const { posts } = useGetPosts({ host_id, board_id });
  const isBlur = IsBlur({ host_id, board_id })?.isBlur!;

  const closeModal = () => {
    setFixed(false);
    setCreatePost(false);
  };
  const onSvg = () => {
    setFixed(true);
    setMsg(result);
  };
  useEffect(() => {
    if (createPost) setFixed(true);
  }, [setFixed, createPost]);
  const noPosts = !Boolean(posts?.length! > 0);
  return (
    <Cont>
      {isBlur && (
        <>
          <MsgModal _data={{ msg, theme }} />
          <Svg type="lock" theme={theme} onClick={onSvg} />
        </>
      )}
      <CreatePost _data={{ theme, createPost, closeModal, setFixed }} />
      <Blur isBlur={isBlur!}>
        {!noPosts && (
          <PostSchema setFixed={setFixed} _data={{ theme, posts, grid: 5 }} />
        )}
        {noPosts && (
          <NoData _data={{ theme, isMy: false, type: 'board_post' }} />
        )}
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
