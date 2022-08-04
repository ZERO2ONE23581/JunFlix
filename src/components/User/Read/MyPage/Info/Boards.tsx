import useSWR from 'swr';
import Link from 'next/link';
import styled from '@emotion/styled';
import { ProfileAvatar } from '../../../../Avatar/Profile';
import { IGetFollowInfo } from '../../../../../types/board';

interface IBoardLink {
  USERID: number;
  BOARDID: number;
  TITLE: string;
}
export const Boards = () => {
  const { data } = useSWR<IGetFollowInfo>(`/api/user/my/following/boards`);
  const following = data?.following;
  const BoardLink = ({ USERID, BOARDID, TITLE }: IBoardLink) =>
    `/user/${USERID}/board/${BOARDID}/${TITLE}`;
  return (
    <Cont className="boards">
      <h1>
        <span>Following Boards</span>
        <span className="kor">팔로우중인 보드</span>
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
                <ProfileAvatar size="5rem" avatar={follow.board?.avatar} />
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
const Cont = styled.article``;
const Grid = styled.article`
  gap: 5px;
  display: grid;
  margin-top: 20px;
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
    padding: 5px;
    margin-top: 5px;
    font-size: 0.8rem;
    border-radius: 5px;
    text-align: center;
  }
`;
