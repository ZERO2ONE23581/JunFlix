import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../../../../src/components/Btn';
import { Input } from '../../../../../../src/components/Input';
import { MutationRes } from '../../../../../../src/types/mutation';
import useMutation from '../../../../../../src/libs/client/useMutation';
import { BoardCont } from '..';
import { IPostForm } from '../../../../../../src/types/post';
import { ErrMsg } from '../../../../../../styles/components/default';

const myPost: NextPage = () => {
  const router = useRouter();
  const { userId, boardId } = router.query;

  //Post
  const [createPost, { data: postData, loading }] = useMutation<MutationRes>(
    `/api/user/${userId}/board/${boardId}/post/create`
  );

  //Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({ mode: 'onSubmit' });
  const onValid = ({ title, content }: IPostForm) => {
    if (loading) return;
    createPost({ title, content });
  };
  //
  useEffect(() => {
    if (postData?.ok) {
      alert('새로운 게시물이 생성되었습니다.');
      router.replace(`/user/${userId}/board/${boardId}/`);
    }
  }, [postData, router]);
  //
  return (
    <BoardCont>
      <form onSubmit={handleSubmit(onValid)}>
        {postData?.error && <ErrMsg>{postData?.error}</ErrMsg>}
        <Input
          errMsg={errors.title?.message}
          type="text"
          name="title"
          placeholder="게시물의 제목을 입력해주세요."
          register={register('title', {
            required: '게시물의 제목을 입력해주세요.',
          })}
        />
        <Input
          errMsg={errors.content?.message}
          type="text"
          name="content"
          placeholder="게시물의 내용을 입력해주세요."
          register={register('content')}
        />
        <Btn type="submit" btnName="Create Post" loading={loading} />
      </form>
    </BoardCont>
  );
};
export default myPost;
