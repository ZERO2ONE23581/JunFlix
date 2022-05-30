import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../../../../../../src/components/Button';
import { IPostForm } from '../../../../../../../src/types/post';
import { Input } from '../../../../../../../src/components/Input';
import { MutationRes } from '../../../../../../../src/types/mutation';
import useMutation from '../../../../../../../src/libs/client/useMutation';
import { ThumNail } from '../../../../../../../src/components/Post/AllPostsWithBoard';
import { ErrMsg, PageCont } from '../../../../../../../styles/default';

const CreatePost: NextPage = () => {
  const router = useRouter();
  const { userId, boardId } = router.query;
  const [createPost, { data: postData, loading }] = useMutation<MutationRes>(
    `/api/user/${userId}/board/${boardId}/post/create`
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({ mode: 'onSubmit' });

  const avatar = watch('avatar');
  const onValid = async ({ avatar, title, content }: IPostForm) => {
    if (loading) return;
    if (avatar && avatar.length > 0) {
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append('file', avatar[0]);
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      return createPost({ title, content, avatar: id });
    } else {
      return createPost({ title, content });
    }
  };
  //
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (postData?.ok) {
      if (postData?.ok) {
        alert('새로운 게시물이 생성되었습니다.');
        router.replace(`/user/${userId}/board/${boardId}`);
      }
    }
  }, [avatar, watch, postData, router]);
  //
  return (
    <PageCont>
      <section className="create-post-cont">
        <form onSubmit={handleSubmit(onValid)}>
          {postData?.error && <ErrMsg>{postData?.error}</ErrMsg>}
          <ThumNail>
            {preview ? (
              <img src={`${preview}`} alt="파일 업로드" />
            ) : (
              <img
                className="noimage"
                src="/img/noimage.svg"
                alt="파일 업로드"
              />
            )}
          </ThumNail>
          <Input
            register={register('avatar')}
            type="file"
            name="avatar"
            label="Post Image"
            errMsg={errors.avatar?.message}
          />
          <Input
            register={register('title', {
              required: '포스트 제목을 입력해주세요.',
              maxLength: {
                value: 30,
                message: '포스트 제목은 30자 이내여야 합니다.',
              },
            })}
            type="text"
            name="title"
            placeholder="게시물의 제목을 입력해주세요."
            errMsg={errors.title?.message}
          />
          <Input
            register={register('content')}
            type="text"
            name="content"
            placeholder="게시물의 내용을 입력해주세요."
            errMsg={errors.content?.message}
          />
          <Btn type="submit" btnName="Create Post" loading={loading} />
        </form>
      </section>
    </PageCont>
  );
};
export default CreatePost;
