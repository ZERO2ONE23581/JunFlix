import styled from '@emotion/styled';
import { Board } from '@prisma/client';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { Btn } from '../../../../../src/components/Btn';
import { Input, Select } from '../../../../../src/components/Input';
import useMutation from '../../../../../src/libs/client/useMutation';
import {
  Article,
  BoardPage,
  Flex,
  Form,
  PageContainer,
} from '../../../../../styles/components/default';

interface IBoardRes {
  board: Board;
}

interface IEditBoardForm {
  title?: string;
  intro?: string;
  genre?: string;
}

const myBoard: NextPage = () => {
  const router = useRouter();
  const { boardId } = router.query;
  const { data } = useSWR<IBoardRes>(`/api/board/${Number(boardId)}`);

  //Post
  const [editBoard, { data: editedData, loading }] = useMutation(
    `/api/board/${Number(boardId)}/edit`
  );

  //Edit Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IEditBoardForm>({ mode: 'onSubmit' });

  const onValid = (formData: IEditBoardForm) => {
    if (loading) return;
    editBoard(formData);
  };
  const [edit, setEdit] = useState(false);
  const onClick = () => {
    setEdit((p) => !p);
  };
  //Set up
  useEffect(() => {
    if (data?.board?.title) setValue('title', data.board.title.toUpperCase());
    if (data?.board?.genre) setValue('genre', data.board.genre);
    if (data?.board?.intro) setValue('intro', data.board.intro);
  }, [setValue, data]);
  //
  return (
    <>
      <BoardPage>
        {data && (
          <BoardCont>
            <Btn
              onClick={onClick}
              type="yesOrno"
              btnName={edit ? 'Back' : 'Edit'}
            />
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
      </BoardPage>
    </>
  );
};
export default myBoard;

const BoardCont = styled(Article)`
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
