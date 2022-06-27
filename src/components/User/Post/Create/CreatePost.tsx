import { Top } from '../Read/Top';
import { Notice } from './Notice';
import styled from '@emotion/styled';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { SubmitPost } from './SubmitPost';
import { PostContent } from './PostContent';
import { IPostForm } from '../../../../types/post';
import { AvatarInput } from '../../Avatar/AvatarInput';
import { IBoardWithAttrs } from '../../../../types/board';
import useMutation from '../../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ModalClose, ModalSchema } from '../../../../../styles/global';
import { UndoPost } from '../Read/UndoPost';

interface ICreatePostRes {
  ok: boolean;
  error?: string;
  post?: Post;
}
interface ICreatePostModalProps {
  board?: IBoardWithAttrs;
  openCreatePost: Dispatch<SetStateAction<boolean>>;
}
export const CreatePost = ({
  board,
  openCreatePost,
}: ICreatePostModalProps) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;

  const {
    watch,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({ mode: 'onSubmit' });
  const avatar = watch('avatar');
  const [preview, setPreview] = useState('');
  const [avatarLoading, setAvatarLoading] = useState(false);

  //post
  const [createPost, { data, loading }] = useMutation<ICreatePostRes>(
    `/api/user/${user_id}/board/${board_id}/post/create`
  );

  const Loading = avatarLoading ? avatarLoading : loading ? loading : null;
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
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (data?.ok) {
      alert('새로운 게시물이 생성되었습니다.');
      openCreatePost(false);
    }
  }, [avatar, data, openCreatePost]);
  const [next, setNext] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);
  const [undoPost, setUndoPost] = useState(false);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <Top
            next={next}
            setNext={setNext}
            onSubmit={onSubmit}
            setOnSubmit={setOnSubmit}
            undoPost={undoPost}
            setUndoPost={setUndoPost}
          />
          <Wrap>
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
          </Wrap>
          <Notice next={next} />
        </Cont>

        {onSubmit && (
          <SubmitPost
            loading={Loading}
            closeModal={setOnSubmit}
            errors={{
              data: data?.error,
              title: errors.title?.message,
              content: errors.content?.message,
            }}
          />
        )}
      </form>
      <ModalClose onClick={() => setUndoPost(true)} />
      {undoPost && (
        <UndoPost closePost={openCreatePost} closeModal={setUndoPost} />
      )}
    </>
  );
};
const Cont = styled(ModalSchema)`
  height: 80vh;
  display: flex;
  flex-direction: column;
`;
const Wrap = styled.article`
  height: 100%;
  display: flex;
  align-items: center;
`;
