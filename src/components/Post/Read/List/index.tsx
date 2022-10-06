import { PostBox } from './PostBox';
import { Fold } from './Fold';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { NoData } from '../../../../Tools/NoData';
import { IPostList } from '../../../../types/post';
import { Grid } from '../../../../../styles/global';
import { PostModal } from '../Each';

export const PostList = ({
  size,
  from,
  isBlur,
  postsArray,
  isLikesType,
}: IPostList) => {
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
  const clickedPost = postsArray?.find((p) => p.id === postID);

  return (
    <>
      {isPost && (
        <Cont className="post-list" size={size}>
          {postsArray?.slice(0, length).map((post) => (
            <PostBox key={post.id} clickBox={clickBox} data={post} />
          ))}
          {modal && <PostModal data={clickedPost!} setModal={setModal} />}

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
      {!isPost && <NoData type={isLikesType ? 'likes-post' : 'post'} />}
    </>
  );
};
const Cont = styled(Grid)`
  .post-edit-overlay {
    z-index: 102;
  }
`;
