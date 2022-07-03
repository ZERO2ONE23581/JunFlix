import useSWR from 'swr';
import { Svg } from '../../Svg/Svg';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Post, Review } from '@prisma/client';
import useMutation from '../../../../libs/client/useMutation';
import { IconBtn } from '../../Button/IconBtn';
import { LikeSvg } from './LikeSvg';

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
export interface ILikesBtn {
  USERID: number;
  BOARDID: number;
  POSTID: number;
  REVIEWID: number;
}
export const LikesBtn = ({ USERID, BOARDID, POSTID, REVIEWID }: ILikesBtn) => {
  //get
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
  const { data, mutate } = useSWR<IGetPostWithCounts>(GetAPI());
  const LikesCounts = () => {
    if (Boolean(BOARDID && POSTID)) {
      return data?.post?._count.likes;
    }
    if (Boolean(REVIEWID)) {
      return data?.review?._count.likes;
    }
  };
  //post
  const [CreateLikes] = useMutation(
    Boolean(USERID && BOARDID && POSTID)
      ? `/api/user/${USERID}/board/${BOARDID}/post/${POSTID}/create/likes`
      : Boolean(USERID && REVIEWID)
      ? `/api/user/${USERID}/review/${REVIEWID}/create/likes`
      : ''
  );

  const onClick = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        isLiked: !data.isLiked,
        post: {
          ...data?.post,
          _count: {
            ...data.post?._count,
            likes: data.isLiked
              ? data.post?._count.likes - 1
              : data.post?._count.likes + 1,
          },
        },
      },
      false
    );
    CreateLikes({});
  };
  return (
    <>
      <Cont onClick={onClick}>
        {data?.isLiked && <Svg type={'solid-heart'} />}
        {!data?.isLiked && <Svg type={'unsolid-heart'} />}
        <Counts>{LikesCounts() ? LikesCounts() : null}</Counts>
      </Cont>
    </>
  );
};
const Cont = styled.button`
  position: relative;
  border: none;
  outline: none;
  background-color: inherit;
  svg {
    width: 2rem;
    height: 2rem;
  }
  div {
    .solid-heart {
      fill: #e74c3c;
    }
  }
`;

const Counts = styled.article`
  top: -8px;
  right: -4px;
  position: absolute;
  font-weight: 500;
  font-size: 1.1em;
  color: ${(p) => p.theme.color.font}; ;
`;
