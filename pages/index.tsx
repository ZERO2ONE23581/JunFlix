import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../styles/global';
import { Movie } from '../src/components/Movie';
import { IGetBoards } from '../src/types/board';
import { HeadTitle } from '../src/components/Layout/Head';
import { PageTitle } from '../src/components/Movie/Title';
import { BoardList } from '../src/components/Board/Read/List';
import { Texts } from '../src/components/Home/Texts';
import { BtnWrap } from '../src/components/Home/BtnWrap';
import { PostList } from '../src/components/Post/Read/List';
import { IGetAllPosts } from '../src/types/post';

const Home: NextPage = () => {
  const { data } = useSWR<IGetBoards>(`/api/user/all/boards`);
  const { data: postData } = useSWR<IGetAllPosts>(`/api/user/all/posts`);
  return (
    <>
      <HeadTitle title="HOME" />
      <Main>
        <Texts />
        <BtnWrap />
        <Movie type="trending" />
      </Main>
      <Item>
        <PageTitle type="all-boards" />
        <BoardList size={4} boards={data?.boards!} />
        <PageTitle type="all-posts" />
        <PostList from={10} size={5} posts={postData?.posts!} />
      </Item>
    </>
  );
};
export default Home;

const Main = styled(Page)`
  padding-top: 200px;
  padding-bottom: 50px;
  color: #ecf0f1;
  background: url('/img/1.jpeg') center / cover no-repeat;
`;
const Item = styled(Page)`
  padding-top: 20px;
  padding-bottom: 100px;
  .all-posts {
    margin-top: 100px;
  }
  .board-list {
    .board {
      min-height: 250px;
      .board-title {
        font-size: 1.6rem;
      }
      .isOwner {
        top: 0px;
        right: -20px;
        position: absolute;
        fill: ${(p) => p.theme.color.logo};
      }
    }
  }
  .post-list {
    .post {
      min-height: 200px;
    }
  }
`;
