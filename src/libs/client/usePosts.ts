import useSWR from 'swr';
import { useGetUser } from './useUser';
import { useRouter } from 'next/router';
import { IRes } from '../../types/global';
import {
  useCapLetters,
  useLength,
  useResponsive,
  useUploadImg,
} from './useTools';
import {
  UseFormReset,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';
import { IGetPosts, IPostForm, IPostType } from '../../types/post';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export interface IUseGetAllPosts {
  counts?: number | any;
  posts: IPostType[] | any;
}
interface IUseGetPosts {
  isQs?: boolean;
  host_id: number;
  board_id: number;
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

export const useGetPosts = ({ host_id, board_id, isQs }: IUseGetPosts) => {
  const { user } = useGetUser(Number(host_id));
  const { data } = useSWR<IGetPosts>(`/api/post/all`);
  const posts = data?.posts!;
  const likes = user?.likes?.map((el) => el.post_id);
  const likedPosts = posts?.filter((post) => likes?.includes(post?.id));
  if (board_id || isQs) {
    const posts = data?.posts?.filter(
      (e) => e.host_id === Number(host_id) && e.board_id === Number(board_id)
    )!;
    const noData = !Boolean(data?.ok && posts.length > 0);
    return { posts, noData };
  } else {
    const posts = data?.posts?.filter((e) => e.host_id === Number(host_id))!;
    const noData = !Boolean(data?.ok && posts.length > 0);
    const QS = data?.posts?.filter(
      (e) => e.host_id === host_id && e.board_id === 0
    );
    const noQS = !Boolean(QS?.length! > 0);
    return { posts, noData, likedPosts, QS, noQS };
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
  posts: IPostType[];
}
export const usePostsGrid = ({ posts }: IUsePostsGrid) => {
  const [max, setMax] = useState(2);
  const { isDesk, isMobile } = useResponsive();
  const ColArr = [...new Array(max)].map((_, p) => p + 1);
  const PostArr = (col: number) =>
    posts?.filter(
      (post) =>
        posts.indexOf(post) === ColArr.indexOf(col) || // first row
        posts.indexOf(post) % max === ColArr.indexOf(col) // second row ++
    );
  useEffect(() => {
    if (isMobile) setMax(2);
  }, [setMax, isDesk]);
  return { ColArr, PostArr, max, setMax };
};
interface IUsePostResult {
  data?: IRes;
  type: string;
  setMsg: Dispatch<SetStateAction<string>>;
  setModal: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export const usePostResult = ({
  data,
  type,
  setMsg,
  setModal,
  setLoading,
}: IUsePostResult) => {
  const router = useRouter();
  useEffect(() => {
    if (data) {
      setModal('');
      setTimeout(() => {
        if (data) {
          if (data?.error) console.log(data.error);
          if (data?.ok) {
            setLoading(false);
            setMsg(type);
            setTimeout(() => {
              router.reload();
            }, 2000);
          }
        }
      }, 1000);
    }
  }, [data, router, setLoading, setMsg]);
};
interface IUseSetPost {
  post: IPostType;
  setValue: UseFormSetValue<IPostForm>;
}
export const useSetPost = ({ post, setValue }: IUseSetPost) => {
  useEffect(() => {
    if (post) {
      if (post.description) setValue('description', post.description);
      if (post.hashtags) setValue('hashtags', post.hashtags);
      if (post.pageLink) setValue('pageLink', post.pageLink);
      if (post.onPrivate) setValue('onPrivate', post.onPrivate);
      if (post.title) setValue('title', useCapLetters(post.title));
    }
  }, [post, setValue]);
};

interface IResetPostPrev {
  post: IPostType;
  reset: UseFormReset<IPostForm>;
  setPreview: Dispatch<SetStateAction<string>>;
}
export const usePostReset = ({ post, setPreview, reset }: IResetPostPrev) => {
  setPreview('');
  if (post) {
    reset({
      title: post.title!,
      post_image: undefined,
      hashtags: post.hashtags!,
      pageLink: post.pageLink!,
      onPrivate: post.onPrivate!,
      description: post.description!,
    });
  }
};
interface IUseFetchPost {
  POST: {
    update: ({}) => void;
    remove: ({}) => void;
  };
  Loading: {
    loading_u: boolean;
    loading_d: boolean;
  };
  _data: {
    hide: boolean;
    isDelete: boolean;
    new_boardId: number;
    setError: UseFormSetError<IPostForm>;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
}
export const useFetchPost = ({ _data, POST, Loading }: IUseFetchPost) => {
  const { update, remove } = POST;
  const { loading_u, loading_d } = Loading;
  const { hide, isDelete, new_boardId, setError, setLoading } = _data;

  const onValid = async (inputs: IPostForm) => {
    if (loading_u) return;
    if (isDelete) {
      if (loading_d!) return;
      setLoading!(true);
      return remove!({ isDelete });
    } else {
      if (useLength(inputs?.title!) >= 50)
        return setError('title', { message: 'max_post_title' });
      if (useLength(inputs?.description!) >= 1000)
        return setError('description', { message: 'max_post_desc' });
      setLoading!(true);
      const board_id = new_boardId;
      const file_id = await useUploadImg(inputs?.post_image);
      if (hide) return update({ ...inputs, board_id, post_image: null });
      if (file_id) return update({ ...inputs, post_image: file_id, board_id });
      else return update({ ...inputs, board_id });
    }
  };
  return { onValid };
};
