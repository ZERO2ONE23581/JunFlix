import useSWR from 'swr';
import Link from 'next/link';
import styled from '@emotion/styled';
import { PageCont } from '../../../styles/components/default';
import { IAllPostsProps, IGetAllPosts } from '../../types/post';
import { Board, Post, User } from '@prisma/client';

interface IGetAllPosts {
  ok: boolean;
  error?: string;
  allPosts?: IPostWithUserNBoard[];
}
interface IPostWithUserNBoard extends Post {
  user: User;
  board: Board;
}

export const AllPosts = () => {
  const { data: posts } = useSWR<IGetAllPosts>(`/api/post/all_posts`);
  const postOk = posts?.ok;
  const allPosts = posts?.allPosts;
  //
  return (
    <PageCont>
      {postOk && allPosts && (
        <ItemCont>
          {allPosts.map((post) => (
            <Link
              key={post.id}
              href={`/user/${post.UserID}/board/${post.BoardID}/post/${post.id}`}
            >
              <a>
                <Item>
                  <ThumNail>
                    <img src="/img/post_thum.svg" alt="썸네일 이미지" />
                  </ThumNail>
                  <ul>
                    <li>
                      <span>{post.title}</span>
                    </li>
                    <li>
                      <span>{post.content}</span>
                    </li>
                  </ul>
                </Item>
              </a>
            </Link>
          ))}
        </ItemCont>
      )}
    </PageCont>
  );
};
export const ItemCont = styled.article`
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
const ThumNail = styled.div`
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border-radius: 5px;
  width: 100%;
  padding: 5px 0;
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
`;
