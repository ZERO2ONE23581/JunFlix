import Link from 'next/link';
import { Btn } from '../Button';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { H1, PageCont } from '../../../styles/default';
import { User } from '@prisma/client';
import { BoardWithUser } from '../../types/board';

export interface IBoardListProps {
  loggedInUser?: User;
  boards?: BoardWithUser[];
  selectBoard?: boolean;
  allBoards?: boolean;
}

export const BoardList = ({
  loggedInUser,
  boards,
  selectBoard,
  allBoards,
}: IBoardListProps) => {
  const router = useRouter();
  //
  return (
    <PageCont>
      {allBoards && <H1>ALL BOARDS</H1>}
      {loggedInUser && selectBoard && <H1>Select one of your Boards!</H1>}
      <ItemCont>
        {boards &&
          boards?.map((info) => (
            <Link
              key={info.id}
              href={
                selectBoard
                  ? `/user/${info.UserID}/board/${info.id}/post/create`
                  : `/user/${info.UserID}/board/${info.id}`
              }
            >
              <a>
                <Item>
                  <ThumNail>
                    <img src="/img/clapper.svg" alt="썸네일 이미지" />
                  </ThumNail>
                  <ul>
                    <li>
                      <span>Title: </span>
                      <span> {info.title.toUpperCase()}</span>
                    </li>
                    <li>
                      <span>Genre: </span>
                      <span> {info.genre}</span>
                    </li>
                    <li>
                      <span>Made by: </span>
                      <span> {info.user.username}</span>
                    </li>
                  </ul>
                </Item>
              </a>
            </Link>
          ))}
      </ItemCont>
      {loggedInUser && (
        <Btn
          type="create"
          btnName="보드 만들기"
          onClick={() => router.push(`/user/${loggedInUser.id}/board/create`)}
        />
      )}
    </PageCont>
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
