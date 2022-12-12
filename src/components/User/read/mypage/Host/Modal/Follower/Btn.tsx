import styled from '@emotion/styled';
import { Btn } from '../../../../../../../Tools/Button';
import useFollowUser from '../../../../../../../libs/client/useFollowing/User';

interface IFollowerModal {
  theme: boolean;
  user_id: number;
}

export const FollowBtn = ({ user_id, theme }: IFollowerModal) => {
  const { onClick, name, isFollowing, follower } = useFollowUser(user_id);
  return (
    <Cont>
      <Btn
        type="button"
        onClick={onClick}
        item={{ theme, name, isFollowing }}
      />
    </Cont>
  );
};
const Cont = styled.div`
  button {
    font-size: 1.1rem;
  }
`;
