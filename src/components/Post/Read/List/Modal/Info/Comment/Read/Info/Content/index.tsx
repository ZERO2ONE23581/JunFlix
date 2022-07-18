import styled from '@emotion/styled';
import { PostText } from '../../../../Text';
import { Creator } from '../../../../../../../../../../../Creator';
import { AltSvg } from '../../../../../../../../../Style/Svg/Svg';

interface IContent {
  content: string;
  createdAt: Date;
  username: string;
  userAvatar: string;
  isInReply?: boolean;
  type: { isPost?: boolean; isComment?: boolean };
}
export const Content = ({
  type,
  content,
  username,
  createdAt,
  isInReply,
  userAvatar,
}: IContent) => {
  const classname = type?.isPost
    ? 'post-content'
    : type?.isComment
    ? 'comment-content'
    : '';
  const size = type?.isPost ? '3.5rem' : type?.isComment ? '2.5rem' : '';
  const slice = type?.isPost ? 700 : type?.isComment ? 100 : 0;
  return (
    <Cont className={classname}>
      {type?.isComment && isInReply && <AltSvg type="reply" size="1.5rem" />}
      <Creator userAvatar={userAvatar} size={size} />
      <PostText
        Content={content}
        CreatedAt={createdAt}
        Username={username}
        sliceFrom={slice}
      />
    </Cont>
  );
};
const Cont = styled.article`
  overflow-y: auto;
  gap: 20px;
  display: flex;
  align-items: flex-start;
  font-size: 1.1rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;
