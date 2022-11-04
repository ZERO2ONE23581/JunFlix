import styled from '@emotion/styled';
import { Flex } from '../../../../../../styles/global';

interface IFollowInfo {
  _data: {
    followers: number;
    followings: number;
  };
}
export const FollowInfo = ({ _data }: IFollowInfo) => {
  const { followers, followings } = _data;
  const type = (type: string) => {
    if (type === 'follower') {
      const txt = followers > 1 ? 'Followers' : 'Follower';
      return { num: followers, txt };
    }
    if (type === 'following') {
      const txt = followings > 1 ? 'Followers' : 'Follower';
      return { num: followers, txt };
    }
  };
  return (
    <Cont>
      <Flex>
        <span className="num">{type('follower')?.num}</span>
        <span>{type('follower')?.txt}</span>
      </Flex>
      <Flex>
        <span className="num">{type('following')?.num}</span>
        <span>{type('following')?.txt}</span>
      </Flex>
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 1rem;
  font-size: 1.1rem;
  > div {
    gap: 5px;
    width: fit-content;
  }
  .num {
    font-size: 1.25rem;
  }
`;
