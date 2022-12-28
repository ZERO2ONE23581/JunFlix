import { useState } from 'react';
import styled from '@emotion/styled';
import { FollowModal } from './Modal/Follower';
import { Follower, Following } from '@prisma/client';
import { Flex, Flex_ } from '../../../../../../styles/global';
import { hoverVars } from '../../../../../../styles/variants';

interface IFollowInfo {
  _data: {
    num: number;
    theme: boolean;
    isDesk: boolean;
    Follower: Follower[];
    Following: Following[];
  };
}
export const FollowInfo = ({ _data }: IFollowInfo) => {
  const layoutId = 'follow';
  const { theme, num, Follower, Following, isDesk } = _data;
  const count_following = Following.filter((e) => !e.board_id)?.length!;
  const [type, setType] = useState('');
  const onClick = (type: string) => {
    return setType(type);
  };
  const closeModal = () => {
    return setType('');
  };
  return (
    <>
      <Cont isDesk={isDesk}>
        <Each
          custom={theme}
          className="each"
          animate="animate"
          whileHover="hover"
          variants={hoverVars}
          onClick={() => onClick('follower')}
        >
          <span className="num">{num}</span>
          <span>{num > 1 ? 'Followers' : 'Follower'}</span>
        </Each>
        <Each
          custom={theme}
          className="each"
          animate="animate"
          whileHover="hover"
          variants={hoverVars}
          onClick={() => onClick('following')}
        >
          <span className="num">{count_following}</span>
          <span>{count_following > 1 ? 'Followings' : 'Following'}</span>
        </Each>
      </Cont>
      <FollowModal
        _follow={{ Follower, Following, type }}
        _data={{ theme, layoutId, closeModal }}
      />
    </>
  );
};
const Cont = styled(Flex_)`
  gap: 1rem;
  width: fit-content;
  .each {
    font-size: ${(p) => (p.isDesk ? '1.2rem' : '2.2rem')};
    .num {
      font-size: 1.3rem;
      font-size: ${(p) => (p.isDesk ? '1.3rem' : '2.5rem')};
    }
  }
`;

const Each = styled(Flex)`
  gap: 5px;
  cursor: pointer;
  width: fit-content;
`;
