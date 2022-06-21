import styled from '@emotion/styled';

interface IFollowCountsProps {
  counts?: {
    posts: number;
    followers: number;
  };
}

export const FollowCounts = ({ counts }: IFollowCountsProps) => {
  return (
    <Cont>
      <Box>
        <span>Posts</span>
        <span className="number data">{counts?.posts}</span>
      </Box>
      <Box>
        <span>{counts?.followers === 1 ? 'Follower' : 'Followers'}</span>
        <span className="number data">{counts?.followers}</span>
      </Box>
    </Cont>
  );
};
const Cont = styled.article`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: end;
  font-size: 1.3rem;
`;
const Box = styled.div`
  .number {
    margin-left: 5px;
    font-weight: 600;
    font-size: 1.4rem;
  }
`;
