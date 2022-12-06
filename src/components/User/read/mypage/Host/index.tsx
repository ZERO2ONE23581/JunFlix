import { Btns } from './Btns';
import styled from '@emotion/styled';
import { FollowInfo } from './Follow';
import { useRouter } from 'next/router';
import { Avatar } from '../../../../../Tools/Avatar';
import { IUserType } from '../../../../../types/user';
import { FlexCol } from '../../../../../../styles/global';
import { useCapLetter } from '../../../../../libs/client/useTools';

interface IUserBox {
  _data: {
    theme: boolean;
    host: IUserType;
    isMyAcct: boolean;
  };
}
export const Host = ({ _data }: IUserBox) => {
  const router = useRouter();
  const { theme, host, isMyAcct } = _data;
  const host_id = host?.id!;
  const userId = host?.userId!;
  const username = host?.username!;
  const onSetting = () => router.push(`/user/${host_id}/${userId}/setting`);
  const _follow = {
    followers: host?._count.followers,
    followings: host?._count.followings,
  };
  const Name = username ? username : userId;
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
            <FollowInfo _data={{ ..._follow }} />
          </Info>
          <Btns _data={{ theme, onSetting, isMyAcct, host_id }} />
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
