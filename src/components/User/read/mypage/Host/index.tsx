import { Btns } from './Btns';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Avatar } from '../../../../../Tools/Avatar/indexxx';
import { IUserType } from '../../../../../types/user';
import { Flex, FlexCol } from '../../../../../../styles/global';
import { useCapLetter } from '../../../../../libs/client/useTools';
import { FollowInfo } from './Follow';

interface IUserBox {
  _data: {
    theme: boolean;
    host: IUserType;
    isMyAcct: boolean;
  };
}
export const Host = ({ _data }: IUserBox) => {
  const { theme, host, isMyAcct } = _data;
  const host_id = host?.id;
  const router = useRouter();
  const onEdit = () =>
    router.push(`/user/${host.id}/${host.username}/edit_profile`);

  const _avatar = {
    theme,
    size: '7.5rem',
    host_id: host?.id,
    avatar: host?.avatar,
    handleClick: { isClick: true, onClick: onEdit },
  };
  const _follow = {
    followers: host?._count.followers,
    followings: host?._count.followings,
  };
  return (
    <>
      {host && (
        <Cont className="host">
          <Avatar _data={{ ..._avatar }} />
          <Info>
            <span className="name">{useCapLetter(host.username!)}</span>
            <span className="small">@{host.userId}</span>
            <FollowInfo _data={{ ..._follow }} />
          </Info>
          <Btns _data={{ theme, onEdit, isMyAcct, host_id }} />
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
