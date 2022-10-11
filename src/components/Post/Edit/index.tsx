import styled from '@emotion/styled';
import { Avatar, AVATAR_URL } from '../../../Tools/Avatar/indexafsd';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useMutation from '../../../libs/client/useMutation';
import { Modal, Overlay } from '../../../../styles/global';
import { IEditPostForm } from '../../../types/post';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ConfirmModal } from '../../../Tools/Modal/confirm';
import { useCapLetters } from '../../../libs/client/useTools';
import { motion } from 'framer-motion';
import { TextArea } from '../../../Tools/Input/TextArea';
import { Errors } from '../../../Tools/Errors';

interface IEditPost {
  ogData: {
    userId: number;
    boardId: number;
    postId: number;
    title: string;
    content: string;
    postAvatar: string;
  };
  setEdit: Dispatch<SetStateAction<{ update: boolean; delete: boolean }>>;
}
export const EditPost = ({ ogData, setEdit }: IEditPost) => {
  const {
    watch,
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditPostForm>({ mode: 'onBlur' });

  useEffect(() => {
    if (ogData) {
      if (ogData.title) setValue('title', useCapLetters(ogData.title));
      if (ogData.content) setValue('content', ogData.content);
    }
  }, [ogData, setValue]);

  const router = useRouter();
  const [edit, { data, loading }] = useMutation(
    `/api/user/${ogData.userId}/board/${ogData.boardId}/post/${ogData.postId}/edit`
  );

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
  const [saveEdit, setSaveEdit] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : false;

  useEffect(() => {
    if (data?.ok) {
      setEdit({ update: false, delete: false });
      alert('포스트를 수정했습니다.');
    }
  }, [data, router, setEdit]);

  const inputVars = {
    color: '#E50914',
    borderBottom: 'thick double #E50914',
    transition: { delay: 0.1, duration: 0.1, type: 'linear', stiffness: 200 },
  };
  const textAreaVars = {
    color: '#E50914',
    border: '5px solid #E50914',
    transition: {
      delay: 0.1,
      duration: 0.1,
      type: 'linear',
      stiffness: 200,
    },
  };
  const textHeight = Number(watch('content')?.length);
  const clickCloseIcon = () => setEdit({ update: false, delete: false });
  const clickSave = () => {
    if (!watch('title'))
      return setError('title', { message: '포스트 제목을 입력하세요.' });
    else if (!watch('content'))
      return setError('content', { message: '내용을 입력하세요.' });
    else setSaveEdit(true);
  };
  //
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont background={AVATAR_URL(ogData?.postAvatar!)}>
          <Errors errors={errors} />
          <Svg type="close" size="2rem" onClick={clickCloseIcon} />
          <Avatar
            id="editAvatar"
            avatar={ogData.postAvatar}
            avatarWatch={watch('editAvatar')!}
            register={register('editAvatar')}
          />
          <EditContent className="edit-post-content">
            <Input type="text" {...register('title')} whileFocus={inputVars} />
            <TextArea
              height={textHeight}
              {...register('content')}
              placeholder="Write the title"
              className="edit-post-textarea"
              whileFocus={textAreaVars}
            />
            <Btn type="button" name="Edit Post" onClick={clickSave} />
          </EditContent>
        </Cont>

        <Overlay
          className="post-edit-overlay"
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setEdit({ update: false, delete: false })}
        />

        {saveEdit && (
          <ConfirmModal
            loading={Loading}
            type="update-post"
            closeModal={setSaveEdit}
          />
        )}
      </form>
    </>
  );
};

const Cont = styled(Modal)<{ background: string }>`
  border: 5px solid cornflowerblue;
  gap: 0;
  padding: 0;
  z-index: 103;
  overflow: hidden;
  width: 60vw;
  height: 85vh;
  min-width: 600px;
  min-height: 600px;
  flex-direction: row;
  .editAvatar {
    .isImageTag,
    .isPreivewTag {
      width: 35vw;
      height: 85vh;
      min-width: 300px;
      min-height: 600px;
    }
  }
  .edit-post-content {
    width: 25vw;
    height: 85vh;
    min-width: 300px;
    min-height: 600px;
    border: 1px solid red;
  }
  .close {
    top: 1em;
    right: 1em;
    position: absolute;
  }
`;
const EditContent = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: ${(p) =>
    `linear-gradient(to right, ${p.theme.color.bg}, ${p.theme.color.grey.dark})`};
  input,
  textarea {
    outline: none;
  }
  button {
    width: 100%;
    padding: 10px;
  }
  .edit-post-textarea {
    width: 100%;
    padding: 20px;
    min-height: 50%;
    font-size: 1em;
    line-height: 1.3em;
    color: ${(p) => p.theme.color.bg};
    background-color: ${(p) => p.theme.color.font};
  }
`;
const Input = styled(motion.input)`
  margin: 0 auto;
  border: none;
  padding: 10px;
  font-size: 2em;
  text-align: center;
  color: inherit;
  background-color: inherit;
`;
