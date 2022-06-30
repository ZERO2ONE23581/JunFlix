import styled from '@emotion/styled';
import { ProfileAvatar } from './src/components/Avatar/Profile';

interface IAuthorProps {
  CREATOR_AVATAR: string;
  CREATOR_USERNAME: string;
}
export const Author = ({ CREATOR_AVATAR, CREATOR_USERNAME }: IAuthorProps) => {
  return (
    <Cont className="author">
      <ProfileAvatar url={CREATOR_AVATAR} size={'2em'} />
      <span className="data">@{CREATOR_USERNAME}</span>
    </Cont>
  );
};
const Cont = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-style: italic;
`;
