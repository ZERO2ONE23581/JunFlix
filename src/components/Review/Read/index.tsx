import useSWR from 'swr';
import { Info } from './Info';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { IGetReview } from '../../../types/review';
import { ThumnailAvatar } from '../../Avatar/Thumnail';
import { IconWraps } from '../Comment/Read/IconWraps';
import { CreateReviewComment } from '../Comment/Create/Comment';
import { ReadReviewCommentList } from '../Comment/Read/CmtList';

export const ReadReview = () => {
  const router = useRouter();
  const { user_id, review_id } = router.query;
  const { data } = useSWR<IGetReview>(
    user_id && review_id && `/api/user/${user_id}/review/${review_id}`
  );
  return (
    <>
      <Cont>
        <Info review={data?.review!} />
        <ThumnailAvatar url={data?.review?.avatar} />
        <Wrap>
          <Content>{data?.review?.content}</Content>
          <IconWraps review={data?.review!} />
          <CreateReviewComment review={data?.review!} />
          <ReadReviewCommentList review={data?.review!} />
        </Wrap>
      </Cont>
    </>
  );
};
const Cont = styled.article`
  position: relative;
  min-width: 1000px;
  .thumnail-avatar {
    z-index: 1;
    opacity: 0.9;
    height: 60vh;
  }
`;
const Content = styled.p`
  font-size: 1.6rem;
  font-weight: 300;
  line-height: 30px;
`;
const Wrap = styled.article`
  padding: 2% 20%;
  gap: 30px;
  display: flex;
  flex-direction: column;
  border: none;
  overflow-wrap: break-word;
  border: 2px solid red;
`;
