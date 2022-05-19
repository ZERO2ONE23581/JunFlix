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

const myBoard: NextPage = () => {
  const router = useRouter();
  const { boardId } = router.query;
  const { data } = useSWR<IBoardRes>(`/api/board/${Number(boardId)}`);
  //
  return (
    <>
      <BoardPage>
        {data && (
          <BoardCont>
            <h1>{data?.board?.title?.toUpperCase()}</h1>
            <h2>{data?.board?.genre}</h2>
            <h3>{data?.board?.intro}</h3>
          </BoardCont>
        )}
      </BoardPage>
    </>
  );
};
export default myBoard;

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
