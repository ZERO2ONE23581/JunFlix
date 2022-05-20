import { Btn } from '../Btn';
import styled from '@emotion/styled';
import { HomeArticle, PageCont } from '../../../styles/components/default';
import useSWR from 'swr';
import { Board, User } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IGetAllBoards {
  ok: boolean;
  allBoards?: IBoard[];
}
interface IBoard extends Board {
  user: User;
}

export const MainComponent = () => {
  const router = useRouter();
  const { data } = useSWR<IGetAllBoards>(`/api/board/all_boards`);
  //
  return (
    <PageCont>
      <HomeArticle>
        <h1>WELCOME TO JUNFLIX!</h1>
        <Btn
          type="create"
          btnName="Create Clapper"
          onClick={() => router.push('/board/create')}
        />
      </HomeArticle>
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
    </PageCont>
  );
};
const ItemCont = styled.article`
  margin-top: 15px;
  gap: 15px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
