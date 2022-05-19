import styled from '@emotion/styled';
import { Board } from '@prisma/client';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import {
  Article,
  BoardPage,
  Flex,
  PageContainer,
} from '../../../../../styles/components/default';

interface IBoardRes {
  board: Board;
}

const myBlog: NextPage = () => {
  const router = useRouter();
  const { userId, boardId } = router.query;
  const { data } = useSWR<IBoardRes>(`/api/board/${Number(boardId)}`);
  const boardTitle = data?.board?.title?.toUpperCase();
  //

  return (
    <>
      <BoardPage>
        {data && (
          <BoardCont>
            <h1>{boardTitle}</h1>
            <h2>{data?.board?.genre}</h2>
            <h3>{data?.board?.intro}</h3>
          </BoardCont>
        )}
      </BoardPage>
    </>
  );
};
export default myBlog;

const BoardCont = styled(Article)`
  flex-direction: column;
  justify-content: center;
  padding: 20px 100px;
  width: 100%;
  h1 {
    font-weight: 600;
    font-size: 1.5rem;
    text-align: start;
  }
  h2 {
    text-align: end;
  }
  h3 {
    text-align: start;
    font-size: 1rem;
  }
`;
