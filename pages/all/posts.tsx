import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { PostSchema } from '../../src/components/Post/Read/Schema';
import { useGetAllPosts } from '../../src/libs/client/usePosts';
import { Page } from '../../styles/global';

const AllPosts: NextPage<{ theme: boolean }> = ({ theme }) => {
  const { posts } = useGetAllPosts();
  const [create, setCreate] = useState(false);
  return (
    <PostPage>
      <PostSchema _data={{ theme, posts, create, setCreate, max_grid: 6 }} />
    </PostPage>
  );
};
export default AllPosts;

export const PostPage = styled(Page)`
  padding: 0 2rem;
  padding-top: 4rem;
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
