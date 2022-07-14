import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { SubmitEdit } from './SubmitEdit';
import { useForm } from 'react-hook-form';
import { Avatar } from '../../Avatar';
import { EditPostInputs } from './EditPostInputs';
import { IconBtn } from '../../Style/Button/IconBtn';
import useMutation from '../../../libs/client/useMutation';
import { IEditPostForm, IGetPost, IPost } from '../../../types/post';
import { Modal, DimBackground } from '../../../../styles/global';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { InputWrap } from '../../Style/Input';
import { TextAreaWrap } from '../../Style/Input/TextArea';
import useUser from '../../../libs/client/useUser';
import { ComputeLength } from '../../Tools';
import { Btn } from '../../Style/Button';
import { TitleInput } from '../../Style/Input/Title';
import { ErrorMsg } from '../../Style/ErrMsg';

interface IEditPost extends IPost {
  setEditPost: Dispatch<SetStateAction<boolean>>;
}
export const EditPost = ({ post, setEditPost }: IEditPost) => {
  const {
    watch,
    setError,
    clearErrors,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditPostForm>({ mode: 'onBlur' });
  useEffect(() => {
    if (post) {
      if (post.title) setValue('title', post.title.toUpperCase());
      if (post.content) setValue('content', post.content);
    }
  }, [setValue, post]);
  const router = useRouter();
  const { loggedInUser } = useUser();
  const [edit, { data, loading }] = useMutation(
    `/api/user/${post.UserID}/board/${post.BoardID}/post/${post.id}/edit`
  );
  //
  const avatar = watch('editAvatar');
  const [preview, setPreview] = useState('');
  console.log(preview);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : null;
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [avatar, setPreview]);
  //
  const minHeight = 80;
  const maxHeight = 300;
  const [maxTitle] = useState(24);
  const [maxContent] = useState(700);
  const [height, setHeight] = useState(minHeight);
  useEffect(() => {
    const length = ComputeLength({ watch: watch, type: 'content' });
    setHeight(minHeight + length * 0.3);
  }, [watch('content'), ComputeLength, setHeight, minHeight]);
  //
  const [saveEdit, setSaveEdit] = useState(false);
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
    setSaveEdit(true);
  };
  //
  useEffect(() => {
    if (ComputeLength({ watch: watch, type: 'title' }) !== 0)
      clearErrors('title');
    if (ComputeLength({ watch: watch, type: 'title' }) < maxTitle)
      clearErrors('MaxTitle');
    if (ComputeLength({ watch: watch, type: 'content' }) < maxContent)
      clearErrors('content');
  }, [ComputeLength, clearErrors, watch('title'), watch('content')]);
  //
  const onValid = async ({ editAvatar, title, content }: IEditPostForm) => {
    if (loading) return;
    if (editAvatar && editAvatar.length > 0) {
      setAvatarLoading((p) => !p);
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append('file', editAvatar[0]);
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      setAvatarLoading((p) => !p);
      return edit({ title, content, avatar: id });
    } else {
      return edit({ title, content });
    }
  };
  //
  useEffect(() => {
    if (data?.ok) {
      setEditPost(false);
      alert('포스트를 수정했습니다.');
    }
  }, [data, router, setEditPost]);
  //
  const MaxWidth = 75;
  const MaxHeight = '75vh';
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont MaxWidth={`${MaxWidth}vw`} MaxHeight={MaxHeight}>
          <Avatar
            id="editAvatar"
            disabled={false}
            preview={preview}
            avatar={post?.avatar!}
            register={register('editAvatar')}
            size={{ width: `${MaxWidth * 0.55}vw`, height: MaxHeight }}
          />
          <Info MaxWidth={`${MaxWidth * 0.45}vw`} MaxHeight={MaxHeight}>
            <Top>
              <h1>게시물 수정하기</h1>
              <IconBtn
                size="1.5rem"
                type="button"
                svgType="close"
                onClick={() => setEditPost(false)}
              />
            </Top>
            <div className="wrap">
              <TitleInput
                id="title"
                type="text"
                placeholder={'포스트 제목을 입력해 주세요.'}
                register={register('title', {
                  required: '포스트 제목을 입력해 주세요.',
                })}
              />
              <TextAreaWrap
                id="content"
                height={height}
                minHeight={minHeight}
                maxHeight={maxHeight}
                user={loggedInUser}
                register={register('content')}
                placeholder="포스트의 내용을 적어주세요."
              />
              {data?.error && <ErrorMsg error={data?.error} />}
              {errors.title && <ErrorMsg error={errors.title.message} />}
              {errors.MaxTitle && <ErrorMsg error={errors.MaxTitle.message} />}
              {errors.content && <ErrorMsg error={errors.content.message} />}
              <Btn type="button" name="SAVE" onClick={clickSave} />
            </div>
          </Info>
        </Cont>
        {saveEdit && <SubmitEdit loading={Loading} closeModal={setSaveEdit} />}
      </form>
      <DimBackground zIndex={102} onClick={() => setEditPost(false)} />
    </>
  );
};
const Cont = styled(Modal)<{ MaxWidth: string; MaxHeight: string }>`
  gap: 0;
  flex-direction: row;
  padding: 0;
  border: none;
  z-index: 103;
  overflow: hidden;
  /* min-width: 600px; */
  /* min-height: 600px; */
  width: ${(p) => p.MaxWidth};
  height: ${(p) => p.MaxHeight};
`;
const Info = styled.article<{ MaxWidth: string; MaxHeight: string }>`
  width: ${(p) => p.MaxWidth};
  height: ${(p) => p.MaxHeight};
  min-width: 400px;
  .wrap {
    gap: 20px;
    display: flex;
    padding: 10px 20px;
    flex-direction: column;
    justify-content: center;
    .textarea-wrap {
      padding: 5px;
    }
  }
`;
const Top = styled.div`
  padding: 12px 20px;
  position: relative;
  text-align: center;
  color: ${(p) => p.theme.color.bg};
  background-color: ${(p) => p.theme.color.font};
  h1 {
    font-size: 1.2rem;
  }
  button {
    top: 0.6rem;
    right: 0.8rem;
    position: absolute;
    svg {
      /* fill: ${(p) => p.theme.color.font}; */
    }
  }
`;
