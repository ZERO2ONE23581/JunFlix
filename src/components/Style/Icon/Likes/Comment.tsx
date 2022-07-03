import useSWR from 'swr';
import styled from '@emotion/styled';
import { ILikesBtn } from './LikesBtn';
import { CommentSvg } from './CommentSvg';
import { Post, Review } from '@prisma/client';
import { Svg } from '../../Svg/Svg';
import { Dispatch, SetStateAction } from 'react';

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
  setCreateCmt: Dispatch<SetStateAction<boolean>>;
}
export const Comment = ({
  USERID,
  BOARDID,
  POSTID,
  REVIEWID,
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
  const CommentsCount = () => {
    if (Boolean(BOARDID && POSTID)) {
      return data?.post?._count.comments;
    }
    if (Boolean(REVIEWID)) {
      return data?.review?._count.comments;
    }
  };
  return (
    <>
      <Cont onClick={() => setCreateCmt((p) => !p)}>
        {CommentsCount() === 0 ? (
          <Svg type="unsolid-comment" />
        ) : (
          <Svg type="solid-comment" />
        )}
        <Counts>{CommentsCount() ? CommentsCount() : null}</Counts>
      </Cont>
    </>
  );
};
const Cont = styled.div`
  position: relative;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: inherit;
`;

const Counts = styled.article`
  top: -8px;
  right: -4px;
  position: absolute;
  font-weight: 500;
  font-size: 1.1em;
  color: ${(p) => p.theme.color.font}; ;
`;
