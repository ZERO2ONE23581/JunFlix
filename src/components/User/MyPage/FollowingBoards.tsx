import useSWR from 'swr';
import Link from 'next/link';
import styled from '@emotion/styled';
import { ThumnailAvatar } from '../../Avatar/Thumnail';
import { IGetFollowInfo } from '../../../types/follow';
import { ProfileAvatar } from '../../Avatar/ProfileAvatar';

interface IBoardLink {
  USERID: number;
  BOARDID: number;
  TITLE: string;
}
export const FollowingBoards = () => {
  const { data } = useSWR<IGetFollowInfo>(`/api/user/my/following/boards`);
  const following = data?.following;
  const BoardLink = ({ USERID, BOARDID, TITLE }: IBoardLink) =>
    `/user/${USERID}/board/${BOARDID}/${TITLE}`;
  return (
    <Cont>
      <h1>
        <span>Following Boards</span>
        <span className="kor">팔로우한 보드</span>
      </h1>
      <Grid>
        {following?.map((follow) => (
          <Icon key={follow.board?.id}>
            <Link
              href={BoardLink({
                USERID: follow?.board?.UserID,
                BOARDID: follow?.board?.id,
                TITLE: follow?.board?.title,
              })}
            >
              <a>
                <ProfileAvatar
                  size="5rem"
                  url={follow.board?.avatar}
                  preview=""
                />
                <span className="title">
                  {follow.board?.title.toUpperCase()}
                </span>
              </a>
            </Link>
          </Icon>
        ))}
      </Grid>
    </Cont>
  );
};
const Cont = styled.article`
  width: 40%;
  height: 100%;
  padding: 20px 50px;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  h1 {
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 20px;
    span {
      margin-right: 20px;
    }
    .kor {
      font-size: 1.4rem;
    }
  }
`;
const Grid = styled.article`
  gap: 5px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
const Icon = styled.article`
  a {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .profile-avatar {
      border: ${(p) => p.theme.border.thick};
      border: 4px solid ${(p) => p.theme.color.font};
    }
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
