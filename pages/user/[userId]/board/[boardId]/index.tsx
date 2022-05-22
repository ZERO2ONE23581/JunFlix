import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../../../../src/components/Btn';
import { MutationRes } from '../../../../../src/types/mutation';
import { Input, Select } from '../../../../../src/components/Input';
import useMutation from '../../../../../src/libs/client/useMutation';
import { AllPosts } from '../../../../../src/components/Post/AllPost';
import { IBoardRes, IEditBoardForm } from '../../../../../src/types/board';
import { DeleteModal } from '../../../../../src/components/Modal/board/settting/delete/modal';
import {
  Article,
  BoardPage,
  ErrMsg,
  OkMsg,
} from '../../../../../styles/components/default';
import useUser from '../../../../../src/libs/client/loggedInUser';

const myBoard: NextPage = () => {
  const router = useRouter();
  const { userId, boardId } = router.query;
  const { isloggedIn, loggedInUser } = useUser();
  const security = Boolean(isloggedIn && loggedInUser?.id === Number(userId));
  const { data: boardData } = useSWR<IBoardRes>(
    `/api/user/${userId}/board/${boardId}`
  );
  //Post
  const [editBoard, { data: editedData, loading }] = useMutation<MutationRes>(
    `/api/user/${userId}/board/${boardId}/edit`
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
    if (boardData?.board?.title)
      setValue('title', boardData.board.title.toUpperCase());
    if (boardData?.board?.genre) setValue('genre', boardData.board.genre);
    if (boardData?.board?.intro) setValue('intro', boardData.board.intro);
    if (editedData?.ok)
      setTimeout(() => {
        router.reload();
      }, 1000);
  }, [setValue, boardData, editedData]);
  //
  return (
    <>
      <BoardPage>
        {boardData && (
          <BoardCont>
            {/* 세팅 및 포스트생성 버튼 */}
            {security && (
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
            )}
            {/* 보드 수정 및 삭제 모달 */}
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
              {delModal && (
                <DeleteModal
                  userId={userId}
                  boardId={boardId}
                  deleteClick={() => setDelModal((p) => !p)}
                />
              )}
            </>
            {/* 데이터 메시지 및 에러*/}
            <>
              {editedData?.message && <OkMsg>{editedData?.message}</OkMsg>}
              {editedData?.error && <ErrMsg>{editedData?.error}</ErrMsg>}
            </>

            <article>
              <span>{boardData?.board?.user?.username}</span>
              <span>'s board</span>
            </article>

            {/* 폼 */}
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
