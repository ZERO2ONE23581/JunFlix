import styled from '@emotion/styled';
import { Author } from '../../../../Author';
import { PostModel } from '../../../types/post';
import { ProfileAvatar } from '../../Avatar/ProfileAvatar';
import { Text } from './Text';

interface IMain {
  post: PostModel;
}
export const MainContent = ({ post }: IMain) => {
  return (
    <>
      <Cont>
        <Flex>
          <Author AVATAR={post?.user?.avatar!} />
          <Text CONTENT={post?.content!} NAME={post?.user?.username!} />
        </Flex>
      </Cont>
    </>
  );
};
const Cont = styled.article`
  padding: 20px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Flex = styled.div`
  gap: 20px;
  display: flex;
  /* align-items: center; */
`;
