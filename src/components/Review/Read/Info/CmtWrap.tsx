import styled from '@emotion/styled';
import { Icons } from '../../../Comment/Review/Read/Icons';
import { CreateComment } from '../../../Comment/Review/Create/Comment';
import { CommentList } from '../../../Comment/Review/Read/List';
import { IInfo } from '.';

export const CmtWrap = ({ review }: IInfo) => {
  return (
    <Cont>
      <Icons review={review!} />
      <CreateComment review={review!} />
      <CommentList review={review!} />
    </Cont>
  );
};
const Cont = styled.article``;
