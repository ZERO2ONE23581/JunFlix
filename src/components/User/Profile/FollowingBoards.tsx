import useSWR from 'swr';
import Link from 'next/link';
import styled from '@emotion/styled';
import { IGetFollowInfo } from '../../../types/follow';
import { FollowingBoardAvatar } from '../Avatar/FollowingBoardAvatar';

export const FollowingBoards = () => {
  const { data } = useSWR<IGetFollowInfo>(`/api/my/follow`);
  const following = data?.following;

  return (
    <Cont>
      <h1>Following Boards</h1>
      <Grid>
        {following?.map((following) => (
          <FollowingBoard key={following.board?.id}>
            <Link
              href={`/user/${following.board.UserID}/board/${following.board.id}`}
            >
              <a>
                <FollowingBoardAvatar url={following.board?.avatar} />
                <span className="title">
                  {following.board?.title.toUpperCase()}
                </span>
              </a>
            </Link>
          </FollowingBoard>
        ))}
      </Grid>
    </Cont>
  );
};
const Cont = styled.section`
  width: 500px;
  padding: 20px 50px;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  h1 {
    margin-bottom: 20px;
  }
`;
const Grid = styled.article`
  gap: 5px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
const FollowingBoard = styled.article`
  a {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .title {
    font-size: 0.7rem;
    padding: 5px;
    margin-top: 5px;
    border-radius: 5px;
    border: ${(p) => p.theme.border};
    box-shadow: ${(p) => p.theme.boxShadow.input};
  }
`;
