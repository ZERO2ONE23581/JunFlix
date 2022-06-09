import type { NextPage } from 'next';
import { Title } from '../../../src/components/Layout/Title';
import { BoardList } from '../../../src/components/Board/BoardList';
import useUser from '../../../src/libs/client/useUser';
import { PostList } from '../../../src/components/Post/PostList';
import { ReviewList } from '../../../src/components/Review';
import styled from '@emotion/styled';
import { UserInfo } from '../../../src/components/User/Info';

const MyPage: NextPage = () => {
  const { isloggedIn, loggedInUser } = useUser();
  //
  return (
    <>
      <Title title="마이페이지" />
      <Cont>
        <h1>{loggedInUser?.username}'s DashBoard</h1>
        <UserInfo user={loggedInUser} />

        <h1>{loggedInUser?.username}'s Boards</h1>
        <BoardList isMyBoards={isloggedIn} />

        <h1>{loggedInUser?.username}'s Posts</h1>
        <PostList isMyPosts={isloggedIn} />

        <h1>{loggedInUser?.username}'s Review's</h1>
        <ReviewList isMyReview={isloggedIn} />
      </Cont>
    </>
  );
};
export default MyPage;

const Cont = styled.section`
  border: 10px solid red;
  gap: 20px;
  display: flex;
  flex-direction: column;
  padding: 20px 200px;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  h1 {
    font-size: 2rem;
    font-weight: 700;
  }
`;
