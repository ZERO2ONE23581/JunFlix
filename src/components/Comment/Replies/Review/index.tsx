import useSWR from 'swr';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { IGetReplies, IRepliesProps } from '../../../../types/comments';
import { ReviewCommentInfo } from '../../Info/Review';

export const ReviewReplies = ({ parentId }: IRepliesProps) => {
  const router = useRouter();
  const { user_id, review_id } = router.query;
  const query_id = user_id && review_id && parentId;
  const { data } = useSWR<IGetReplies>(
    query_id &&
      `/api/user/${user_id}/review/${review_id}/comment/${parentId}/replies`
  );
  const replies = data?.replies;
  //
  return (
    <Cont>
      {replies?.map((reply) => (
        <ReviewCommentInfo key={reply.id} commentId={reply.id} />
      ))}
    </Cont>
  );
};
const Cont = styled.article``;
