import useSWR from 'swr';
import styled from '@emotion/styled';
import { Avatar } from '../../Avatar';
import { PostContent } from './PostContent';
import { Setting } from '../Create/Setting';
import { IGetPost } from '../../../types/post';
import { Dispatch, SetStateAction } from 'react';
import { PostIconsWrap } from '../../PostIconsWrap';
import { PostCommentList } from '../../Comment/PostCommentList';
import { Modal, DimBackground } from '../../../../styles/global';
import { CreatePostComment } from '../../Comment/Create/Post/CreatePostComment';

interface IReadPost {
  USERID: number;
  BOARDID: number;
  POSTID: number;
  setReadPost: Dispatch<SetStateAction<boolean>>;
}
export const ReadPost = ({
  USERID,
  BOARDID,
  POSTID,
  setReadPost,
}: IReadPost) => {
  const { data } = useSWR<IGetPost>(
    `/api/user/${USERID}/board/${BOARDID}/post/${POSTID}`
  );
  const post = data?.post;
  return (
    <>
      <Cont>
        <Avatar
          disabled
          avatar={post?.avatar!}
          size={{ width: '45vw', height: '85vh' }}
        />
        <PostInfo>
          <Title>
            <h1>{post?.title.toUpperCase()}</h1>
            <Setting post={post!} setReadPost={setReadPost} />
          </Title>
          <Main>
            <Top>
              <PostContent post={post!} />
              <PostCommentList post={post!} />
            </Top>
            <Bottom>
              <PostIconsWrap post={post!} />
              <CreatePostComment post={post!} />
            </Bottom>
          </Main>
        </PostInfo>
      </Cont>
      <DimBackground zIndex={101} onClick={() => setReadPost(false)} />
    </>
  );
};
const Cont = styled(Modal)`
  padding: 0;
  width: 75vw;
  height: 85vh;
  min-width: 900px;
  min-height: 500px;
  overflow: hidden;
  z-index: 102;
  gap: 0;
  flex-direction: row;
  border: none;
  .thumnail-avatar {
    img {
      min-width: 500px;
      min-height: 500px;
    }
  }
`;
const PostInfo = styled.article`
  width: 30vw;
  min-width: 400px;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border.thick};
  background-color: ${(p) => p.theme.color.bg};
`;
const Title = styled.article`
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: ${(p) => p.theme.border.thin};
  h1 {
    font-weight: 400;
    font-size: 1.7rem;
    line-height: 1.2em;
  }
`;
const Main = styled.div`
  height: 79vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Top = styled.article`
  gap: 10px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
const Bottom = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: ${(p) => p.theme.border.thin};
`;
