import {
  ErrMsg,
  PageCont,
} from '../../../../../../../styles/components/default';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../../../../../../src/components/Btn';
import { IPostForm } from '../../../../../../../src/types/post';
import { Input } from '../../../../../../../src/components/Input';
import { MutationRes } from '../../../../../../../src/types/mutation';
import useMutation from '../../../../../../../src/libs/client/useMutation';
import { ThumNail } from '../../../../../../../src/components/Post/AllPostsWithBoard';

const CreatePost: NextPage = () => {
  const router = useRouter();
  const { userId, boardId } = router.query;

  //Post
  const [createPost, { data: postData, loading }] = useMutation<MutationRes>(
    `/api/user/${userId}/board/${boardId}/post/create`
  );

  //Form
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({ mode: 'onSubmit' });

  const avatar = watch('avatar');
  const onValid = async ({ avatar, title, content }: IPostForm) => {
    if (avatar && avatar.length > 0) {
      const { uploadURL } = await (await fetch(`/api/file`)).json(); //GET
      const form = new FormData();
      form.append('file', avatar[0]);
      //POST
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      if (loading) return;
      createPost({ title, content, avatar: id });
    }
  };
  //Preview
  const [thumNailPreview, setThumnNailPreview] = useState('');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setThumnNailPreview(URL.createObjectURL(file));
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
            {thumNailPreview ? (
              <img src={`${thumNailPreview}`} alt="파일 업로드" />
            ) : (
              <img
                className="noimage"
                src="/img/noimage.svg"
                alt="파일 업로드"
              />
            )}
          </ThumNail>
          <Input
            type="file"
            name="avatar"
            label="Post Image"
            register={register('avatar')}
            errMsg={errors.avatar?.message}
          />
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
      </section>
    </PageCont>
  );
};
export default CreatePost;
