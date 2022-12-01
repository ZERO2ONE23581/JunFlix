import styled from '@emotion/styled';
import { Avatar } from '../../../../../Tools/Avatar/indexxx';
import { IPostType } from '../../../../../types/post';
import { Flex, FlexCol } from '../../../../../../styles/global';
import useFollow from '../../../../../libs/client/useFollow';
import { Btn } from '../../../../../Tools/Button';
import { useUser } from '../../../../../libs/client/useUser';

interface IHost {
  theme: boolean;
  post: IPostType;
}
export const Host = ({ theme, post }: IHost) => {
  const {
    host_id,
    host: {
      userId,
      _count: { followers },
    },
  } = post;
  const { user_id } = useUser();
  const isMyPost = Boolean(user_id === host_id);
  const { onClick: onFollow, name, isFollowing } = useFollow(host_id, 'user');
  return (
    <Cont className="host">
      <Flex className="flex">
        <Avatar
          _data={{
            theme,
            host_id,
            size: '3.5rem',
            isRound: true,
            onMyPage: true,
          }}
        />
        <FlexCol className="host-info">
          <span>@{userId}</span>
          <span>
            <span className="num">{followers}</span>
            <span>{followers > 1 ? 'followers' : 'follower'}</span>
          </span>
        </FlexCol>
      </Flex>
      {!isMyPost && (
        <Btn
          type="button"
          onClick={onFollow}
          item={{ name, theme, isFollowing }}
        />
      )}
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 10px;
  justify-content: space-between;
  button {
    width: fit-content;
  }
  padding: 0 0.5rem;
  //border: 1px solid yellow;
  .icon {
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
