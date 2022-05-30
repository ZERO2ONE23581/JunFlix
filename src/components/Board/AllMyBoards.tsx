import useSWR from 'swr';
import { Btn } from '../Button';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Board, User } from '@prisma/client';
import useUser from '../../libs/client/useUser';
import { H1, PageCont } from '../../../styles/default';

interface IGetAllBoards {
  ok: boolean;
  error: string;
  boards?: IBoard[];
}
interface IBoard extends Board {
  user: User;
}

export const AllMyBoards = () => {
  const router = useRouter();
  const { isloggedIn, loggedInUser, loggedInUserId } = useUser();
  const { data } = useSWR<IGetAllBoards>(isloggedIn && `/api/my/board`);
  //
  return (
    <PageCont>
      <article className="read-myboard-cont">
        {!isloggedIn ? (
          <article className="btn-wrap">
            <h2>로그인이 필요한 기능입니다!</h2>
            <Btn
              type="login"
              btnName="로그인"
              onClick={() => router.push(`/user/login`)}
            />
          </article>
        ) : (
          <>
            <H1>MY BOARDS</H1>
            {data?.ok && data?.ok ? (
              <article className="btn-wrap">
                <NoFound>
                  {data?.error && <h2>아직 보드가 없습니다.. 🧐</h2>}
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
                  {data?.boards?.map((info) => (
                    <Link
                      key={info.id}
                      href={`/user/${info.UserID}/board/${info.id}`}
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
      </article>
    </PageCont>
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