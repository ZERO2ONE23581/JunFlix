import useSWR from 'swr';
import styled from '@emotion/styled';
import { TitleWrap } from './TitleWrap';
import { useRouter } from 'next/router';
import { CommentWrap } from './List/Comment';
import { Icons } from '../Comment/Read/Icons';
import { IGetReview } from '../../../types/review';
import { ThumnailAvatar } from '../../Avatar/Thumnail';

export const ReadReview = () => {
  const router = useRouter();
  const { user_id, review_id } = router.query;
  const { data } = useSWR<IGetReview>(
    user_id && review_id && `/api/user/${user_id}/review/${review_id}`
  );
  return (
    <>
      {data && (
        <Cont>
          <TitleWrap review={data?.review!} />
          {data?.review?.avatar && (
            <ThumnailAvatar url={data?.review?.avatar} />
          )}
          <Content className="content-wrap">
            <p>{data?.review?.content}</p>
          </Content>
          <Icons review={data?.review!} />
          <CommentWrap review={data?.review!} />
        </Cont>
      )}
      {!data && <h1>No data found..</h1>}
    </>
  );
};
const Cont = styled.article`
  position: relative;
  .thumnail-avatar {
    z-index: 1;
    opacity: 0.8;
    height: 60vh;
    margin-top: 40px;
  }
  .title-wrap,
  .comment-wrap {
    padding: 0% 22%;
  }
  .content-wrap {
    padding: 5% 22%;
  }
  .icons-wrap {
    padding: 15px 24%;
  }
`;
const Content = styled.div`
  min-height: 55vh;
  p {
    min-width: 750px;
    font-weight: 300;
    font-size: 1.6rem;
    line-height: 30px;
  }
`;
const Wrap = styled.article`
  min-height: 50vh;
  gap: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: none;
  overflow-wrap: break-word;
  border: 1px solid blue;
`;
