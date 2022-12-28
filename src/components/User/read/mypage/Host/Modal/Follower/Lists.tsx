import { FollowBtn } from './Btn';
import { UserID } from './userID';
import styled from '@emotion/styled';
import { Follower } from '@prisma/client';
import { Avatar } from '../../../../../../../Tools/Avatar';
import { Flex } from '../../../../../../../../styles/global';

interface IFollowLists {
  _data: {
    theme: boolean;
    array: Follower[];
    isFollower: boolean;
    Filtered: Follower[];
    closeModal: () => void;
  };
}
export const Lists = ({ _data }: IFollowLists) => {
  const { theme, isFollower, closeModal, Filtered, array } = _data;
  return (
    <>
      {Filtered.map((item) => (
        <Cont key={array.indexOf(item)}>
          <Flex className="wrap">
            <Avatar
              _modal={{ closeModal, isModal: true }}
              _data={{
                theme,
                isRound: true,
                host_id: isFollower ? item.host_id : item.user_id!,
              }}
            />
            <UserID host_id={item.host_id} />
          </Flex>
          <FollowBtn
            theme={theme}
            user_id={isFollower ? item.host_id : item.user_id!}
          />
        </Cont>
      ))}
    </>
  );
};
const Cont = styled(Flex)`
  gap: 2rem;
  justify-content: space-between;
  .wrap {
    gap: 2rem;
    width: fit-content;
  }
`;
