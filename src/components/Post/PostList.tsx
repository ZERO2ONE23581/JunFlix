import useSWR from 'swr';
import Link from 'next/link';
import styled from '@emotion/styled';
import useAvatar from '../../libs/client/useAvatar';
import { IGetAllPosts, IPostListProps } from '../../types/post';
import { ThumNail } from '../../../styles/image';

export const PostList = ({ isAllPosts, isMyPosts }: IPostListProps) => {
  const { data } = useSWR<IGetAllPosts>(
    isAllPosts ? `/api/all/posts` : isMyPosts ? `/api/my/posts` : null
  );
  const posts = data?.posts;
  //
  return (
    <Grid>
      {posts?.map((info) => (
        <Link
          key={info.id}
          href={`/user/${info.UserID}/board/${info.BoardID}/post/${info.id}`}
        >
          <a>
            <Item>
              <ThumNail>
                {info.avatar ? (
                  <img src={`${useAvatar(info.avatar)}`} alt="썸네일 이미지" />
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
