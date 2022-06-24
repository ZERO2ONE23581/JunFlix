import styled from '@emotion/styled';
import { ProfileAvatar } from '../../Avatar/Profile';

export const Profile = ({ board }: any) => {
  return (
    <Cont>
      <ProfileAvatar url={board?.user.avatar} size={120} />
      <span>@ {board?.user.username}</span>
    </Cont>
  );
};
const Cont = styled.article`
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
