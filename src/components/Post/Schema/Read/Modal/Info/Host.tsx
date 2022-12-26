import styled from '@emotion/styled';
import { Btn } from '../../../../../../Tools/Button';
import { Avatar } from '../../../../../../Tools/Avatar';
import { IPostType } from '../../../../../../types/post';
import { useUser } from '../../../../../../libs/client/useUser';
import { Flex, FlexCol, Flex_ } from '../../../../../../../styles/global';
import useFollowUser from '../../../../../../libs/client/useFollow/user';

interface IHost {
  _data: {
    theme: boolean;
    isDesk: boolean;
    post: IPostType;
  };
}
export const Host = ({ _data }: IHost) => {
  const { theme, isDesk, post } = _data;
  const { user_id } = useUser();
  const { host_id, host } = post;
  const { userId, _count } = host;
  const { followers } = _count;
  const isMyPost = Boolean(user_id === host_id);
  const { onClick, name, isFollowing } = useFollowUser(host_id);
  const size = isDesk ? '3.5rem' : '8rem';
  return (
    <Cont isDesk={isDesk}>
      <Wrap>
        <Avatar _data={{ theme, host_id, size, isRound: true }} />
        <Info>
          <span className="userId">@{userId.toUpperCase()}</span>
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
const Cont = styled(Flex_)`
  gap: 1rem;
  padding: 0 0.5rem;
  justify-content: space-between;
  font-size: ${(p) => (p.isDesk ? '1.1rem' : '2.4rem')};
  .userId {
    color: ${(p) => p.theme.color.lightBlue};
    font-size: ${(p) => (p.isDesk ? '1.4rem' : '2.2rem')};
  }
  button {
    padding: 1rem;
    width: fit-content;
    border-radius: 40px;
    min-width: ${(p) => (p.isDesk ? '100px' : '200px')};
    font-size: ${(p) => (p.isDesk ? '1.4rem' : '2.2rem')};
  }
`;
const Wrap = styled(Flex)`
  gap: 1rem;
  width: fit-content;
`;
const Info = styled(FlexCol)`
  gap: 8px;
  width: fit-content;
  .num {
    margin-right: 5px;
  }
`;
