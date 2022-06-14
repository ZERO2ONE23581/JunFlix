import type { NextPage } from 'next';
import { Title } from '../../../src/components/Layout/Title';
import { BoardList } from '../../../src/components/Board/List';
import useUser from '../../../src/libs/client/useUser';
import { PostList } from '../../../src/components/Post/List';
import { ReviewList } from '../../../src/components/Review/list';
import styled from '@emotion/styled';
import { UserInfo } from '../../../src/components/User/mypage/Info';
import { useState } from 'react';
import { Btn } from '../../../styles/btn';
import { FollowingBoards } from '../../../src/components/User/mypage/follow';

const MyPage: NextPage = () => {
  const { isLoggedIn, loggedInUser } = useUser();
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
        <article className="userinfo-follow-wrap">
          <UserInfo user={loggedInUser} />
          <FollowingBoards />
        </article>
        <BtnWrap>
          <Button onClick={() => hadleClick('board', '')}>My Boards</Button>
          <Button onClick={() => hadleClick('post', '')}>My Posts</Button>
          <Button onClick={() => hadleClick('review', '')}>My Reviews</Button>
          <Button onClick={() => hadleClick('likes', '')}>My Likes</Button>
        </BtnWrap>

        {tab === 'board' && (
          <>
            <h1>{loggedInUser?.username}'s Boards</h1>
            <BoardList isMyBoards={isLoggedIn} />
          </>
        )}

        {tab === 'post' && (
          <>
            <h1>{loggedInUser?.username}'s Posts</h1>
            <PostList isMyPosts={isLoggedIn} />
          </>
        )}
        {tab === 'review' && (
          <>
            <h1>{loggedInUser?.username}'s Review's</h1>
            <ReviewList isMyReview={isLoggedIn} />
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
  width: 80%;
  margin: 0 auto;
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
  .userinfo-follow-wrap {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
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
