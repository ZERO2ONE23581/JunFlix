import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Page } from '../../../../../styles/global';
import { Title } from '../../../../../src/components/Layout/Title';
import { ReadReview } from '../../../../../src/components/Review/Read/ReadReview';
import { ReadComments } from '../../../../../src/components/Post/Read/ReadComments';
import { LikesBtn } from '../../../../../src/components/Style/Icon/Likes/LikesBtn';
import { Comment } from '../../../../../src/components/Style/Icon/Likes/Comment';
import { useState } from 'react';

const ReviewPage: NextPage = () => {
  const router = useRouter();
  const { user_id, review_id } = router.query;
  const [createCmt, setCreateCmt] = useState(false);
  return (
    <>
      <Title title="영화리뷰" />
      <Cont>
        <ReadReview />
        {/* <IconWrap
          POSTID={0}
          BOARDID={0}
          USERID={Number(user_id)}
          REVIEWID={Number(review_id)}
        /> */}
        <Flex>
          <LikesBtn
            POSTID={0}
            BOARDID={0}
            USERID={Number(user_id)}
            REVIEWID={Number(review_id)}
          />
          <Comment
            POSTID={0}
            BOARDID={0}
            USERID={Number(user_id)}
            REVIEWID={Number(review_id)}
            setCreateCmt={setCreateCmt}
          />
        </Flex>
        {createCmt && <ReadComments isReview isPost={false} />}
      </Cont>
    </>
  );
};
export default ReviewPage;

const Cont = styled(Page)`
  padding: 0;
`;
const Flex = styled.article`
  border: 2px solid red;
  padding: 0 20px;
  gap: 3rem;
  display: flex;
  align-items: center;
  padding: 2% 20%;
  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`;
