import styled from '@emotion/styled';
import { ProfileAvatar } from './src/components/Avatar/ProfileAvatar';

interface ICreator {
  size?: string;
  userAvatar: string;
  username?: string;
}
export const Creator = ({ userAvatar, username, size }: ICreator) => {
  return (
    <Cont>
      <ProfileAvatar avatar={userAvatar} size={size} />
      {username && <span>@{username}</span>}
    </Cont>
  );
};
const Cont = styled.div`
  gap: 10px;
  display: flex;
  font-size: 1rem;
  align-items: center;
  font-style: italic;
`;
