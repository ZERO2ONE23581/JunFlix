import useSWR from 'swr';
import { Btn } from '../Btn';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Board, Post, User } from '@prisma/client';
import { HomeArticle, PageCont } from '../../../styles/components/default';

interface IGetAllPosts {
  ok: boolean;
  allPosts?: IPost[];
}
interface IPost extends Post {}

export const AllPosts = ({ userId, boardId }: any) => {
  const router = useRouter();
  const { data } = useSWR<IGetAllPosts>(`/api/board/${boardId}/post/all_posts`);
  //
  return (
    <PageCont>
      {data?.ok && data.allPosts && (
        <ItemCont>
          {data.allPosts.map((post) => (
            <Link
              key={post.id}
              href={`/user/${post.UserID}/board/${post.BoardID}/post/${post.id}`}
            >
              <a>
                <Item>
                  <ThumNail>
                    <img src="/img/post_thum.svg" alt="썸네일 이미지" />
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
const ItemCont = styled.article`
  margin-top: 15px;
  gap: 15px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
