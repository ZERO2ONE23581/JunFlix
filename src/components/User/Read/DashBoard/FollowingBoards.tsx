import useSWR from 'swr';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ProfileAvatar } from '../../../Avatar/profile';
import { IGetFollowInfo } from '../../../../types/board';

export const FollowingBoards = () => {
  const router = useRouter();
  const { user_id } = router.query;
  const { data } = useSWR<IGetFollowInfo>(
    user_id && `/api/user/${user_id}/following/boards`
  );
  const following = data?.following;
  return (
    <Cont>
      <h1>
        <span>Following Boards</span>
        <span className="kor">팔로우중인 보드</span>
        <span className="count">({following?.length})</span>
      </h1>
      {/* <Grid>
        {following
          ?.filter((p) => p.BoardID)
          .map((follow) => (
            <Icon key={follow?.board?.id}>
              <Link
                href={`/user/${follow?.board?.UserID}/board/${follow?.BoardID}/${follow?.board?.title}`}
              >
                <a>
                  <ProfileAvatar size="80px" avatar={follow?.board?.avatar} />
                  <span className="title">
                    {follow?.board?.title.toUpperCase()}
                  </span>
                </a>
              </Link>
            </Icon>
          ))}
      </Grid> */}
    </Cont>
  );
};
const Cont = styled.article`
  h1 {
    font-weight: 500;
    font-size: 1.6rem;
    gap: 10px;
    display: flex;
    align-items: center;
    //border: 1px solid white;
    .kor,
    .count {
      font-size: 1.4rem;
    }
  }
`;
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
      border: 3px solid ${(p) => p.theme.color.font};
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
