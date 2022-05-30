import useSWR from 'swr';
import Link from 'next/link';
import styled from '@emotion/styled';

import { IAllPostsProps, IGetAllPosts } from '../../types/post';
import { ItemCont } from './AllPosts';
import useAvatar from '../../libs/client/useAvatar';
import { PageCont } from '../../../styles/default';

export const AllPostsWithBoard = ({ userId, boardId }: IAllPostsProps) => {
  const { data: posts } = useSWR<IGetAllPosts>(
    `/api/user/${userId}/board/${boardId}/post/all_posts`
  );
  const postOk = posts?.ok;
  const postsWithBoard = posts?.allPosts;
  //
  return (
    <PageCont>
      {postOk && postsWithBoard && (
        <ItemCont>
          {postsWithBoard.map((post) => (
            <Link
              key={post.id}
              href={`/user/${post.UserID}/board/${post.BoardID}/post/${post.id}`}
            >
              <a>
                <Item>
                  <ThumNail>
                    {post.avatar ? (
                      <img
                        src={`${useAvatar(post.avatar)}`}
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
        </ItemCont>
      )}
    </PageCont>
  );
};

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
export const ThumNail = styled.article`
  .noimage {
    width: 50px;
    height: 50px;
  }
  img {
    width: 100%;
    height: 100%;
  }
  width: 100%;
  height: 200px;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  display: flex;
  justify-content: center;
  align-items: center;
`;
