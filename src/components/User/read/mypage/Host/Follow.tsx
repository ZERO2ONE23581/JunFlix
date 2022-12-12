import styled from '@emotion/styled';
import { FollowModal } from './Modal/Follower';
import { Follower, Following } from '@prisma/client';
import { Flex } from '../../../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';
import { hoverVars } from '../../../../../../styles/variants';

interface IFollowInfo {
  _data: {
    num: number;
    theme: boolean;
    Follower: Follower[];
    Following: Following[];
    setFixed: Dispatch<SetStateAction<boolean>>;
  };
}
export const FollowInfo = ({ _data }: IFollowInfo) => {
  const layoutId = 'follow';
  const { setFixed, theme, num, Follower, Following } = _data;
  const count_following = Following.filter((e) => !e.board_id)?.length!;
  const [type, setType] = useState('');
  const onClick = (type: string) => {
    setFixed(true);
    return setType(type);
  };
  const closeModal = () => {
    setFixed(false);
    return setType('');
  };
  return (
    <>
      <FollowModal
        _follow={{ Follower, Following, type }}
        _data={{ theme, layoutId, closeModal }}
      />
      <Cont>
        <Each
          animate="animate"
          whileHover="hover"
          custom={theme}
          variants={hoverVars}
          onClick={() => onClick('follower')}
        >
          <span className="num">{num}</span>
          <span>{num > 1 ? 'Followers' : 'Follower'}</span>
        </Each>
        <Each
          animate="animate"
          whileHover="hover"
          custom={theme}
          variants={hoverVars}
          onClick={() => onClick('following')}
        >
          <span className="num">{count_following}</span>
          <span>{count_following > 1 ? 'Followings' : 'Following'}</span>
        </Each>
      </Cont>
    </>
  );
};
const Each = styled(Flex)`
  gap: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  width: fit-content;
  .num {
    font-size: 1.3rem;
  }
`;
const Cont = styled(Flex)`
  gap: 1rem;
  width: fit-content;
`;
