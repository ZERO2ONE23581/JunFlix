import Link from 'next/link';
import styled from '@emotion/styled';
import useAvatar from '../../libs/client/useAvatar';
import { H1 } from '../../../styles/default';
import { IPostListProps } from '../../types/post';
import { ItemCont } from '../Board/BoardList';
import { ThumNail } from '../../../styles/image';

export const PostList = ({ posts, allPosts, myPosts }: IPostListProps) => {
  return (
    <>
      {allPosts && <H1>ALL POSTS</H1>}
      {myPosts && <H1>MY POSTS</H1>}
      {posts && (
        <ItemCont>
          {posts.map((info) => (
            <Link
              key={info.id}
              href={`/user/${info.UserID}/board/${info.BoardID}/post/${info.id}`}
            >
              <a>
                <Item>
                  <ThumNail>
                    {info.avatar ? (
                      <img
                        src={`${useAvatar(info.avatar)}`}
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
    </>
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
