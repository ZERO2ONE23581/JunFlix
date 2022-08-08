import { Item } from './Item';
import { Fold } from './Fold';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { IPostList } from '../../../../types/post';
import { Grid } from '../../../../../styles/global';

export const PostList = ({ size, from, posts, isBlur }: IPostList) => {
  const max = from;
  const [length, setLength] = useState(max);
  useEffect(() => {
    if (isBlur) setLength(max);
  }, [isBlur, setLength, max]);

  return (
    <>
      <Cont className="post-list" size={size}>
        {posts?.slice(0, length).map((post) => (
          <Item post={post} key={post.id} />
        ))}
      </Cont>
      {!isBlur && (
        <Fold
          max={max}
          length={length}
          setLength={setLength}
          postLength={posts?.length}
        />
      )}
    </>
  );
};
const Cont = styled(Grid)`
  margin-top: 30px;
`;
