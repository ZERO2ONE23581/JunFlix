import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { Btn } from '../../../Tools/Button';
import { Avatar } from '../../../Tools/Avatar';
import useFollow from '../../../libs/client/useFollow';
import { Flex, FlexCol } from '../../../../styles/global';

interface IHost {
  theme: boolean;
  isMyPost: boolean;
  host: {
    avatar: string;
    userId: string;
    host_id: number;
    followers: number;
  };
}
export const Host = ({ theme, isMyPost, host }: IHost) => {
  const userId = host?.userId!;
  const avatar = host?.avatar!;
  const host_id = host?.host_id!;
  const followers = host?.followers!;
  const { onClick, name, isFollowing } = useFollow(host_id, 'user');
  //
  return (
    <Cont className="host">
      <Flex className="flex">
        <Avatar
          size="4rem"
          theme={theme}
          isRound={true}
          data={{
            avatar,
            host_id,
            preview: null,
          }}
        />
        <FlexCol className="host-info">
          {userId && <span>@{userId}</span>}
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
