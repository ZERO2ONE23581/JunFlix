import { Profile } from './Profile';
import styled from '@emotion/styled';
import { PostText } from '../../../../../Post/Read/Each/Info/Text';

interface IContent {
  date: {
    createdAt: Date;
    updatedAt: Date;
  };
  content: string;
  username: string;
  userAvatar: string;
}
export const Content = ({ date, content, username, userAvatar }: IContent) => {
  return (
    <Cont>
      <Profile userAvatar={userAvatar} size="4rem" isInReply={false} />
      <PostText
        sliceFrom={800}
        content={content}
        username={username}
        date={{
          createdAt: date.createdAt!,
          updatedAt: date.updatedAt!,
        }}
      />
    </Cont>
  );
};
const Cont = styled.div`
  padding: 20px;
  min-height: 70%;
  gap: 20px;
  display: flex;
  align-items: flex-start;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border-bottom: ${(p) => p.theme.border.thin};
`;
