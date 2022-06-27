import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../../Style/Svg/Svg';
import { Author } from '../../../../../Author';
import { IGetPost } from '../../../../types/post';
import { Dispatch, SetStateAction, useState } from 'react';
import { ModalClose, ModalSchema } from '../../../../../styles/global';
import { IconBtn } from '../../../Style/Button/IconBtn';
import useUser from '../../../../libs/client/useUser';
import { EditPost } from '../Edit/EditPost';
import { WithAvatar } from '../../Avatar/AvatarInput';
import { PostSetting } from '../Create/PostSetting';
import { DeletePost } from '../Delete/DeletePost';

interface ICreatePostModalProps {
  post_id: number;
  setReadPost: Dispatch<SetStateAction<boolean>>;
}
export const ReadPost = ({ post_id, setReadPost }: ICreatePostModalProps) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const { user_id, board_id } = router.query;
  const QueryId = user_id && board_id;
  const { data } = useSWR<IGetPost>(
    QueryId && `/api/user/${user_id}/board/${board_id}/post/${post_id}`
  );
  const post = data?.post;
  const isPostHost = Boolean(loggedInUser?.id === post?.UserID);
  const [editPost, setEditPost] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  return (
    <>
      <Cont>
        <Avatar avatar={post?.avatar!}>
          {!post?.avatar && <Svg type="no-image" />}
        </Avatar>
        <Info>
          <Title>
            <span className="title">{post?.title.toUpperCase()}</span>
            <div className="flex">
              {isPostHost && (
                <PostSetting
                  setEditPost={setEditPost}
                  setDeletePost={setDeletePost}
                />
              )}
              <IconBtn
                type="button"
                svgType="close-btn"
                onClick={() => setReadPost(false)}
              />
            </div>
          </Title>
          <Content>
            <Author post={post!} />
            <p>{post?.content && post.content}</p>
          </Content>
        </Info>
      </Cont>
      {editPost && <EditPost post_id={post?.id!} setEditPost={setEditPost} />}
      {deletePost && (
        <DeletePost post_id={post?.id!} closeModal={setDeletePost} />
      )}
      <ModalClose onClick={() => setReadPost(false)} />
    </>
  );
};
const Cont = styled(ModalSchema)`
  width: 80vw;
  height: 80vh;
  display: flex;
  overflow: hidden;
`;
const Avatar = styled(WithAvatar)`
  width: 55%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Info = styled.article`
  width: 45%;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border.bold};
  background-color: ${(p) => p.theme.color.bg};
`;
const Title = styled.h1`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${(p) => p.theme.border.bold};
  .title {
    font-size: 1.4em;
  }
  .flex {
    gap: 10px;
    display: flex;
    align-items: center;
    button {
      svg {
        width: 28px;
        height: 28px;
      }
    }
  }
`;
const Content = styled.article`
  padding: 20px;
  min-height: 60%;
  p {
    margin: 20px auto;
    min-height: 100px;
    padding: 25px 20px;
    border-radius: 8px;
    border: ${(p) => p.theme.border.bold};
    box-shadow: ${(p) => p.theme.boxShadow.nav};
  }
`;
