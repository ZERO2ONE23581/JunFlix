import { Top } from './Top';
import styled from '@emotion/styled';
import { Avatar } from '../../Avatar';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Btn } from '../../Style/Button';
import { ComputeLength } from '../../Tools';
import { InputWrap } from '../../Style/Input';
import { ErrorMsg } from '../../Style/ErrMsg';
import { IPostForm } from '../../../types/post';
import { SaveCreatePost } from './SaveCreatePost';
import { CancelCreatePost } from '../Edit/Cancel';
import useUser from '../../../libs/client/useUser';
import { TextAreaWrap } from '../../Style/Input/TextArea';
import useMutation from '../../../libs/client/useMutation';
import { Modal, DimBackground } from '../../../../styles/global';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export interface ICreatePostRes {
  post?: Post;
  ok: boolean;
  error?: string;
}
interface ICreatePostModalProps {
  openCreatePost: Dispatch<SetStateAction<boolean>>;
}
export const CreatePost = ({ openCreatePost }: ICreatePostModalProps) => {
  const {
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({ mode: 'onBlur' });
  const router = useRouter();
  const { loggedInUser } = useUser();
  const { user_id, board_id } = router.query;
  const [createPost, { data, loading }] = useMutation<ICreatePostRes>(
    `/api/user/${user_id}/board/${board_id}/post/create`
  );
  //
  const avatar = watch('avatar');
  const [preview, setPreview] = useState('');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : null;
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  //
  const minHeight = 80;
  const maxHeight = 300;
  const [maxTitle] = useState(24);
  const [maxContent] = useState(700);
  const [height, setHeight] = useState(minHeight);
  useEffect(() => {
    const length = ComputeLength({ watch: watch, type: 'content' });
    setHeight(minHeight + length * 0.3);
    if (length) {
    }
  }, [watch('content'), ComputeLength, setHeight, minHeight]);
  //
  const [next, setNext] = useState(false);
  const [save, setSave] = useState(false);
  const [cancel, setCancel] = useState(false);
  const clickSave = () => {
    if (ComputeLength({ watch: watch, type: 'title' }) === 0)
      return setError('title', { message: '제목을 입력해주세요.' });
    if (ComputeLength({ watch: watch, type: 'title' }) > maxTitle)
      return setError('MaxTitle', {
        message: `포스트 제목의 길이는 ${maxTitle}자 이하입니다.`,
      });
    if (ComputeLength({ watch: watch, type: 'content' }) > maxContent)
      return setError('content', {
        message: `포스트 길이는 ${maxContent}자 이하입니다.`,
      });
    setSave(true);
  };
  useEffect(() => {
    if (ComputeLength({ watch: watch, type: 'title' }) !== 0)
      clearErrors('title');
    if (ComputeLength({ watch: watch, type: 'title' }) < maxTitle)
      clearErrors('MaxTitle');
    if (ComputeLength({ watch: watch, type: 'content' }) < maxContent)
      clearErrors('content');
  }, [ComputeLength, clearErrors, watch('title'), watch('content')]);
  //
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
      setAvatarLoading((p) => !p);
      return createPost({ title, content, avatar: id });
    } else {
      return createPost({ title, content });
    }
  };
  //
  useEffect(() => {
    if (data?.ok) {
      setSave(false);
      openCreatePost(false);
      alert('새로운 포스트를 생성했습니다.');
    }
  }, [data, openCreatePost, setSave]);
  //
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont isNext={next}>
          <Top
            next={next}
            setNext={setNext}
            cancel={cancel}
            setCancel={setCancel}
          />
          <div className="flex">
            <Avatar
              avatar=""
              id="avatar"
              disabled={next}
              preview={preview}
              register={register('avatar')}
              size={{ width: next ? '35vw' : '40vw', height: '80vh' }}
            />
            {next && (
              <Info>
                <InputWrap
                  id="title"
                  type="text"
                  label="Post Title"
                  watch={watch('title')}
                  placeholder="포스트 제목을 입력해 주세요."
                  register={register('title', {
                    required: '포스트 제목을 입력해 주세요.',
                  })}
                />
                <TextAreaWrap
                  id="content"
                  user={loggedInUser}
                  height={height}
                  minHeight={minHeight}
                  maxHeight={maxHeight}
                  register={register('content')}
                  placeholder="포스트의 내용을 적어주세요."
                />
                {data?.error && <ErrorMsg error={data?.error} />}
                {errors.title && <ErrorMsg error={errors.title.message} />}
                {errors.MaxTitle && (
                  <ErrorMsg error={errors.MaxTitle.message} />
                )}
                {errors.content && <ErrorMsg error={errors.content.message} />}
                <Btn name="SAVE" type="button" onClick={clickSave} />
              </Info>
            )}
          </div>
        </Cont>
        {save && (
          <SaveCreatePost data={data} loading={Loading} closeModal={setSave} />
        )}
        <input
          type="text"
          name="MaxTitle"
          disabled
          style={{ display: 'none' }}
        />
      </form>
      <DimBackground zIndex={101} onClick={() => setCancel(true)} />
      {cancel && (
        <CancelCreatePost closePost={openCreatePost} closeModal={setCancel} />
      )}
    </>
  );
};
const Cont = styled(Modal)<{ isNext: boolean }>`
  padding: 0;
  z-index: 102;
  border: none;
  display: block;
  min-width: 600px;
  min-height: 700px;
  border-radius: 5px;
  .flex {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
`;
const Info = styled.article`
  width: 35vw;
  height: 80vh;
  min-width: 400px;
  min-height: 600px;
  padding: 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  border-left: ${(p) => p.theme.border.thin};
  .INPUT-WRAP {
    max-width: 260px;
    label {
      display: none;
    }
    input {
      border: none;
      padding: 5px;
      font-size: 1.3rem;
      border-radius: 0;
      border-bottom: 2px solid ${(p) => p.theme.color.font};
      :focus {
        outline: none;
        border-bottom: 2px solid ${(p) => p.theme.color.logo};
      }
    }
  }
`;
