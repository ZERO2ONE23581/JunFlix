import { Item } from './Item';
import { Fold } from './Fold';
import { useState } from 'react';
import styled from '@emotion/styled';
import { IPostList } from '../../../../types/post';
import { Grid } from '../../../../../styles/global';

export const PostList = ({ size, from, posts }: IPostList) => {
  const max = from;
  const isPost = Boolean(posts?.length > 0);
  const [length, setLength] = useState(max);
  return (
    <>
      {isPost && (
        <>
          <Cont className="post-list" size={size}>
            {posts?.slice(0, length).map((post) => (
              <Item post={post} key={post.id} />
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
