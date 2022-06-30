import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { SubmitEdit } from './SubmitEdit';
import { useForm } from 'react-hook-form';
import { Avatar } from '../../Avatar/Avatar';
import { EditPostInputs } from './EditPostInputs';
import { IconBtn } from '../../Style/Button/IconBtn';
import useMutation from '../../../libs/client/useMutation';
import { IEditPostForm, IGetPost } from '../../../types/post';
import { Modal, DimBackground } from '../../../../styles/global';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export interface IPostModalProps {
  USERID: number;
  BOARDID: number;
  POSTID: number;
}
interface IEditPostModalProps extends IPostModalProps {
  setEditPost: Dispatch<SetStateAction<boolean>>;
}
export const EditPost = ({
  USERID,
  BOARDID,
  POSTID,
  setEditPost,
}: IEditPostModalProps) => {
  const router = useRouter();
  const {
    watch,
    setError,
    clearErrors,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditPostForm>({ mode: 'onBlur' });
  const avatar = watch('avatar');
  //get
  const { data: givenData } = useSWR<IGetPost>(
    `/api/user/${USERID}/board/${BOARDID}/post/${POSTID}`
  );
  const post = givenData?.post;
  useEffect(() => {
    if (post) {
      if (post.title) setValue('title', post.title.toUpperCase());
      if (post.content) setValue('content', post.content);
    }
  }, [givenData, setValue, post]);
  //post
  const [EditPost, { data, loading }] = useMutation(
    `/api/user/${USERID}/board/${BOARDID}/post/${POSTID}/edit`
  );
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : null;
  const onValid = async ({ avatar, title, content }: IEditPostForm) => {
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
      return EditPost({ title, content, avatar: id });
    } else {
      return EditPost({ title, content });
    }
  };
  //
  const [preview, setPreview] = useState('');
  const [saveEdit, setSaveEdit] = useState(false);
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (data?.error) alert(data.error);
    if (data?.ok) {
      setEditPost(false);
      router.reload();
    }
  }, [avatar, data, router, setEditPost]);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <Avatar
            disabled={false}
            preview={preview}
            url={post?.avatar}
            register={register('avatar')}
            size={{ width: '35vw', height: '65vh' }}
          />
          <About>
            <Top>
              <span>게시물 수정하기</span>
              <IconBtn
                type="button"
                svgType="close-btn"
                onClick={() => setEditPost(false)}
              />
            </Top>
            <EditPostInputs
              watch={watch}
              preview={preview}
              register={register}
              setError={setError}
              clearErrors={clearErrors}
              setSaveCreate={setSaveEdit}
              ERRORS_TITLE={errors.title}
              ERRORS_CONTENT={errors.content}
            />
          </About>
        </Cont>

        {saveEdit && <SubmitEdit loading={Loading} closeModal={setSaveEdit} />}
      </form>
      <DimBackground zIndex={102} onClick={() => setEditPost(false)} />
    </>
  );
};
const Cont = styled(Modal)`
  z-index: 103;
  padding: 0;
  width: 60vw;
  height: 65vh;
  min-width: 800px;
  overflow: hidden;
  gap: 0;
  flex-direction: row;
`;
const About = styled.article`
  width: 25vw;
  height: 100%;
  overflow: hidden;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border.thin};
  background-color: ${(p) => p.theme.color.bg};
  //
  gap: 10px;
  display: flex;
  flex-direction: column;
  //
  input {
    color: ${(p) => p.theme.color.logo};
    border: 2px solid ${(p) => p.theme.color.logo};
    :focus {
      border: 2px solid transparent;
      color: ${(p) => p.theme.color.green};
      outline: 2px solid ${(p) => p.theme.color.green};
    }
  }
  .question {
    right: 20px;
    bottom: 20px;
    position: absolute;
    svg {
      opacity: 0.8;
      width: 33px;
      height: 33px;
    }
  }
  .submit-btn {
    display: flex;
    padding-right: 20px;
    justify-content: end;
  }
`;
const Top = styled.div`
  position: relative;
  padding: 14px 10px;
  font-size: 1.1rem;
  text-align: center;
  border-bottom: ${(p) => p.theme.border.thick};
  button {
    top: 15%;
    right: 2%;
    position: absolute;
    svg {
      width: 28px;
      height: 28px;
    }
  }
`;
