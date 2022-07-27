import styled from '@emotion/styled';
import { ReviewWithUser } from '../../../../types/review';
import { Fixed } from '../Fixed';
import { Avatar } from '../../../Avatar';
import { Top } from './Detail/Top';
import { CreateComment } from '../../Comment/Create/Comment';
import { CommentList } from '../../Comment/Read/List';
import { Icons } from '../../Comment/Read/Icons';

export interface IInfo {
  review: ReviewWithUser;
}
export const Info = ({ review }: IInfo) => {
  return (
    <Cont>
      <Fixed />
      <Top review={review!} />
      {review?.avatar && (
        <Avatar id="avatar" avatar={review?.avatar!} disabled />
      )}
      <Wrap>
        <Content>{review?.content}</Content>
        <Wrap>
          <Icons review={review!} />
          <CreateComment review={review!} />
          <CommentList review={review!} />
        </Wrap>
      </Wrap>
    </Cont>
  );
};

const Cont = styled.article`
  margin: 0 10%;
  padding: 0 12%;
  min-width: 1200px;
  min-height: 100vh;
  position: relative;
  .avatar {
    margin: 10% 0 5%;
    pointer-events: none;
    .isImageTag {
      width: 100vw;
      min-width: 1500px;
      min-height: 500px;
      max-height: 600px;
    }
  }
`;
const Wrap = styled.article`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Content = styled.p`
  margin: 20px auto;
  min-width: 750px;
  font-weight: 300;
  font-size: 1.6rem;
  line-height: 30px;
  word-break: break-word;
`;
