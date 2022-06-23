import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../Style/Svg/Svg';
import { Author } from '../../../../Author';
import { Background } from '../Avatar/Avatar';
import { IGetPost } from '../../../types/post';
import { Dispatch, SetStateAction } from 'react';
import { ModalSchema } from '../../../../styles/global';

interface ICreatePostModalProps {
  post_id: number;
  setReadPost: Dispatch<SetStateAction<boolean>>;
}
export const ReadPost = ({ setReadPost, post_id }: ICreatePostModalProps) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const { data } = useSWR<IGetPost>(
    user_id &&
      board_id &&
      `/api/user/${user_id}/board/${board_id}/post/${post_id}`
  );
  const post = data?.post;
  return (
    <Cont>
      <PostAvatar avatar={post?.avatar!} isAvatar={Boolean(post?.avatar)}>
        {!post?.avatar && <Svg type="no-image" />}
      </PostAvatar>
      <Info>
        <Title>
          <span>{post?.title.toUpperCase()}</span>
          <button onClick={() => setReadPost(false)}>
            <Svg type="close-btn" />
          </button>
        </Title>
        <Content>
          <Author post={post!} />
          <div className="post-content">
            {post?.content && <p>"{post.content}"</p>}
          </div>
        </Content>
      </Info>
    </Cont>
  );
};
const Cont = styled(ModalSchema)`
  width: 80vw;
  height: 80vh;
  display: flex;
  overflow: hidden;
`;
const PostAvatar = styled(Background)<{ isAvatar: boolean }>`
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
  font-size: 1.6em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${(p) => p.theme.border.bold};
  button {
    border: none;
    outline: none;
    background: none;
    svg {
      fill: ${(p) => p.theme.color.font};
    }
  }
`;
const Content = styled.article`
  padding: 20px;
  min-height: 60%;
  .post-content {
    margin: 20px auto;
    min-height: 100px;
    padding: 25px 20px;
    border-radius: 8px;
    border: ${(p) => p.theme.border.bold};
    box-shadow: ${(p) => p.theme.boxShadow.nav};
  }
`;
