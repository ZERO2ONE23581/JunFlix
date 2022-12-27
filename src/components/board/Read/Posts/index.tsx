import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../../../Tools/Svg';
import { NoData } from '../../../../Tools/NoData';
import { PostSchema } from '../../../Post/Schema';
import { CreatePost } from '../../../Post/Create';
import { IBoardType } from '../../../../types/board';
import { IsBlur, useResponsive } from '../../../../libs/client/useTools';
import { MsgModal } from '../../../../Tools/Modal/Message';
import { Blur, FlexPage, Page } from '../../../../../styles/global';
import { useGetPosts } from '../../../../libs/client/usePosts';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IBoardPosts {
  _data: {
    theme: boolean;
    board: IBoardType;
    createPost: boolean;
    setCreatePost: Dispatch<SetStateAction<boolean>>;
  };
}
export const BoardPosts = ({ _data }: IBoardPosts) => {
  const { board, theme, createPost, setCreatePost } = _data;
  const router = useRouter();
  const host_id = board?.host_id!;
  const [msg, setMsg] = useState('');
  const board_id = Number(router.query.board_id);
  const result = IsBlur({ host_id, board_id })?.msg!;
  const { posts } = useGetPosts({ host_id, board_id });
  const isBlur = IsBlur({ host_id, board_id })?.isBlur!;
  const closeModal = () => {
    setCreatePost(false);
  };
  const onSvg = () => {
    setMsg(result);
  };
  const length = posts?.length!;
  const { isDesk } = useResponsive();
  const noPosts = !Boolean(length > 0);
  const grid = length > 6 ? 6 : length;
  const size = isDesk ? '2rem' : '4rem';
  return (
    <Cont isDesk={isDesk}>
      {isBlur && (
        <>
          <MsgModal _data={{ msg, theme }} />
          <Svg item={{ size }} type="lock" theme={theme} onClick={onSvg} />
        </>
      )}
      <CreatePost _data={{ theme, createPost, closeModal }} />
      <Blur isBlur={isBlur!}>
        {!noPosts && <PostSchema _data={{ theme, posts, grid }} />}
        {noPosts && (
          <NoData _data={{ theme, isMy: false, type: 'board_post' }} />
        )}
      </Blur>
    </Cont>
  );
};

const Cont = styled(Page)<{ isDesk: boolean }>`
  padding: 2rem 0;
  .lock {
    top: 25%;
    left: 50%;
    z-index: 1;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;
