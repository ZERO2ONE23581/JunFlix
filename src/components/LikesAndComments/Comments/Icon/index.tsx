import styled from '@emotion/styled';
import { Post, User } from '@prisma/client';
import { Icons } from '../../../../../styles/svg';

interface IGetPost {
  ok: boolean;
  error?: string;
  isLiked?: boolean;
  post: PostWithUser;
}
interface PostWithUser extends Post {
  user: User;
  _count: {
    likes: number;
  };
}

export const CommentIcon = ({ isComments, commentsCount }: any) => {
  return (
    <>
      <Cont>
        <Icon>
          {isComments ? (
            <Icons name="comments" type="solid" />
          ) : (
            <Icons name="comments" type="empty" />
          )}
        </Icon>
        <Counts>
          <span>{commentsCount ? commentsCount : '0'}</span>
          <span>Comments</span>
        </Counts>
      </Cont>
    </>
  );
};
const Cont = styled.article`
  gap: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const Icon = styled.div`
  svg {
    width: 30px;
    height: 30px;
  }
`;
const Counts = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  span {
    text-align: center;
    font-size: 1.1rem;
    font-weight: 600;
  }
`;
