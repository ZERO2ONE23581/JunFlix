import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { PostSchema } from '../../../../Post/Schema';
import { BoardsGrid } from '../../../../Board/Read/Grid';
import { useGetPosts } from '../../../../../libs/client/usePosts';
import { useGetBoards } from '../../../../../libs/client/useBoards';

interface IUserContent {
  _data: {
    theme: boolean;
    clicked: string;
    setFixed: Dispatch<SetStateAction<boolean>>;
  };
}
export const UserContent = ({ _data }: IUserContent) => {
  const router = useRouter();
  const { theme, setFixed, clicked } = _data;
  const host_id = Number(router.query.user_id!);
  const { boards, isBoard, Saved, isSaved } = useGetBoards(host_id);
  const { posts, likedPosts, QS } = useGetPosts({ host_id, board_id: 0 });
  return (
    <Cont>
      {clicked === 'posts' && (
        <PostSchema setFixed={setFixed} _data={{ grid: 5, theme, posts }} />
      )}
      {clicked === 'likes' && (
        <PostSchema
          setFixed={setFixed}
          _data={{ grid: 5, theme, posts: likedPosts! }}
        />
      )}
      {clicked === 'boards' && (
        <BoardsGrid
          _data={{ theme, isBoard, boards, quickSaved: QS, user_id: host_id }}
        />
      )}
      {clicked === 'saved' && (
        <BoardsGrid _data={{ theme, isBoard: isSaved, boards: Saved! }} />
      )}
    </Cont>
  );
};
const Cont = styled.article`
  padding: 1rem 10rem;
  .posts_grid_wrap {
    //min-width: 900px;
  }
`;
