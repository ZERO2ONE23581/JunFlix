import styled from '@emotion/styled';
import { Board } from '@prisma/client';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
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

const myBoard: NextPage = () => {
  const router = useRouter();
  const { boardId } = router.query;
  const { data } = useSWR<IBoardRes>(`/api/board/${Number(boardId)}`);

  //Post
  const [editBoardInfo, { data: editedData, loading }] = useMutation(
    `/api/board/${Number(boardId)}/edit`
  );

  //Edit Form
  const { register, handleSubmit } = useForm({ mode: 'onSubmit' });
  const onValid = (formData: any) => {
    console.log(formData);
  };
  const [edit, setEdit] = useState(false);
  const onClick = () => {
    setEdit((p) => !p);
  };
  //
  return (
    <>
      <BoardPage>
        {data && (
          <BoardCont>
            <Btn onClick={onClick} type="yesOrno" btnName="Edit" />
            <form onSubmit={handleSubmit(onValid)}>
              {edit ? (
                <>
                  <Input
                    type="text"
                    name="title"
                    errMsg=""
                    placeholder="수정할 보드의 제목을 입력하세요."
                    register={register('title', {
                      required: '수정할 보드의 제목을 입력하세요.',
                    })}
                  />
                </>
              ) : (
                <h1>{data?.board?.title?.toUpperCase()}</h1>
              )}
              {edit ? (
                <>
                  <Input
                    type="text"
                    name="intro"
                    errMsg=""
                    placeholder="수정할 보드의 소개글을 작성해 주세요."
                    register={register('intro', {
                      maxLength: 50,
                    })}
                  />
                </>
              ) : (
                <h2>{data?.board?.genre}</h2>
              )}
              {edit ? (
                <>
                  <Select
                    name="genre"
                    errMsg=""
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
                    placeholder="수정할 장르를 선택해주세요."
                    register={register('genre')}
                  />
                </>
              ) : (
                <h3>{data?.board?.intro}</h3>
              )}

              {edit && (
                <Btn
                  type="submit"
                  btnName="나의 보드 수정하기"
                  loading={loading}
                />
              )}
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
