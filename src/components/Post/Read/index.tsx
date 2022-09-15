import useSWR from 'swr';
import { PostList } from './List';
import styled from '@emotion/styled';
import { Svg } from '../../Tools/Svg';
import { useRouter } from 'next/router';
import { IGetAllPosts } from '../../../types/post';

interface IIsPost {
  isMyBoard: boolean;
  isFollowing: boolean;
}
export const IsPost = ({ isMyBoard, isFollowing }: IIsPost) => {
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
          <div className="text">
            <span>! 포스트를 보려면 해당 보드를 팔로우 하세요.</span>
            <span>! Follow this BOARD to see these POSTS.</span>
          </div>
          <div className="list">
            <PostList from={8} size={3} isBlur={isBlur} posts={data?.posts!} />
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
    background-color: black;
    padding: 15px;
    width: 500px;
    border-radius: 10px;
    span {
      font-weight: 400;
      font-size: 1.5rem;
      font-style: italic;
      text-align: center;
      color: ${(p) => p.theme.color.logo};
    }
  }
  .list {
    filter: ${(p) => p.isBlur && 'blur(6px)'};
    .post-list {
      gap: 22px;
      margin-top: 30px;
      pointer-events: ${(p) => p.isBlur && 'none'};
      .post {
        min-height: 280px;
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
