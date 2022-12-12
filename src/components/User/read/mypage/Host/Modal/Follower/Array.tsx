import { Array } from '.';
import { FollowBtn } from './Btn';
import { FollowUserId } from './userID';
import { Follower } from '@prisma/client';
import { Avatar } from '../../../../../../../Tools/Avatar';
import { Flex } from '../../../../../../../../styles/global';
interface IFollowArr {
  _data: {
    theme: boolean;
    array: Follower[];
    isFollower: boolean;
    Filtered: Follower[];
    closeModal: () => void;
  };
}

export const FollowArr = ({ _data }: IFollowArr) => {
  const { theme, isFollower, closeModal, Filtered, array } = _data;
  return (
    <>
      {Filtered.map((el) => (
        <Array key={array.indexOf(el)}>
          <Flex className="wrap">
            <Avatar
              _modal={{ closeModal, isModal: true }}
              _data={{
                theme,
                size: '3.5rem',
                host_id: isFollower ? el.host_id : el.user_id!,
              }}
            />
            <FollowUserId host_id={el.host_id} />
          </Flex>
          <FollowBtn
            theme={theme}
            user_id={isFollower ? el.host_id : el.user_id!}
          />
        </Array>
      ))}
    </>
  );
};
