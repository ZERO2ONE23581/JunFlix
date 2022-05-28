import useSWR from 'swr';
import { Btn } from '../Btn';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Board, User } from '@prisma/client';
import useUser from '../../libs/client/useUser';
import { BoardPageCont, PageCont } from '../../../styles/components/default';
import { ThumNail } from '../Post/AllPostsWithBoard';

interface IGetAllBoards {
  ok: boolean;
  allBoards?: IBoard[];
}
interface IBoard extends Board {
  user: User;
}

export const AllBoards = () => {
  const router = useRouter();
  const { isloggedIn, loggedInUser } = useUser();
  const { data } = useSWR<IGetAllBoards>(`/api/board/all_boards`);
  //
  return (
    <BoardPageCont>
      {isloggedIn && (
        <>
          <Btn
            type="create"
            btnName="보드 만들기"
            onClick={() =>
              router.push(`/user/${loggedInUser?.id}/board/create`)
            }
          />
        </>
      )}
      {data?.ok && data.allBoards && (
        <ItemCont>
          {data.allBoards.map((board) => (
            <Link
              key={board.id}
              href={`/user/${board.UserID}/board/${board.id}`}
            >
              <a>
                <Item>
                  <ThumNail>
                    <img src="/img/clapper.svg" alt="썸네일 이미지" />
                  </ThumNail>
                  <ul>
                    <li>
                      <span>Title: </span>
                      <span> {board.title.toUpperCase()}</span>
                    </li>
                    <li>
                      <span>Genre: </span>
                      <span> {board.genre}</span>
                    </li>
                    <li>
                      <span>Made by: </span>
                      <span> {board.user.username}</span>
                    </li>
                  </ul>
                </Item>
              </a>
            </Link>
          ))}
        </ItemCont>
      )}
    </BoardPageCont>
  );
};
const ItemCont = styled.article`
  margin-top: 15px;
  gap: 15px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
const Item = styled.div`
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
  ul {
    width: 100%;
    padding: 10px 20px;
    li {
      border-bottom: 1px dotted ${(p) => p.theme.color.font};
      padding-bottom: 2px;
      margin-bottom: 4px;
      span {
        font-size: 1rem;
      }
    }
  }
`;
