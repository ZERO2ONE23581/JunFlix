import { Btns } from './Btns';
import styled from '@emotion/styled';
import { FollowInfo } from './Follow';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { Avatar } from '../../../../../Tools/Avatar';
import { IUserType } from '../../../../../types/user';
import { FlexCol } from '../../../../../../styles/global';
import useFollow from '../../../../../libs/client/useFollow';
import { useCapLetter } from '../../../../../libs/client/useTools';
import useFollowUser from '../../../../../libs/client/useFollowing/User';

interface IUserBox {
  _data: {
    theme: boolean;
    host: IUserType;
    isMyAcct: boolean;
    setFixed: Dispatch<SetStateAction<boolean>>;
  };
}
export const Host = ({ _data }: IUserBox) => {
  const router = useRouter();
  const { theme, host, isMyAcct, setFixed } = _data;
  const host_id = host?.id!;
  const userId = host?.userId!;
  const username = host?.username!;
  const Name = username ? username : userId;
  const Follower = host?.followers;
  const Following = host?.followings;
  const { onClick, name, isFollowing, follower } = useFollowUser(host_id);
  const onSetting = () => router.push(`/user/${host_id}/${userId}/setting`);
  console.log(follower);
  return (
    <>
      {host && (
        <Cont className="host">
          <Avatar
            _data={{
              theme,
              host_id,
              isOther: true,
              size: '7.5rem',
              handleClick: onSetting,
            }}
          />
          <Info>
            <span className="name">{useCapLetter(Name)}</span>
            <span className="small">@{userId}</span>
            <FollowInfo
              _data={{ num: follower, theme, Follower, Following, setFixed }}
            />
          </Info>
          <Btns
            _data={{
              theme,
              onSetting,
              isMyAcct,
              host_id,
              onClick,
              name,
              isFollowing,
            }}
          />
        </Cont>
      )}
    </>
  );
};

const Cont = styled(FlexCol)`
  gap: 20px;
  justify-content: center;
`;
const Info = styled(FlexCol)`
  gap: 0.8rem;
  .name {
    font-size: 2rem;
  }
  .small {
    opacity: 0.9;
    font-size: 0.9rem;
  }
`;
