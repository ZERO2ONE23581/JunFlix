import { FollowUserId } from './userID';
import { Follower } from '@prisma/client';
import { Avatar } from '../../../../../../../Tools/Avatar';
import { Flex } from '../../../../../../../../styles/global';
import { Array } from '.';

interface IIsMe {
  _data: {
    theme: boolean;
    isFollower: boolean;
    follower: Follower;
    closeModal: () => void;
  };
}

export const IsMe = ({ _data }: IIsMe) => {
  const { closeModal, theme, follower, isFollower } = _data;
  const open = Boolean(follower && isFollower);
  return (
    <>
      {open && (
        <Array>
          {follower && (
            <Flex className="wrap">
              <Avatar
                _modal={{ closeModal, isModal: true }}
                _data={{
                  theme,
                  size: '3.5rem',
                  host_id: follower.host_id,
                }}
              />
              <FollowUserId host_id={follower.host_id} />
            </Flex>
          )}
        </Array>
      )}
    </>
  );
};
