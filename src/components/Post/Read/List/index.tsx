import { Post } from './Post';
import { Fold } from './Fold';
import { useState } from 'react';
import styled from '@emotion/styled';
import { IPostList } from '../../../../types/post';
import { Grid } from '../../../../../styles/global';

export const PostList = ({ size, posts, isMyPage }: IPostList) => {
  const max = 8;
  const isPost = Boolean(posts?.length > 0);
  const [length, setLength] = useState(max);
  return (
    <>
      {isPost && (
        <>
          <Cont className="post-list" size={size}>
            {posts?.slice(0, length).map((post) => (
              <Post post={post} />
            ))}
          </Cont>
          <Fold
            max={max}
            length={length}
            setLength={setLength}
            postLength={posts?.length}
          />
        </>
      )}

      {!isPost && (
        <>
          <h1>포스트가 존재하지 않습니다.</h1>
        </>
      )}
    </>
  );
};
const Cont = styled(Grid)``;
