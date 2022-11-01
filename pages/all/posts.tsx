import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Svg } from '../../src/Tools/Svg';
import { Flex, Page } from '../../styles/global';
import { useUser } from '../../src/libs/client/useUser';
import { PostSchema } from '../../src/components/Post/Read/Schema';
import { useGetAllPosts } from '../../src/libs/client/usePosts';

const AllPosts: NextPage<{ theme: boolean }> = ({ theme }) => {
  const { isLoggedIn } = useUser();
  const { posts } = useGetAllPosts();
  const [create, setCreate] = useState(false);
  return (
    <PostPage>
      {isLoggedIn && (
        <Flex className="layer">
          <Svg
            type="plus"
            theme={theme}
            item={{ size: '2.4rem' }}
            onClick={() => setCreate(true)}
          />
        </Flex>
      )}
      <PostSchema _data={{ theme, posts, create, setCreate, max_grid: 6 }} />
    </PostPage>
  );
};
export default AllPosts;

export const PostPage = styled(Page)`
  .layer {
    //border: 2px solid blue;
    padding: 0.8rem 7rem;
    justify-content: flex-end;
  }
  padding: 0 2rem;
  /* > .layer {
    padding: 1.5rem;
    //border: 1px solid yellow;
    > div {
      :nth-of-type(3) {
        //border: 1px solid blue;
        padding-right: 3rem;
      }
      h1 {
        //border: 1px solid yellow;
        font-weight: 400;
        font-size: 1.7rem;
        text-align: center;
        .user {
          cursor: pointer;
        }
      }
    }
  } */
  .my-posts-grid {
    .posts-column {
      .grid-box {
        img {
        }
      }
    }
  }
`;
