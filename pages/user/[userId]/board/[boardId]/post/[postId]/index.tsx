import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../../../../../../src/components/Btn';
import { Input } from '../../../../../../../src/components/Input';
import { MutationRes } from '../../../../../../../src/types/mutation';
import useMutation from '../../../../../../../src/libs/client/useMutation';
import { IEditPostForm, IPostRes } from '../../../../../../../src/types/post';
import { DeleteModal } from '../../../../../../../src/components/Modal/board/settting/delete/modal';
import {
  Article,
  BoardPage,
  ErrMsg,
  OkMsg,
} from '../../../../../../../styles/components/default';

const myPost: NextPage = () => {
  const router = useRouter();
  const { userId, boardId, postId } = router.query;

  //Get
  const { data } = useSWR<IPostRes>(`/api/board/${boardId}/post/${postId}`);

  //Post
  const [editPost, { data: editedData, loading }] = useMutation<MutationRes>(
    `/api/board/${boardId}/post/${postId}/edit`
  );

  //Edit Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IEditPostForm>({ mode: 'onSubmit' });

  const onValid = ({ title, content }: IEditPostForm) => {
    if (loading) return;
    editPost({ title, content });
  };

  //Set up
  const [edit, setEdit] = useState(false);
  const [setting, setSetting] = useState(false);
  const [delModal, setDelModal] = useState(false);
  useEffect(() => {
    if (data?.post?.title) setValue('title', data.post.title);
    if (data?.post?.content) setValue('content', data.post.content);
    if (data?.post?.createdAt) setValue('createdAt', data.post.createdAt);
    if (editedData?.ok)
      setTimeout(() => {
        router.reload();
      }, 1000);
  }, [setValue, data, editedData]);
  //
  return (
    <>
      <BoardPage>
        {data && (
          <BoardCont>
            <Btn
              type="board-setting"
              onClick={() => setSetting((p) => !p)}
              btnName="Setting"
            />
            <>
              {setting && (
                <article>
                  <Btn
                    type="post-edit"
                    onClick={() => setEdit((p) => !p)}
                    btnName={edit ? 'Back' : 'Edit Post'}
                  />
                  <Btn
                    type="post-delete"
                    onClick={() => setDelModal((p) => !p)}
                    btnName="Delete"
                  />
                </article>
              )}
            </>
            <>
              {delModal && (
                <DeleteModal
                  userId={userId}
                  postId={postId}
                  boardId={boardId}
                  deleteClick={() => setDelModal((p) => !p)}
                />
              )}
            </>
            <>
              {editedData?.message && <OkMsg>{editedData?.message}</OkMsg>}
              {editedData?.error && <ErrMsg>{editedData?.error}</ErrMsg>}
            </>
            <form onSubmit={handleSubmit(onValid)}>
              <Input
                errMsg={errors.title?.message}
                type="text"
                name="title"
                disabled={!edit && true}
                placeholder="게시물의 제목을 입력하세요."
                register={register('title', {
                  required: '게시물의 제목을 입력하세요.',
                })}
              />
              <Input
                errMsg={errors.content?.message}
                type="text"
                name="content"
                disabled={!edit && true}
                placeholder="게시물의 내용을 작성해 주세요."
                register={register('content', {
                  maxLength: 50,
                })}
              />
              <Input
                name="createdAt"
                disabled={true}
                register={register('createdAt')}
              />
              {edit && <Btn type="submit" btnName="Edit" loading={loading} />}
            </form>
          </BoardCont>
        )}
      </BoardPage>
    </>
  );
};
export default myPost;

export const BoardCont = styled(Article)`
  flex-direction: column;
  justify-content: center;
  padding: 20px 100px;
  width: 100%;
  h1 {
    font-weight: 600;
    font-size: 1.5rem;
    text-align: start;
  }
  h2 {
    text-align: end;
  }
  h3 {
    text-align: start;
    font-size: 1rem;
  }
`;
