import useSWR from 'swr';
import styled from '@emotion/styled';
import { Avatar } from '../../Avatar';
import { PostContent } from './Content';
import { Setting } from '../Create/Setting';
import { IGetPost, IPost } from '../../../types/post';
import { Dispatch, SetStateAction } from 'react';
import { CommentList } from '../Comment/Read/CmtList';
import { PostLikesNCmts } from '../Comment/Read/LikesNCmts';
import { CreatePostComment } from '../Comment/Create/Comment';
import { Modal, DimBackground } from '../../../../styles/global';

interface IReadPost {
  USERID: number;
  POSTID: number;
  BOARDID: number;
  setReadPost: Dispatch<SetStateAction<boolean>>;
}
export const ReadPost = ({
  USERID,
  POSTID,
  BOARDID,
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
        <Info>
          <div className="wrap">
            <Title>
              <h1>{post?.title.toUpperCase()}</h1>
              <Setting post={post!} setReadPost={setReadPost} />
            </Title>
            <Top>
              <PostContent post={post!} />
              <CommentList post={post!} />
            </Top>
          </div>
          <Bottom>
            <PostLikesNCmts post={post!} />
            <CreatePostComment post={post!} />
          </Bottom>
        </Info>
      </Cont>
      <DimBackground zIndex={101} onClick={() => setReadPost(false)} />
    </>
  );
};
const Cont = styled(Modal)`
  padding: 0;
  width: 80vw;
  height: 85vh;
  min-width: 900px;
  min-height: 500px;
  overflow: hidden;
  z-index: 102;
  gap: 0;
  flex-direction: row;
  .thumnail-avatar {
    img {
      min-width: 500px;
      min-height: 500px;
    }
  }
`;
const Info = styled.article`
  width: 35vw;
  height: 85vh;
  display: flex;
  overflow: hidden;
  min-width: 400px;
  flex-direction: column;
  justify-content: space-between;
  .wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
const Title = styled.article`
  padding: 7px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(p) => p.theme.color.bg};
  background-color: ${(p) => p.theme.color.font};
  svg {
    fill: ${(p) => p.theme.color.bg};
  }
  h1 {
    font-weight: 400;
    font-size: 1.7rem;
    line-height: 1.2em;
  }
`;
const Top = styled.article`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
`;
const Bottom = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
