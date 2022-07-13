import styled from '@emotion/styled';
import { Author } from '../../../../Creator';
import { IGetPost } from '../../../types/post';
import { PostText } from './Text';

export const PostContent = ({ post }: IGetPost) => {
  return (
    <Cont>
      <Author AVATAR={post?.user?.avatar!} />
      <PostText
        Content={post?.content!}
        CreatedAt={post?.createdAt}
        Username={post?.user?.username!}
      />
    </Cont>
  );
};
const Cont = styled.div`
  padding: 15px 20px;
  gap: 20px;
  display: flex;
  border-bottom: ${(p) => p.theme.border.thin};
  .TEXT {
    min-height: 150px;
  }
`;
