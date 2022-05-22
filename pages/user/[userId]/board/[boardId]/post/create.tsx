import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BoardCont } from '..';
import { Btn } from '../../../../../../src/components/Btn';
import { Input } from '../../../../../../src/components/Input';
import useMutation from '../../../../../../src/libs/client/useMutation';

const myPost: NextPage = () => {
  const router = useRouter();
  const { userId, boardId } = router.query;

  //Post
  const [createPost, { data, loading }] = useMutation(
    `/api/board/${boardId}/post/create`
  );

  //Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });
  const onValid = ({ title, content }: any) => {
    if (loading) return;
    createPost({ title, content });
  };
  //
  useEffect(() => {
    if (data?.ok) {
      alert('새로운 게시물이 생성되었습니다.');
      router.replace(`/user/${userId}/board/${boardId}/`);
    }
  }, [data, router]);
  //
  return (
    <BoardCont>
      <form onSubmit={handleSubmit(onValid)}>
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
          register={register('content', {
            required: '게시물의 내용을 입력해주세요.',
          })}
        />
        <Btn type="submit" btnName="Create Post" loading={loading} />
      </form>
    </BoardCont>
  );
};
export default myPost;
