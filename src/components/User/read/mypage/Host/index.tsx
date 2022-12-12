import { Btns } from './Btns';
import styled from '@emotion/styled';
import { FollowInfo } from './Follow';
import { useRouter } from 'next/router';
import { UserPrivate } from './Private';
import { Dispatch, SetStateAction } from 'react';
import { Avatar } from '../../../../../Tools/Avatar';
import { IUserType } from '../../../../../types/user';
import { FlexCol } from '../../../../../../styles/global';
import { useCapLetter } from '../../../../../libs/client/useTools';
import useFollowUser from '../../../../../libs/client/useFollowing/User';
import { useUserPrivate } from '../../../../../libs/client/useUser';

interface IUserBox {
  _mode: {
    onPrivate: boolean;
    onClick: () => void;
  };
  _data: {
    theme: boolean;
    host: IUserType;
    isMyAcct: boolean;
    setFixed: Dispatch<SetStateAction<boolean>>;
  };
}
export const Host = ({ _data, _mode }: IUserBox) => {
  const router = useRouter();
  const { onClick: onMode, onPrivate } = _mode;
  const { theme, host, isMyAcct, setFixed } = _data;
  const host_id = host?.id!;
  const userId = host?.userId!;
  const username = host?.username!;
  const Follower = host?.followers!;
  const Following = host?.followings!;
  const Name = username ? username : userId;
  const { onClick, name, isFollowing, follower } = useFollowUser(host_id);
  const onSetting = () => router.push(`/user/${host_id}/${userId}/setting`);
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
            <span className="small">@{userId.toUpperCase()}</span>
            {isMyAcct && <UserPrivate _data={{ theme, onMode, onPrivate }} />}
            <FollowInfo
              _data={{ theme, setFixed, Follower, Following, num: follower }}
            />
          </Info>
          <Btns
            _data={{ name, theme, onClick, isMyAcct, onSetting, isFollowing }}
          />
        </Cont>
      )}
    </>
  );
};

const Cont = styled(FlexCol)`
  gap: 20px;
  margin: 0 auto;
  width: fit-content;
  justify-content: center;
  //border: 2px solid red;
`;
const Info = styled(FlexCol)`
  gap: 0.8rem;
  .name {
    font-size: 2rem;
  }
  .small {
    opacity: 0.9;
    color: #3498db;
    color: #74b9ff;
    font-size: 1.1rem;
  }
`;
