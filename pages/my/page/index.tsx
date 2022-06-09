import useSWR from 'swr';
import type { NextPage } from 'next';
import { Title } from '../../../src/components/Layout/Title';
import { BoardList } from '../../../src/components/Board/BoardList';
import { IGetBoards } from '../../../src/types/board';
import useUser from '../../../src/libs/client/useUser';
import { PostList } from '../../../src/components/Post/PostList';
import { IGetAllPosts } from '../../../src/types/post';
import { ReviewList } from '../../../src/components/Review';
import { IGetReviews } from '../../../src/types/review';
import styled from '@emotion/styled';

const MyPage: NextPage = () => {
  const { isloggedIn, loggedInUser } = useUser();
  const { data } = useSWR<IGetBoards>(isloggedIn && `/api/my/boards`);
  const { data: PostData } = useSWR<IGetAllPosts>(
    isloggedIn && `/api/my/posts`
  );
  const { data: ReviewData } = useSWR<IGetReviews>(
    isloggedIn && `/api/my/reviews`
  );
  return (
    <>
      <Title title="마이페이지" />
      <Cont>
        <h1>마이페이지</h1>
        <BoardList
          myBoards={true}
          loggedInUser={loggedInUser}
          boards={data?.boards}
        />
        <PostList myPosts={true} posts={PostData?.posts} />
        <ReviewList
          myReview={true}
          loggedInUser={loggedInUser}
          reviews={ReviewData?.reviews}
        />
      </Cont>
    </>
  );
};
export default MyPage;

const Cont = styled.section`
  border: 10px solid red;
  padding: 20px 200px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 2rem;
    font-weight: 700;
  }
`;
