import { useState } from 'react';
import useSWR from 'swr';
import { IGetPosts, IPostType } from '../../types/post';
import { useCapLetters } from './useTools';
import { useGetUser, useUser } from './useUser';

export interface IUseGetAllPosts {
  counts?: number | any;
  posts: IPostType[] | any;
}
interface IUseGetPosts {
  isQs?: boolean;
  host_id: number | string;
  board_id: number | string;
}
interface useGetLikedPosts {
  host_id: number | string;
}

export const useGetAllPosts = () => {
  const { data } = useSWR<IGetPosts>(`/api/post/all`);
  const posts = data?.posts!;
  const isPost = data?.ok && Boolean(posts.length > 0);
  return { posts: data?.posts!, isPost };
};

export const useGetLikedPosts = ({ host_id }: useGetLikedPosts) => {
  const { data } = useSWR<IGetPosts>(`/api/post/all`);
  const posts = data?.posts!;
  const { user } = useGetUser(Number(host_id));
  const liked_post_IDs = user?.likes?.map((el) => el.post_id);
  const posts_liked = posts?.filter((post) =>
    liked_post_IDs?.includes(post?.id)
  );
  const isLikedPost = Boolean(posts_liked?.length > 0);
  return { posts_liked, isLikedPost };
};

export const useGetPosts = ({ host_id, board_id, isQs }: IUseGetPosts) => {
  const { data } = useSWR<IGetPosts>(`/api/post/all`);
  if (board_id || isQs) {
    const posts = data?.posts?.filter(
      (e) => e.host_id === Number(host_id) && e.board_id === Number(board_id)
    )!;
    const isPost = Boolean(data?.ok && posts.length > 0);
    return { posts, isPost };
  } else {
    const posts = data?.posts?.filter((e) => e.host_id === Number(host_id))!;
    const isPost = data?.ok && Boolean(posts.length > 0);
    return { posts, isPost };
  }
};
export const useGetQuickSaved = (host_id: number) => {
  const { data } = useSWR<IGetPosts>(`/api/post/all`);
  const posts = data?.posts?.filter(
    (e) => e.host_id === host_id && e.board_id === 0
  );
  return { posts, counts: posts?.length! };
};

export const usePostTitle = (title: string) => {
  const length = title.length;
  const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  const isKor = korean.test(title);
  if (isKor && length > 15) return useCapLetters(title.slice(0, 15)) + '...';
  else if (length <= 24) return useCapLetters(title);
  else return useCapLetters(title.slice(0, 24)) + '...';
};

interface IUsePostsGrid {
  //col: number;
  grid: number;
  //array: [number];
  posts: IPostType[];
}
export const usePostsGrid = ({ posts, grid }: IUsePostsGrid) => {
  const [max, setMax] = useState(grid);
  const ColArr = [...new Array(max)].map((_, p) => p + 1);
  const PostArr = (col: number) =>
    posts?.filter(
      (post) =>
        posts.indexOf(post) === ColArr.indexOf(col) || // first row
        posts.indexOf(post) % max === ColArr.indexOf(col) // second row ++
    );
  return { ColArr, PostArr, max, setMax };
};
