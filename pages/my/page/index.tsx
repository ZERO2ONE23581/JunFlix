import type { NextPage } from 'next';
import { Title } from '../../../src/components/Layout/Title';
import { BoardList } from '../../../src/components/Board/BoardList';
import useUser from '../../../src/libs/client/useUser';
import { PostList } from '../../../src/components/Post/PostList';
import { ReviewList } from '../../../src/components/Review';
import styled from '@emotion/styled';
import { UserInfo } from '../../../src/components/User/Info';
import { useState } from 'react';
import { Btn } from '../../../styles/btn';

const MyPage: NextPage = () => {
  const { isloggedIn, loggedInUser } = useUser();
  const [tab, setTab] = useState('board');
  const [likes, setLikes] = useState('likesPost');
  const hadleClick = (type: string, likesType: string) => {
    if (type) setTab(type);
    if (likesType) setLikes(likesType);
  };
  //
  return (
    <>
      <Title title="마이페이지" />

      <Cont>
        <h1>{loggedInUser?.username}'s DashBoard</h1>
        <UserInfo user={loggedInUser} />
        <BtnWrap>
          <Button onClick={() => hadleClick('board', '')}>My Boards</Button>
          <Button onClick={() => hadleClick('post', '')}>My Posts</Button>
          <Button onClick={() => hadleClick('review', '')}>My Reviews</Button>
          <Button onClick={() => hadleClick('likes', '')}>My Likes</Button>
        </BtnWrap>

        {tab === 'board' && (
          <>
            <h1>{loggedInUser?.username}'s Boards</h1>
            <BoardList isMyBoards={isloggedIn} />
          </>
        )}

        {tab === 'post' && (
          <>
            <h1>{loggedInUser?.username}'s Posts</h1>
            <PostList isMyPosts={isloggedIn} />
          </>
        )}
        {tab === 'review' && (
          <>
            <h1>{loggedInUser?.username}'s Review's</h1>
            <ReviewList isMyReview={isloggedIn} />
          </>
        )}
        {tab === 'likes' && (
          <>
            <BtnWrap>
              <LikesTabBtn onClick={() => hadleClick('likes', 'likesPost')}>
                Posts
              </LikesTabBtn>
              <LikesTabBtn onClick={() => hadleClick('likes', 'likesReview')}>
                Reviews
              </LikesTabBtn>
            </BtnWrap>
            {likes === 'likesPost' && (
              <>
                <h1>{loggedInUser?.username}님이 좋아하는 포스트</h1>
                <PostList findLikes={true} />
              </>
            )}
            {likes === 'likesReview' && (
              <>
                <h1>{loggedInUser?.username}님이 좋아하는 리뷰</h1>
                <ReviewList findLikes={true} />
              </>
            )}
          </>
        )}
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
const BtnWrap = styled.article`
  gap: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled(Btn)`
  padding: 10px 20px;
`;
const LikesTabBtn = styled(Button)`
  width: 100%;
`;