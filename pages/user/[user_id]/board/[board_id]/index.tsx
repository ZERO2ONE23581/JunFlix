import { ErrMsg, OkMsg } from '../../../../../styles/default';
import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useUser from '../../../../../src/libs/client/useUser';
import { MutationRes } from '../../../../../src/types/mutation';
import { Input, Select } from '../../../../../src/components/Input';
import useMutation from '../../../../../src/libs/client/useMutation';
import {
  IEditBoardForm,
  IGetBoardDetail,
} from '../../../../../src/types/board';
import { DeleteModal } from '../../../../../src/components/Modal/Board/Delete';
import { PostList } from '../../../../../src/components/Post/List';
import { Avatar } from '../../../../../src/components/Avatar';
import { Btn } from '../../../../../styles/btn';

const BoardInfo: NextPage = () => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const queryId = user_id && board_id;
  const { loggedInUser } = useUser();
  //
  const { data } = useSWR<IGetBoardDetail>(
    queryId && `/api/user/${user_id}/board/${board_id}`
  );
  const board = data?.board;
  const isOwner = Boolean(loggedInUser?.id === board?.UserID);
  //
  const [editBoard, { data: dataRes, loading }] = useMutation<MutationRes>(
    `/api/user/${user_id}/board/${board_id}/edit`
  );
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
    if (data && data?.ok && board) {
      if (board.title) setValue('title', board.title.toUpperCase());
      if (board.genre) setValue('genre', board.genre);
      if (board.intro) setValue('intro', board.intro);
    }
    if (dataRes?.ok)
      setTimeout(() => {
        router.reload();
      }, 1000);
  }, [setValue, data, dataRes]);
  //
  return (
    <>
      <Avatar bg={true} url={board?.avatar} />
      <Board>
        <H1>{board?.user?.username}'s board</H1>
        <BtnWrap>
          <Button
            clicked={false}
            type="button"
            onClick={() => router.push(`/all/boards`)}
          >
            Boards
          </Button>
          {isOwner && (
            <>
              <Button
                clicked={false}
                type="button"
                onClick={() => {
                  router.push(`/user/${user_id}/board/${board_id}/post/create`);
                }}
              >
                Create
              </Button>
              <Button
                clicked={setting}
                type="button"
                onClick={() => setSetting((p) => !p)}
              >
                Setting
              </Button>
            </>
          )}
          {setting && (
            <>
              <Button
                clicked={edit}
                type="button"
                onClick={() => setEdit((p) => !p)}
              >
                Edit
              </Button>
              <Button
                clicked={false}
                type="button"
                onClick={() => setDelModal((p) => !p)}
              >
                Delete
              </Button>
            </>
          )}
        </BtnWrap>
        <Form onSubmit={handleSubmit(onValid)}>
          {dataRes?.message && <OkMsg>{dataRes?.message}</OkMsg>}
          {dataRes?.error && <ErrMsg>{dataRes?.error}</ErrMsg>}
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
          {edit && (
            <Button type="submit">
              {loading ? 'Loading...' : 'Edit Board'}
            </Button>
          )}
        </Form>
        <PostList posts={board?.posts} />
      </Board>
      {delModal && (
        <DeleteModal
          userId={user_id}
          boardId={board_id}
          deleteClick={() => setDelModal((p) => !p)}
        />
      )}
    </>
  );
};
export default BoardInfo;

const Board = styled.article`
  width: 50%;
  padding: 20px;
  top: 70%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;

const BtnWrap = styled.article`
  margin: 10px auto;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Button = styled(Btn)<{ clicked: boolean }>`
  width: 80px;
  height: 40px;
  background-color: ${(p) => p.clicked && p.theme.color.logo};
`;
const EditBgBtn = styled(Button)`
  /* width: 80px;
  height: 40px; */
`;
const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;
const Form = styled.form``;
