import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { Dispatch, SetStateAction } from 'react';

interface ITitle {
  isBlur: boolean;
  username: string;
  isMyPage: boolean;
  isFollowing: boolean;
  setFollowModal: Dispatch<SetStateAction<boolean>>;
  setUnFollowModal: Dispatch<SetStateAction<boolean>>;
}
export const Title = ({
  isBlur,
  username,
  isMyPage,
  isFollowing,
  setFollowModal,
  setUnFollowModal,
}: ITitle) => {
  return (
    <Cont>
      <span className="title">
        {username}'s Dashboard
        {isMyPage && <Svg type="isOwner" size="20px" fill={'#2ecc71'} />}
      </span>
      {isFollowing && (
        <Svg
          size="30px"
          type="user-check"
          fill={'#e50815'}
          onClick={() => setUnFollowModal(true)}
        />
      )}
      {isBlur && (
        <Svg
          size="30px"
          type="user-plus"
          onClick={() => setFollowModal(true)}
        />
      )}
    </Cont>
  );
};
const Cont = styled.h1`
  gap: 20px;
  display: flex;
  align-items: center;
  font-size: 2rem;
  padding-left: 15px;
  padding-bottom: 15px;
  .title {
    position: relative;
    .isOwner {
      top: -5px;
      right: -30px;
      position: absolute;
    }
  }
`;
