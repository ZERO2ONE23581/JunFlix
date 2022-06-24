import { Notice } from './Notice';
import styled from '@emotion/styled';
import { Post } from '@prisma/client';
import { UndoPost } from '../UndoPost';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { SubmitPost } from '../SubmitPost';
import { AvatarInput } from './AvatarInput';
import { PostContent } from './PostContent';
import { TitleWithBtn } from '../TitleWithBtn';
import { IPostForm } from '../../../../types/post';
import { IBoardWithAttrs } from '../../../../types/board';
import { ModalClose, ModalSchema } from '../../../../../styles/global';
import useMutation from '../../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ICreatePostRes {
  ok: boolean;
  error?: string;
  post?: Post;
}
interface ICreatePostModalProps {
  board?: IBoardWithAttrs;
  closeModal: Dispatch<SetStateAction<boolean>>;
}
export const CreatePost = ({ board, closeModal }: ICreatePostModalProps) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const [createPost, { data, loading }] = useMutation<ICreatePostRes>(
    `/api/user/${user_id}/board/${board_id}/post/create`
  );

  const {
    watch,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({ mode: 'onSubmit' });

  const onValid = async ({ avatar, title, content }: IPostForm) => {
    const Title = title?.toUpperCase();
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
      createPost({ Title, content, avatar: id });
    } else {
      createPost({ Title, content });
    }
  };

  const avatar = watch('avatar');
  const [preview, setPreview] = useState('');
  const [next, setNext] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [undoPost, setUndoPost] = useState(false);
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (data?.ok) {
      alert('새로운 게시물이 생성되었습니다.');
      router.reload();
    }
  }, [avatar, data, router]);

  return (
    <>
      <Cont>
        <Form onSubmit={handleSubmit(onValid)}>
          <TitleWithBtn
            next={next}
            submit={submit}
            setNext={setNext}
            setSubmit={setSubmit}
            undoPost={undoPost}
            setUndoPost={setUndoPost}
          />
          <FormInputs>
            <AvatarInput
              disabled={next}
              preview={preview}
              register={register('avatar')}
            />
            {next && (
              <PostContent
                board={board}
                watch={watch}
                disabled={false}
                register={register}
                getValues={getValues}
              />
            )}
          </FormInputs>
          <Notice next={next} />
          {submit && (
            <SubmitPost
              loading={loading}
              errors={{
                data: data?.error,
                title: errors.title?.message,
                content: errors.content?.message,
              }}
              closeModal={setSubmit}
            />
          )}
          {submit && <ModalClose />}
        </Form>
      </Cont>
      <ModalClose onClick={() => setUndoPost(true)} />
      {undoPost && <UndoPost closePost={closeModal} closeModal={setUndoPost} />}
    </>
  );
};
const Cont = styled(ModalSchema)`
  height: 75vh;
`;
const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const FormInputs = styled.article`
  height: 100%;
  display: flex;
  align-items: center;
`;
