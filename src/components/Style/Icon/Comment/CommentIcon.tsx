import useSWR from 'swr';
import { Svg } from '../../Svg/Svg';
import styled from '@emotion/styled';
import { ILikesBtn } from '../Likes/LikesBtn';
import { Post, Review } from '@prisma/client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IGetPostWithCounts {
  ok: boolean;
  error?: string;
  isLiked?: boolean;
  isComments?: boolean;
  post: CountsInPost;
  review: CountsInReview;
}
interface CountsInPost extends Post {
  _count: {
    likes: number;
    comments: number;
  };
}
interface CountsInReview extends Review {
  _count: {
    likes: number;
    comments: number;
  };
}
interface IComment extends ILikesBtn {
  createCmt?: boolean;
  setCreateCmt?: Dispatch<SetStateAction<boolean>>;
}
export const CommentIcon = ({
  USERID,
  BOARDID,
  POSTID,
  REVIEWID,
  createCmt,
  setCreateCmt,
}: IComment) => {
  const GetAPI = () => {
    if (Boolean(USERID)) {
      if (Boolean(BOARDID && POSTID)) {
        return `/api/user/${USERID}/board/${BOARDID}/post/${POSTID}`;
      }
      if (Boolean(REVIEWID)) {
        return `/api/user/${USERID}/review/${REVIEWID}`;
      }
    }
  };
  const { data } = useSWR<IGetPostWithCounts>(GetAPI());
  const [counts, setCounts] = useState(0);

  useEffect(() => {
    if (Boolean(BOARDID && POSTID)) {
      return setCounts(data?.post?._count?.comments!);
    }
    if (Boolean(REVIEWID)) {
      return setCounts(data?.review?._count?.comments!);
    }
  }, [data, setCounts, BOARDID, POSTID, REVIEWID]);
  return (
    <>
      <Cont createCmt={createCmt!}>
        {Boolean(counts > 0) && <Svg type="solid-comment" />}
        {!Boolean(counts > 0) && <Svg type="unsolid-comment" />}
        <span className="counts"> {counts > 0 ? counts : null}</span>
      </Cont>
    </>
  );
};
const Cont = styled.div<{ createCmt: boolean }>`
  position: relative;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: inherit;
  svg {
    fill: ${(p) => p.createCmt && p.theme.color.logo};
  }
`;
