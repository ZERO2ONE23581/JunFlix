import { Item } from './Item';
import { Fold } from './Fold';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { IPostList } from '../../../../types/post';
import { Grid } from '../../../../../styles/global';

export const PostList = ({ size, from, posts, isBlur }: IPostList) => {
  const [length, setLength] = useState(from);
  useEffect(() => {
    if (isBlur) setLength(from);
  }, [isBlur, setLength, from]);

  return (
    <>
      <Cont className="post-list" size={size}>
        {posts?.slice(0, length).map((post) => (
          <Item post={post} key={post.id} />
        ))}
        {!isBlur && (
          <Fold
            from={from}
            length={length}
            setLength={setLength}
            postLength={posts?.length}
          />
        )}
      </Cont>
    </>
  );
};
const Cont = styled(Grid)``;
