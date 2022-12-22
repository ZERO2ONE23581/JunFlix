import styled from '@emotion/styled';
import { Btn } from '../../../../../../Tools/Button';
import { Avatar } from '../../../../../../Tools/Avatar';
import { IPostType } from '../../../../../../types/post';
import { useUser } from '../../../../../../libs/client/useUser';
import { Flex, FlexCol } from '../../../../../../../styles/global';
import useFollowUser from '../../../../../../libs/client/useFollow/user';

interface IHost {
  theme: boolean;
  post: IPostType;
}
export const Host = ({ theme, post }: IHost) => {
  const { host_id, host } = post;
  const { userId, _count } = host;
  const { followers } = _count;
  const { user_id } = useUser();
  const isMyPost = Boolean(user_id === host_id);
  const { onClick, name, isFollowing } = useFollowUser(host_id);
  return (
    <Cont className="host">
      <Wrap>
        <Avatar _data={{ theme, host_id, size: '3.5rem', isRound: true }} />
        <Info>
          <span>@{userId}</span>
          <span>
            <span className="num">{followers}</span>
            <span>{followers > 1 ? 'followers' : 'follower'}</span>
          </span>
        </Info>
      </Wrap>
      {!isMyPost && (
        <Btn
          type="button"
          onClick={onClick}
          item={{ name, theme, isFollowing }}
        />
      )}
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 10px;
  padding: 0 0.5rem;
  justify-content: space-between;
  button {
    width: fit-content;
  }
`;
const Wrap = styled(Flex)`
  gap: 10px;
  width: fit-content;
`;
const Info = styled(FlexCol)`
  gap: 8px;
  font-size: 1.1rem;
  width: fit-content;
  .num {
    margin-right: 5px;
  }
`;
