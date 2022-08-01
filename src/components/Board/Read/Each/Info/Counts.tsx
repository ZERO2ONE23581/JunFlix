import styled from '@emotion/styled';

interface IFollowCounts {
  counts?: {
    posts: number;
    followers: number;
  };
}
export const Counts = ({ counts }: IFollowCounts) => {
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
  span {
    font-size: 1.3rem;
  }
  .number {
    font-weight: 500;
    margin-left: 10px;
    font-size: 1.4rem;
    color: ${(p) => p.theme.color.logo};
  }
`;
