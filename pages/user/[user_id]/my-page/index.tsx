import type { NextPage } from 'next';
import useSWR from 'swr';
import { BoardList } from '../../../../src/components/Board/BoardList';
import { Title } from '../../../../src/components/Layout/Title';
import { PostList } from '../../../../src/components/Post/PostList';
import { ReviewList } from '../../../../src/components/Review';
import useUser from '../../../../src/libs/client/useUser';
import { IGetBoards } from '../../../../src/types/board';
import { IGetAllPosts } from '../../../../src/types/post';
import { IGetReviews } from '../../../../src/types/review';

const My_Page: NextPage = () => {
  const { isloggedIn, loggedInUser } = useUser();
  const { data: BoardsData } = useSWR<IGetBoards>(
    loggedInUser && `/api/user/${loggedInUser.id}/board/my_boards`
  );
  const { data: PostsData } = useSWR<IGetAllPosts>(
    loggedInUser && `/api//user/${loggedInUser.id}/post/my_posts`
  );
  const isQueryId = isloggedIn && loggedInUser;
  const { data: ReivewsData } = useSWR<IGetReviews>(
    loggedInUser && `/api/user/${loggedInUser.id}/review/my-reviews`
  );
  const SignedIn = isloggedIn && loggedInUser;
  //
  return (
    <>
      <Title title="마이페이지" />
      {SignedIn && (
        <>
          {BoardsData?.ok && BoardsData?.boards && (
            <BoardList
              myBoards={true}
              boards={BoardsData.boards}
              loggedInUser={loggedInUser}
            />
          )}
          {<PostList myPosts={true} posts={PostsData?.posts} />}
          {ReivewsData?.ok && ReivewsData?.reviews && (
            <ReviewList
              myReview={true}
              isloggedIn={isloggedIn}
              loggedInUser={loggedInUser}
              reviews={ReivewsData?.reviews}
            />
          )}
        </>
      )}
    </>
  );
};
export default My_Page;
