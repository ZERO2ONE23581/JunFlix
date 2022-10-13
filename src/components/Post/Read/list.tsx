import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Grid } from '../../../../styles/global';
import { NoData } from '../../../Tools/NoData';
import { IPostList } from '../../../types/post';
import { PostBox } from './box';
import { PostModal } from './each';
import { Fold } from './Fold';

export const PostList = ({
  size,
  from,
  isBlur,
  theme,
  postsArray,
  isLikesType,
}: any) => {
  const [length, setLength] = useState(from);
  const isPost = Boolean(postsArray?.length > 0);
  useEffect(() => {
    if (isBlur) setLength(from);
  }, [isBlur, setLength, from]);
  //
  const [modal, setModal] = useState(false);
  const [postID, setPostID] = useState(0);
  const clickBox = (id: number) => {
    setPostID(id);
    setModal(true);
  };
  const clickedPost = postsArray?.find((p: any) => p.id === postID);

  return (
    <>
      {isPost && (
        <Cont className="post-list" size={size}>
          {/* {postsArray?.slice(0, length).map((post: any) => (
            <PostBox key={post.id} clickBox={clickBox} data={post} />
          ))} */}
          {modal && <PostModal theme data={clickedPost!} setModal={setModal} />}

          {!isBlur && (
            <Fold
              from={from}
              length={length}
              setLength={setLength}
              postLength={postsArray?.length}
            />
          )}
        </Cont>
      )}
      {!isPost && (
        <NoData theme={theme} type={isLikesType ? 'likes-post' : 'post'} />
      )}
    </>
  );
};
const Cont = styled(Grid)`
  .post-edit-overlay {
    z-index: 102;
  }
`;
