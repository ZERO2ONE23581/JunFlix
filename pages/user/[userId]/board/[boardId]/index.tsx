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
  PageSectionWide,
  ErrMsg,
  Flex,
  OkMsg,
} from '../../../../../styles/components/default';
import useUser from '../../../../../src/libs/client/loggedInUser';

const myBoard: NextPage = () => {
  const router = useRouter();
  const { userId, boardId } = router.query;
  const { isloggedIn, loggedInUser } = useUser();
  const { data: boardData } = useSWR<IBoardRes>(
    `/api/user/${userId}/board/${boardId}`
  );
  const okBoard = boardData?.ok;
  const board = boardData?.board;
  //Post
  const [editBoard, { data, loading }] = useMutation<MutationRes>(
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
    const Title = title?.toUpperCase();
    editBoard({ Title, genre, intro });
  };

  //Set up
  const [edit, setEdit] = useState(false);
  const [setting, setSetting] = useState(false);
  const [delModal, setDelModal] = useState(false);
  useEffect(() => {
    if (okBoard && board) {
      if (board.title) setValue('title', board.title.toUpperCase());
      if (board.genre) setValue('genre', board.genre);
      if (board.intro) setValue('intro', board.intro);
    }
    if (data?.ok)
      setTimeout(() => {
        router.reload();
      }, 1000);
  }, [setValue, boardData, data]);
  //
  return (
    <>
      <PageSectionWide>
        {okBoard && board && (
          <BoardCont>
            <Flex>
              <Btn
                type="back"
                btnName="Back"
                onClick={() => router.push(`/`)}
              />
              {isloggedIn && loggedInUser?.id === board?.UserID && (
                <Flex>
                  <Btn
                    type="create"
                    onClick={() => {
                      router.push(
                        `/user/${userId}/board/${boardId}/post/create`
                      );
                    }}
                    btnName="Create Post"
                  />
                  <Btn
                    type="board-setting"
                    onClick={() => setSetting((p) => !p)}
                    btnName="Setting"
                  />
                </Flex>
              )}
            </Flex>
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
            <>
              {data?.message && <OkMsg>{data?.message}</OkMsg>}
              {data?.error && <ErrMsg>{data?.error}</ErrMsg>}
            </>
            <article>
              <span>{board.user?.username}</span>
              <span>'s board</span>
            </article>
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
      </PageSectionWide>
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
