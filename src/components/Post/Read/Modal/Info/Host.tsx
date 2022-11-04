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
    board: {
      isBoard: boolean;
      onClick: () => void;
    };
    _host: {
      userId: string;
      host_id: number;
      followers: number;
    };
  };
}
export const Host = ({ _data }: IHost) => {
  const theme = _data?.theme!;
  const host = _data?._host!;
  const userId = host?.userId!;
  const host_id = host?.host_id!;
  const isMyPost = _data?.isMyPost!;
  const followers = host?.followers!;
  //
  const { onClick, name, isFollowing } = useFollow(host_id, 'user');
  const _avatar = { theme, size: '4rem', host_id, isRound: true };
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
        {_data?.board?.isBoard! && (
          <Svg type="compass" theme={theme} onClick={_data?.board?.onClick!} />
        )}
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
  gap: 1.2rem;
  width: fit-content;
  justify-content: flex-start;
  //border: 1px solid yellow;
`;
