import styled from '@emotion/styled';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { Btn } from '../../../Style/Button';
import { useForm } from 'react-hook-form';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { InputWrap } from '../../../Style/Input';
import { IPostForm } from '../../../../types/post';
import { AvatarLabel, ProfileAvatar } from '../../Avatar/Profile';
import { ThumnailAvatar } from '../../Avatar/Thumnail';
import {
  Info,
  Modal,
  ModalClose,
  ModalSchema,
} from '../../../../../styles/global';
import { TextAreaWrap } from '../../../Style/Input/TextArea';
import useMutation from '../../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useUser from '../../../../libs/client/useUser';
import { CreatePostNotice } from './CreatePostNotice';

interface ICreatePostRes {
  ok: boolean;
  error?: string;
  post?: Post;
}
interface ICreatePostModalProps {
  openModal: Dispatch<SetStateAction<boolean>>;
}
export const CreatePostModal = ({ openModal }: ICreatePostModalProps) => {
  const { loggedInUser } = useUser();
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const [createPost, { data, loading }] = useMutation<ICreatePostRes>(
    `/api/user/${user_id}/board/${board_id}/post/create`
  );
  const {
    getValues,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({ mode: 'onSubmit' });
  const avatar = watch('avatar');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const onValid = async ({ avatar, title, content }: IPostForm) => {
    if (loading) return;
    if (avatar && avatar.length > 0) {
      setAvatarLoading((p) => !p);
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
      createPost({ title, content, avatar: id });
      setAvatarLoading((p) => !p);
    } else {
      createPost({ title, content });
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
  const [next, setNext] = useState(false);
  const clickNext = () => {
    setNext(true);
  };
  const clickBack = () => {
    setNext(false);
  };
  const LoadingText = Boolean(
    avatarLoading ? avatarLoading : loading ? loading : null
  );
  const Length = (type: string) => {
    if (type === 'title') return 20;
    if (type === 'content') return 1000;
  };
  return (
    <>
      <Cont>
        <Form onSubmit={handleSubmit(onValid)}>
          <BtnWrap>
            {!next && (
              <Btn type="button" name="BACK" onClick={() => openModal(true)} />
            )}
            {next && <Btn type="button" name="Back" onClick={clickBack} />}
            <h1>Create Post</h1>
            {!next && <Btn type="button" name="Next" onClick={clickNext} />}
            {next && (
              <Btn type="submit" name="포스트 생성" loading={LoadingText} />
            )}
          </BtnWrap>
          <Wrapper>
            <Avatar isPreview={Boolean(preview)}>
              <AvatarLabel htmlFor="avatar">
                <ThumnailAvatar preview={preview} />
                <input
                  {...register('avatar')}
                  disabled={next}
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                />
              </AvatarLabel>
            </Avatar>
            {next && (
              <Wrap>
                <div className="host">
                  <ProfileAvatar url={loggedInUser?.avatar} size={40} />
                  <span>{loggedInUser?.username}</span>
                </div>
                <PostInfo>
                  <InputWrap
                    id="title"
                    type="text"
                    label="Post Title"
                    max={Length('title')}
                    watch={watch('title')}
                    isValue={Boolean(getValues('title'))}
                    inputErrMsg={errors.title?.message}
                    register={register('title', {
                      required: '게시물 제목을 입력해주세요.',
                      maxLength: {
                        value: Length('title')!,
                        message: '게시물 제목은 20자 이내여야 합니다.',
                      },
                    })}
                  />
                  <TextAreaWrap
                    id="content"
                    type="text"
                    label="Content"
                    max={Length('content')}
                    watch={watch('content')}
                    placeholder="포스트 내용을 입력해주세요."
                    inputErrMsg={errors.content?.message}
                    register={register('content', {
                      maxLength: {
                        value: Length('content')!,
                        message: '게시물 내용은 1000자 이내여야 합니다.',
                      },
                    })}
                  />
                </PostInfo>
              </Wrap>
            )}
          </Wrapper>
        </Form>
        <CreatePostNotice
          next={next}
          MaxTitle={Length('title')}
          MaxContent={Length('content')}
        />
        {errors.avatar && <ErrorMsg error={errors.avatar.message} />}
        {data?.error && <ErrorMsg error={data.error} />}
      </Cont>
      <ModalClose onClick={() => openModal(true)} />
    </>
  );
};
const Cont = styled(ModalSchema)``;
const Form = styled.form``;
const BtnWrap = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #404040;
  h1 {
    font-weight: 600;
    font-size: 1.5rem;
  }
  button {
    padding: 6px 15px;
  }
`;
const Wrapper = styled.div`
  padding: 20px 40px;
  padding-bottom: 0;
  gap: 30px;
  display: flex;
  align-items: center;
`;
const Avatar = styled.article<{ isPreview?: boolean }>`
  border-radius: 3px;
  border: ${(p) => !p.isPreview && '1px solid #2d3436'};
  .thum-avatar {
    height: 400px;
    overflow: hidden;
    min-width: 500px;
    max-width: 600px;
    border-radius: 3px;
  }
`;
const Wrap = styled.article`
  gap: 20px;
  width: 330px;
  height: 400px;
  display: flex;
  flex-direction: column;
  .host {
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: start;
  }
`;
const PostInfo = styled.article`
  gap: 30px;
  display: flex;
  flex-direction: column;
  input {
    font-size: 1.1rem;
    padding: 11px 12px;
  }
`;
