import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import useUser from '../../../../src/libs/client/useUser';
import { Btn } from '../../../../src/components/Style/Button';
import { Title } from '../../../../src/components/Layout/Title';
import { PostList } from '../../../../src/components/Post/Read/PostList';
import { BoardList } from '../../../../src/components/Board/Read/BoardList';
import { ReviewList } from '../../../../src/components/Review/Read/ReviewList';
import { UserProfileInfo } from '../../../../src/components/User/Profile/UserProfileInfo';
import { FollowingBoards } from '../../../../src/components/User/Profile/FollowingBoards';

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
          <UserProfileInfo user={loggedInUser} />
          <FollowingBoards />
        </article>
        <BtnWrap>
          <Btn
            name="My Boards"
            type="button"
            onClick={() => hadleClick('board', '')}
          />
          <Btn
            name="My Posts"
            type="button"
            onClick={() => hadleClick('post', '')}
          />
          <Btn
            name="My Reviews"
            type="button"
            onClick={() => hadleClick('review', '')}
          />
          <Btn
            name="My Likes"
            type="button"
            onClick={() => hadleClick('likes', '')}
          />
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
            <PostList isAllMyPosts={isLoggedIn} />
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
              <Btn
                name="Posts"
                type="button"
                onClick={() => hadleClick('likes', 'likesPost')}
              />
              <Btn
                name="Reviews"
                type="button"
                onClick={() => hadleClick('likes', 'likesReview')}
              />
            </BtnWrap>
            {likes === 'likesPost' && (
              <>
                <h1>{loggedInUser?.username}님이 좋아하는 포스트</h1>
                <PostList isGetLikes={true} />
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
