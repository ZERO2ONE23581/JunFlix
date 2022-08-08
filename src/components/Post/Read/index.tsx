import useSWR from 'swr';
import { PostList } from './List';
import styled from '@emotion/styled';
import { Svg } from '../../Tools/Svg';
import { useRouter } from 'next/router';
import { IGetAllPosts } from '../../../types/post';

interface IIsPost {
  text: boolean;
  isMyBoard: boolean;
  isFollowing: boolean;
}
export const IsPost = ({ text, isMyBoard, isFollowing }: IIsPost) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const { data } = useSWR<IGetAllPosts>(
    user_id && board_id && `/api/user/${user_id}/board/${board_id}/post`
  );
  const isBlur = !isMyBoard && !isFollowing;
  const isPost = Boolean(data?.posts?.length! > 0);
  return (
    <>
      {isPost && (
        <Blur isBlur={isBlur}>
          {!text && (
            <div className="text">
              <span>포스트를 보려면 보드를 팔로우 하세요.</span>
              <span>Follow the board to see POSTS.</span>
            </div>
          )}
          <div className="list">
            <PostList from={6} size={3} isBlur={isBlur} posts={data?.posts!} />
          </div>
        </Blur>
      )}
      {!isPost && (
        <NoPost>
          <div className="line">
            <Svg type="ellipsis-v" size="1.8rem" fill={'#E50815'} />
            <Svg type="ellipsis-v" size="1.8rem" fill={'#E50815'} />
          </div>
          <div className="line">
            <Svg type="ellipsis-v" size="1.8rem" fill={'#E50815'} />
            <Svg type="ellipsis-v" size="1.8rem" fill={'#E50815'} />
          </div>
          <div className="box">
            <span>아직 포스트가 없습니다...</span>
            <span>(No Post yet...)</span>
            <Svg type="emoji-kiss" size="2rem" />
          </div>
        </NoPost>
      )}
    </>
  );
};
const Blur = styled.div<{ isBlur: boolean }>`
  width: 100vw;
  margin: 0 auto;
  max-width: 1200px;
  position: relative;
  .text {
    top: 50%;
    left: 50%;
    width: 100vw;
    z-index: 101;
    margin: 0 auto;
    max-width: 1200px;
    position: absolute;
    transform: translate(-50%, -50%);
    gap: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    display: ${(p) => !p.isBlur && 'none'};
    span {
      font-style: italic;
      text-align: center;
      font-size: 1.5rem;
    }
  }
  .list {
    filter: ${(p) => p.isBlur && 'blur(6px)'};
    .post-list {
      pointer-events: ${(p) => p.isBlur && 'none'};
      .post {
        min-height: 400px;
      }
    }
  }
`;
const NoPost = styled.div`
  max-width: 1000px;
  margin: 5px auto;
  .line {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .box {
    gap: 10px;
    padding: 8px;
    opacity: 0.9;
    display: flex;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    background-color: ${(p) => p.theme.color.bg};
    border: 5px solid ${(p) => p.theme.color.logo};
  }
  span {
    font-size: 1.3rem;
    text-align: center;
    font-style: italic;
  }
`;
