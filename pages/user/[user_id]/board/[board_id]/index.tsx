import {
  Article,
  ErrMsg,
  OkMsg,
  PageCont,
} from '../../../../../styles/default';
import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../../../../src/components/Button';
import useUser from '../../../../../src/libs/client/useUser';
import { MutationRes } from '../../../../../src/types/mutation';
import { Input, Select } from '../../../../../src/components/Input';
import useMutation from '../../../../../src/libs/client/useMutation';
import {
  IEditBoardForm,
  IGetBoardDetail,
} from '../../../../../src/types/board';
import { DeleteModal } from '../../../../../src/components/Modal/Board/Delete';
import { PostList } from '../../../../../src/components/Post/PostList';
import { FollowBoard } from '../../../../../src/components/Button/Follow';

const Board_Detail: NextPage = () => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const { isloggedIn, loggedInUser } = useUser();
  const { data } = useSWR<IGetBoardDetail>(
    user_id && board_id && `/api/user/${user_id}/board/${board_id}`
  );
  const [editBoard, { data: dataRes, loading }] = useMutation<MutationRes>(
    `/api/user/${user_id}/board/${board_id}/edit`
  );
  //
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
  //
  const [edit, setEdit] = useState(false);
  const [setting, setSetting] = useState(false);
  const [delModal, setDelModal] = useState(false);
  useEffect(() => {
    if (data && data?.ok && data?.board) {
      if (data.board.title) setValue('title', data.board.title.toUpperCase());
      if (data.board.genre) setValue('genre', data.board.genre);
      if (data.board.intro) setValue('intro', data.board.intro);
    }
    if (dataRes?.ok)
      setTimeout(() => {
        router.reload();
      }, 1000);
  }, [setValue, data, dataRes]);
  //
  return (
    <PageCont>
      {delModal && (
        <DeleteModal
          userId={user_id}
          boardId={board_id}
          deleteClick={() => setDelModal((p) => !p)}
        />
      )}
      {data?.ok && data.board && (
        <>
          <FollowBoard user_id={data.board.UserID} board_id={data.board.id} />
          <article className="btn-wrap">
            <Btn
              type="back"
              btnName="My Boards"
              onClick={() => router.push(`/user/${user_id}/mypage`)}
            />
            {isloggedIn && loggedInUser?.id === data?.board?.UserID && (
              <article className="btn-wrap">
                <Btn
                  type="create"
                  onClick={() => {
                    router.push(
                      `/user/${user_id}/board/${board_id}/post/create`
                    );
                  }}
                  btnName="Create Post"
                />
                <Btn
                  type="board-setting"
                  onClick={() => setSetting((p) => !p)}
                  btnName="Setting"
                />
              </article>
            )}
          </article>
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
          <form onSubmit={handleSubmit(onValid)}>
            {dataRes?.message && <OkMsg>{dataRes?.message}</OkMsg>}
            {dataRes?.error && <ErrMsg>{dataRes?.error}</ErrMsg>}
            <span>{data.board.user?.username}</span>
            <span>'s board</span>
            <Input
              register={register('title', {
                required: '수정할 보드의 제목을 입력하세요.',
                maxLength: {
                  value: 30,
                  message: '보드제목은 30자 이내여야 합니다.',
                },
              })}
              type="text"
              name="title"
              disabled={!edit && true}
              placeholder="수정할 보드의 제목을 입력하세요."
              errMsg={errors.title?.message}
            />
            <Input
              register={register('intro', {
                maxLength: {
                  value: 50,
                  message: '소개글은 50자 이내여야 합니다.',
                },
              })}
              type="text"
              name="intro"
              disabled={!edit && true}
              placeholder="수정할 보드의 소개글을 작성해 주세요."
              errMsg={errors.intro?.message}
            />
            <Select
              register={register('genre')}
              name="genre"
              disabled={!edit && true}
              placeholder="수정할 장르를 선택해주세요."
              errMsg={errors.genre?.message}
            />
            {edit && <Btn type="submit" btnName="Edit" loading={loading} />}
          </form>
          <PostList posts={data?.board?.post} />
        </>
      )}
    </PageCont>
  );
};
export default Board_Detail;

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
