import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Page } from '../../../../../styles/global';
import { IData } from '../../../../../src/types/global';
import { Svg } from '../../../../../src/Tools/Svg';
import { HeadTitle } from '../../../../../src/components/Head';
import { useNoAuthority } from '../../../../../src/libs/client/useTools';
import { ProfileAvatar } from '../../../../../src/components/Avatar/Profile';
import { Info } from '../../../../../src/components/User/Read/DashBoard/Profile/Info';
import { Counts } from '../../../../../src/components/User/Read/DashBoard/UserInfo/Counts';
import { UserFollow } from '../../../../../src/components/User/Read/DashBoard/UserInfo/UserFollow';

const MyProfile: NextPage = () => {
  useNoAuthority();
  const router = useRouter();
  const { user_id } = router.query;
  const { data } = useSWR<IData>(user_id && `/api/user/${user_id}`);
  return (
    <>
      <HeadTitle title={`${data?.User?.username}'s Profile`} />
      <Cont>
        <Box>
          <Svg
            size="1.5rem"
            type="left-arrow"
            onClick={() =>
              router.push(`/user/${user_id}/${data?.User?.userId}/dashboard`)
            }
          />
          <ProfileAvatar size={'8rem'} avatar={data?.User?.avatar} />
          <Counts
            counts={{
              boards: data?.User?.posts.length!,
              posts: data?.User?.boards.length!,
              reviews: data?.User?.reviews.length!,
            }}
            user={{ ID: data?.User?.id!, username: data?.User?.username! }}
          />
          <Info user={data?.User!} />
          <UserFollow
            follow={{
              isFollowing: true,
              followers: data?.Followers!,
              followings: data?.Followings!,
            }}
          />
        </Box>
      </Cont>
    </>
  );
};
export default MyProfile;

const Cont = styled(Page)`
  padding: 0 20%;
`;
const Box = styled.article`
  gap: 20px;
  display: flex;
  padding: 40px;
  min-height: 70vh;
  margin: 50px auto;
  border-radius: 8px;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  border: ${(p) => p.theme.border.thick};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  .left-arrow {
    top: 30px;
    right: 30px;
    position: absolute;
  }
`;
