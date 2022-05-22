import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../../../src/components/Btn';
import { Input, Select } from '../../../../../src/components/Input';
import useMutation from '../../../../../src/libs/client/useMutation';
import { MutationRes } from '../../../../../src/types/mutation';
import { AllPosts } from '../../../../../src/components/Post/AllPost';
import { DeleteModal } from '../../../../../src/components/Modal/board/settting/delete/modal';
import { IBoardRes, IEditBoardForm } from '../../../../../src/types/board';
import {
  Article,
  BoardPage,
  ErrMsg,
  OkMsg,
} from '../../../../../styles/components/default';

const myBoard: NextPage = () => {
  const router = useRouter();
  const { userId, boardId } = router.query;
  const { data } = useSWR<IBoardRes>(`/api/board/${Number(boardId)}`);

  //Post
  const [editBoard, { data: editedData, loading }] = useMutation<MutationRes>(
    `/api/board/${Number(boardId)}/edit`
  );
  //Edit Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IEditBoardForm>({ mode: 'onSubmit' });
  const onValid = ({ title, genre, intro }: IEditBoardForm) => {
    if (loading) return;
    const titleCap = title?.toUpperCase();
    editBoard({ titleCap, genre, intro });
  };

  //Set up
  const [edit, setEdit] = useState(false);
  const [setting, setSetting] = useState(false);
  const [delModal, setDelModal] = useState(false);
  useEffect(() => {
    if (data?.board?.title) setValue('title', data.board.title.toUpperCase());
    if (data?.board?.genre) setValue('genre', data.board.genre);
    if (data?.board?.intro) setValue('intro', data.board.intro);
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
            <>
              <Btn
                type="create"
                onClick={() => {
                  router.push(`/user/${userId}/board/${boardId}/post/create`);
                }}
                btnName="Create Post"
              />
              <Btn
                type="board-setting"
                onClick={() => setSetting((p) => !p)}
                btnName="Setting"
              />
            </>
            <>
              {setting && (
                <article>
                  <Btn
                    type="board-edit"
                    onClick={() => setEdit((p) => !p)}
                    btnName={edit ? 'Back' : 'Edit Board'}
                  />
                  <Btn
                    type="board-delete"
                    onClick={() => setDelModal((p) => !p)}
                    btnName="Delete"
                  />
                </article>
              )}
            </>
            <>
              {delModal && (
                <DeleteModal
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
                placeholder="수정할 보드의 제목을 입력하세요."
                register={register('title', {
                  required: '수정할 보드의 제목을 입력하세요.',
                })}
              />
              <Input
                errMsg={errors.intro?.message}
                type="text"
                name="intro"
                disabled={!edit && true}
                placeholder="수정할 보드의 소개글을 작성해 주세요."
                register={register('intro', {
                  maxLength: 50,
                })}
              />
              <Select
                errMsg={errors.genre?.message}
                name="genre"
                disabled={!edit && true}
                placeholder="수정할 장르를 선택해주세요."
                register={register('genre')}
                options={[
                  'SF',
                  'Drama',
                  'Horror',
                  'Comedy',
                  'Fantasy',
                  'Romance',
                  'Action',
                  'Mystery',
                  'Thriller',
                ]}
              />
              {edit && <Btn type="submit" btnName="Edit" loading={loading} />}
            </form>
          </BoardCont>
        )}
        <AllPosts userId={userId} boardId={boardId} />
      </BoardPage>
    </>
  );
};
export default myBoard;

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
