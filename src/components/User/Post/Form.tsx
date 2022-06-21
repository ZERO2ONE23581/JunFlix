import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ErrorMsg } from '../../Style/ErrMsg';
import { InputWrap } from '../../Style/Input';
import { IPostForm } from '../../../types/post';
import { AvatarLabel } from '../Avatar/Profile';
import { ThumnailAvatar } from '../Avatar/Thumnail';
import { TextAreaWrap } from '../../Style/Input/TextArea';
import { Form, FormCont, Info } from '../../../../styles/global';
import useMutation from '../../../libs/client/useMutation';
import { BoardAvatarIcon } from '../../Style/Svg/BoardAvatar';
import styled from '@emotion/styled';

interface ICreatePostRes {
  ok: boolean;
  error?: string;
  post?: Post;
}
export const PostForm = () => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const [createPost, { data, loading }] = useMutation<ICreatePostRes>(
    `/api/user/${user_id}/board/${board_id}/post/create`
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
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (data?.ok) {
      if (data?.ok && data.post) {
        alert('새로운 게시물이 생성되었습니다. 게시물로 이동합니다.');
        router.replace(
          `/user/${data.post.UserID}/board/${data.post?.BoardID}/post/${data.post.id}`
        );
      }
    }
  }, [avatar, watch, data, router]);
  return (
    <>
      <Cont>
        <CreatePostForm onSubmit={handleSubmit(onValid)}>
          <h1>Create Post</h1>
          <Btn type="submit" name="포스트 만들기" loading={loading} />
          {errors.avatar && <ErrorMsg error={errors.avatar.message} />}
          {data?.error && <ErrorMsg error={data.error} />}
          <div className="flex">
            <Avatar>
              <AvatarLabel htmlFor="avatar">
                <ThumnailAvatar preview={preview} />
                <input
                  {...register('avatar')}
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                />
              </AvatarLabel>
            </Avatar>
            <div className="flex-column">
              <InputWrap
                id="title"
                type="text"
                label="Title"
                inputErrMsg={errors.title?.message}
                register={register('title', {
                  required: '포스트 제목을 입력해주세요.',
                  maxLength: {
                    value: 30,
                    message: '포스트 제목은 30자 이내여야 합니다.',
                  },
                })}
              />
              <TextAreaWrap
                id="content"
                type="text"
                label="content"
                inputErrMsg={errors.content?.message}
                register={register('content')}
              />
            </div>
          </div>
        </CreatePostForm>
        <Info>
          <span>
            * Please click the icon on the right side to add picture on the
            post.
          </span>
          <span>* 사진을 업로드 하려면 좌측아이콘을 클릭하세요.</span>
        </Info>
      </Cont>
    </>
  );
};
const Cont = styled(FormCont)`
  width: 100%;
`;
const CreatePostForm = styled(Form)`
  border: 3px solid yellow;

  .flex {
    align-items: stretch;
    justify-content: center;
    width: 100%;
  }
  .flex-column {
    border: 1px solid blue;
    display: flex;
    flex-direction: column;
  }
`;
const Avatar = styled.article`
  border: 3px solid blueviolet;
  width: 50%;
`;
