import styled from '@emotion/styled';
import { ProfileAvatar } from './src/components/Avatar/ProfileAvatar';

interface IAuthorProps {
  AVATAR: string;
  USERNAME?: string;
  SIZE?: string;
}
export const Author = ({ AVATAR, USERNAME, SIZE }: IAuthorProps) => {
  return (
    <Cont className="author">
      <ProfileAvatar avatar={AVATAR} size={SIZE} />
      {USERNAME && <span className="data">@{USERNAME}</span>}
    </Cont>
  );
};
const Cont = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 1.2rem;
  font-style: italic;
`;
