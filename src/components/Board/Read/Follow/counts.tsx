import styled from '@emotion/styled';

interface IFollowCountsProps {
  counts?: {
    posts: number;
    followers: number;
  };
}
export const FollowCounts = ({ counts }: IFollowCountsProps) => {
  return (
    <Cont className="follow-counts">
      <Box>
        <span>Posts</span>
        <span className="number">{counts?.posts}</span>
      </Box>
      <Box>
        <span>{counts?.followers === 1 ? 'Follower' : 'Followers'}</span>
        <span className="number">{counts?.followers}</span>
      </Box>
    </Cont>
  );
};
const Cont = styled.article`
  width: 100%;
  gap: 20px;
  display: flex;
  align-items: center;
`;
const Box = styled.div`
  .number {
    margin-left: 10px;
  }
`;
