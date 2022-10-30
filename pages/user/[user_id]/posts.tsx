import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Page } from '../../../styles/global';
import { useGetUser } from '../../../src/libs/client/useUser';
import { CreatePost } from '../../../src/components/Post/Create';
import { UpdatePost } from '../../../src/components/Post/Update';
import { DeletePost } from '../../../src/components/Post/Delete';
import { useGetMyPosts } from '../../../src/libs/client/usePosts';
import { ReadPost } from '../../../src/components/Post/Read/Modal';
import { Title } from '../../../src/components/Post/Read/Grid/Title';
import { PostGrid } from '../../../src/components/Post/Read/Grid/PostGrid';

const MyPostsPage: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { user_id } = router.query;
  const [modal, setModal] = useState('');
  const [post_id, setPost_id] = useState(0);
  const [create, setCreate] = useState(false);
  const posts = useGetMyPosts(Number(user_id));
  const { user, isMyAcct } = useGetUser(Number(user_id));
  const post = posts?.find((item) => item.id === post_id)!;
  const clickBox = (post_id: number) => {
    setModal('read');
    setPost_id(post_id);
  };
  const onClick = () => router.push(`/user/${user_id}/my_page`);
  return (
    <Container>
      <Title
        _data={{
          theme,
          onClick,
          isMyAcct,
          setCreate,
          username: user?.username!,
        }}
      />
      <PostGrid posts={posts!} theme={theme} clickBox={clickBox} />
      <ReadPost _data={{ theme, post, modal, setModal }} />
      <UpdatePost theme={theme} post={post} modal={modal} setModal={setModal} />
      <DeletePost
        _data={{
          theme,
          modal,
          setModal,
          post_id: post?.id!,
          isMyPost: Boolean(isMyAcct && post?.host_id! === user?.id),
        }}
      />
      <CreatePost
        theme={theme}
        open={create}
        closeModal={() => setCreate(false)}
      />
    </Container>
  );
};
export default MyPostsPage;

const Container = styled(Page)`
  padding: 0 8rem;
  > .layer {
    padding: 2rem 0 3rem;
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
  }
  //border: 5px solid hotpink;
  .my-posts-grid {
    //border: 5px solid blueviolet;
    .posts-column {
      height: fit-content;
      //border: 3px solid cornflowerblue;
      .grid-box {
        max-width: 300px;
        height: fit-content;
        //border: 3px solid yellow;
        img {
          width: 100%;
          min-height: 240px;
          height: fit-content;
          //border: 3px solid blue;
        }
      }
    }
  }
`;
