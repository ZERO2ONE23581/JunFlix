import useSWR from 'swr';
import Link from 'next/link';
import styled from '@emotion/styled';
import useAvatar from '../../libs/client/useAvatar';
import { IGetAllPosts, IPostListProps } from '../../types/post';
import { ThumNail } from '../../../styles/image';
import { IGetLikes } from '../../types/likes';

export const PostList = ({
  isAllPosts,
  isMyPosts,
  findLikes,
}: IPostListProps) => {
  const { data } = useSWR<IGetAllPosts>(
    isAllPosts ? `/api/all/posts` : isMyPosts && `/api/my/posts`
  );
  const { data: LikeData } = useSWR<IGetLikes>(findLikes && `/api/my/likes`);
  const posts = data?.posts;
  const likes = LikeData?.postlikes;
  //
  return (
    <Grid>
      {posts?.map((post) => (
        <Link
          key={post.id}
          href={`/user/${post.UserID}/board/${post.BoardID}/post/${post.id}`}
        >
          <a>
            <Item>
              <ThumNail>
                {post.avatar ? (
                  <img src={`${useAvatar(post.avatar)}`} alt="썸네일 이미지" />
                ) : (
                  <img src="/img/post_thum.svg" alt="썸네일 이미지" />
                )}
              </ThumNail>
            </Item>
          </a>
        </Link>
      ))}
      {likes?.map((like) => (
        <Link
          key={like.id}
          href={`/user/${like.post.UserID}/board/${like.post.BoardID}/post/${like.post.id}`}
        >
          <a>
            <Item>
              <ThumNail>
                {like.post.avatar ? (
                  <img
                    src={`${useAvatar(like.post.avatar)}`}
                    alt="썸네일 이미지"
                  />
                ) : (
                  <img src="/img/post_thum.svg" alt="썸네일 이미지" />
                )}
              </ThumNail>
            </Item>
          </a>
        </Link>
      ))}
    </Grid>
  );
};
const Grid = styled.article`
  margin-top: 15px;
  gap: 15px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
const Item = styled.div`
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
  ul {
    width: 100%;
    padding: 10px 20px;
    li {
      border-bottom: 1px dotted ${(p) => p.theme.color.font};
      padding-bottom: 2px;
      margin-bottom: 4px;
      span {
        font-size: 1rem;
      }
    }
  }
`;
