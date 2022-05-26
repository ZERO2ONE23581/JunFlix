import useSWR from 'swr';
import { Btn } from '../Btn';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Board, User } from '@prisma/client';
import useUser from '../../libs/client/loggedInUser';
import { BoardPageCont, PageCont } from '../../../styles/components/default';

interface IGetAllBoards {
  ok: boolean;
  error: string;
  myBoards?: IBoard[];
}
interface IBoard extends Board {
  user: User;
}

export const AllMyBoards = () => {
  const router = useRouter();
  const { isloggedIn, loggedInUser, loggedInUserId } = useUser();
  const { data: boards } = useSWR<IGetAllBoards>(
    `/api/user/${loggedInUserId}/board/my_board`
  );
  const boardOk = boards?.ok;
  const noBoardFound = boards?.error;
  const allMyBoards = boards?.myBoards;
  //
  return (
    <BoardPageCont>
      {!isloggedIn ? (
        <article className="wrap">
          <h2>로그인이 필요한 기능입니다!</h2>
          <Btn
            type="login"
            btnName="로그인"
            onClick={() => router.push(`/user/login`)}
          />
        </article>
      ) : (
        <>
          {!Boolean(boardOk && allMyBoards) ? (
            <article className="wrap">
              <NoFound>
                {noBoardFound && <h2>아직 보드가 없습니다.. 🧐</h2>}
              </NoFound>
              <Btn
                type="create"
                btnName="보드 만들기"
                onClick={() =>
                  router.push(`/user/${loggedInUser?.id}/board/create`)
                }
              />
            </article>
          ) : (
            <>
              <ItemCont>
                {allMyBoards?.map((board) => (
                  <Link
                    key={board.id}
                    href={`/user/${board.UserID}/board/${board.id}/post/create`}
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
              <Btn
                type="create"
                btnName="보드 만들기"
                onClick={() =>
                  router.push(`/user/${loggedInUser?.id}/board/create`)
                }
              />
            </>
          )}
        </>
      )}
    </BoardPageCont>
  );
};
const NoFound = styled.span`
  text-align: center;
  font-weight: 700;
  font-size: 1.5rem;
  text-align: center;
  font-style: italic;
  color: ${(p) => p.theme.color.logo};
`;
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
const ThumNail = styled.div`
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border-radius: 5px;
  width: 100%;
  padding: 5px 0;
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
`;
