import styled from '@emotion/styled';
import { Svg } from '../../../../../Tools/Svg';
import { Btn } from '../../../../../Tools/Button';
import { Avatar } from '../../../../../Tools/Avatar';
import useFollow from '../../../../../libs/client/useFollow';
import { Flex, FlexCol } from '../../../../../../styles/global';

interface IHost {
  _data: {
    theme: boolean;
    isMyPost: boolean;
    _host: {
      userId: string;
      host_id: number;
      followers: number;
      avatar: string | null;
    };
  };
}
export const Host = ({ _data }: IHost) => {
  const theme = _data?.theme!;
  const isMyPost = _data?.isMyPost!;
  const host = _data?._host!;
  const avatar = host?.avatar!;
  const userId = host?.userId!;
  const host_id = host?.host_id!;
  const followers = host?.followers!;
  //
  const { onClick, name, isFollowing } = useFollow(host_id, 'user');
  const _avatar = {
    theme,
    size: '4rem',
    isRound: true,
    preview: null,
    host_id,
    avatar,
  };
  //
  return (
    <Cont className="host">
      <Flex className="flex">
        <Avatar _data={{ ..._avatar }} />
        <FlexCol className="host-info">
          <span>@{userId}</span>
          <span>
            <span className="num">{followers}</span>
            <span>{followers > 1 ? 'followers' : 'follower'}</span>
          </span>
        </FlexCol>
      </Flex>
      <Icon className="icon">
        <Svg type="like" theme={theme} />
        <Svg type="comment" theme={theme} />
        {!isMyPost && (
          <Btn
            type="button"
            onClick={onClick}
            item={{ name, theme, isFollowing }}
          />
        )}
      </Icon>
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 10px;
  justify-content: space-between;
  .icon {
    width: fit-content;
    button {
      padding: 12px;
      border-radius: 40px;
      width: fit-content;
    }
  }
  .flex {
    gap: 10px;
    width: fit-content;
    align-items: center;
    .host-info {
      gap: 8px;
      font-size: 1.1rem;
      width: fit-content;
      .num {
        margin-right: 5px;
      }
    }
  }
`;
const Icon = styled(Flex)`
  gap: 30px;
  width: fit-content;
  justify-content: flex-start;
`;
