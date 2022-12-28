import {
  useCapLetter,
  useResponsive,
} from '../../../../../libs/client/useTools';
import { Btns } from './Btns';
import styled from '@emotion/styled';
import { FollowInfo } from './Follow';
import { useRouter } from 'next/router';
import { Avatar } from '../../../../../Tools/Avatar';
import { IUserType } from '../../../../../types/user';
import { FlexCol_ } from '../../../../../../styles/global';
import { OnPrivateBtn } from '../../../../../Tools/Button/Private';
import useFollowUser from '../../../../../libs/client/useFollow/user';

interface IUserBox {
  _mode: {
    onPrivate: boolean;
    onClick: () => void;
  };
  _data: {
    theme: boolean;
    host: IUserType;
    isMyAcct: boolean;
  };
}
export const Host = ({ _data, _mode }: IUserBox) => {
  const router = useRouter();
  const { theme, host, isMyAcct } = _data;
  const { onClick: onMode, onPrivate } = _mode;
  const host_id = host?.id!;
  const userId = host?.userId!;
  const username = host?.username!;
  const Follower = host?.followers!;
  const Following = host?.followings!;
  const Name = username ? username : userId;
  const { onClick, name, isFollowing, follower } = useFollowUser(host_id);
  const onSetting = () => router.push(`/user/${host_id}/${userId}/setting`);
  const isOther = true;
  const { isDesk } = useResponsive();
  const size = isDesk ? '7.5rem' : '10rem';
  return (
    <>
      {host && (
        <Cont isDesk={isDesk}>
          <Avatar
            _data={{ size, theme, host_id, isOther, handleClick: onSetting }}
          />
          <Info isDesk={isDesk}>
            <span className="name">{useCapLetter(Name)}</span>
            <span className="small">@{userId.toUpperCase()}</span>
            {isMyAcct && (
              <OnPrivateBtn _data={{ isDesk, theme, onMode, onPrivate }} />
            )}
            <FollowInfo
              _data={{ isDesk, theme, Follower, Following, num: follower }}
            />
          </Info>
          <Btns
            _data={{
              name,
              isDesk,
              theme,
              onClick,
              isMyAcct,
              onSetting,
              isFollowing,
            }}
          />
        </Cont>
      )}
    </>
  );
};

const Cont = styled(FlexCol_)`
  gap: 20px;
  margin: 0 auto;
  width: fit-content;
  justify-content: center;
  .private_btn {
    width: ${(p) => (p.isDesk ? '4rem' : '8rem')};
    border-radius: ${(p) => (p.isDesk ? '20px' : '40px')};
    padding: ${(p) => (p.isDesk ? '0.4rem 0.6rem' : '0.8rem 1rem')};
    > .circle {
      width: ${(p) => (p.isDesk ? '0.7rem' : '1.2rem')};
      height: ${(p) => (p.isDesk ? '0.7rem' : '1.2rem')};
      padding: ${(p) => (p.isDesk ? '0.7rem' : '1.2rem')};
    }
  }
`;
const Info = styled(FlexCol_)`
  gap: 0.8rem;
  .name {
    opacity: 0.8;
    font-size: ${(p) => (p.isDesk ? '2rem' : '3rem')};
  }
  .small {
    opacity: 0.9;
    color: #3498db;
    font-size: ${(p) => (p.isDesk ? '1.1rem' : '2.2rem')};
  }
`;
