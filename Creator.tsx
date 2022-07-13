import styled from '@emotion/styled';
import { ProfileAvatar } from './src/components/Avatar/ProfileAvatar';

interface IAuthorProps {
  size?: string;
  avatar: string;
  username?: string;
}
export const Creator = ({ avatar, username, size }: IAuthorProps) => {
  return (
    <Cont>
      <ProfileAvatar avatar={avatar} size={size} />
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
