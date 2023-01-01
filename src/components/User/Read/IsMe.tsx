import { UserID } from '../UserID';
import styled from '@emotion/styled';
import { Follower } from '@prisma/client';
import { Flex } from '../../../../styles/global';
import { Avatar } from '../../../Tools/Avatar';

interface IIsMe {
  _data: {
    theme: boolean;
    follower: Follower;
    isFollower: boolean;
    closeModal: () => void;
  };
}
export const IsMe = ({ _data }: IIsMe) => {
  const { closeModal, theme, follower, isFollower } = _data;
  const open = Boolean(follower && isFollower);
  const _avatar = { theme, isRound: true };
  return (
    <>
      {open && (
        <Cont>
          {follower && (
            <Flex className="wrap">
              <Avatar
                _modal={{ closeModal, isModal: true }}
                _data={{ ..._avatar, host_id: follower.host_id }}
              />
              <UserID host_id={follower.host_id} />
            </Flex>
          )}
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Flex)`
  gap: 2rem;
  justify-content: space-between;
  .wrap {
    gap: 2rem;
    width: fit-content;
    border: 5px solid pink;
  }
`;
