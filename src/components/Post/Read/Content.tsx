import { PostText } from './Text';
import styled from '@emotion/styled';
import { Creator } from '../../../../Creator';
import { IGetPost } from '../../../types/post';

export const PostContent = ({ post }: IGetPost) => {
  return (
    <Cont>
      <Creator avatar={post?.user?.avatar!} size="3rem" />
      <PostText
        Content={post?.content!}
        CreatedAt={post?.createdAt}
        Username={post?.user?.username!}
      />
    </Cont>
  );
};
const Cont = styled.div`
  min-height: 100px;
  padding: 15px 20px;
  gap: 20px;
  display: flex;
  align-items: flex-start;
  font-size: 1rem;
  border-bottom: ${(p) => p.theme.border.thin};
`;
