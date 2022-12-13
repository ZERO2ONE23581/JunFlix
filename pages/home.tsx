import { IPage } from './_app';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../styles/global';
import { Head_ } from '../src/Tools/head_title';
import { PostSchema } from '../src/components/Post/Schema';
import { useGetAllPosts } from '../src/libs/client/usePosts';

const Home: NextPage<IPage> = ({ theme, setFixed }) => {
  const { posts } = useGetAllPosts();
  return (
    <>
      <Head_ title="HOME" />
      <Cont>
        <PostSchema _data={{ theme, posts, grid: 6 }} setFixed={setFixed} />
      </Cont>
    </>
  );
};
export default Home;

const Cont = styled(Page)`
  padding: 0rem 10rem;
  .posts_schema {
    margin-top: 1.4rem;
    //border: 5px solid cornflowerblue;
  }
`;
