import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../../styles/btn';
import { ErrMsg, Form, OkMsg } from '../../../../styles/default';
import useMutation from '../../../libs/client/useMutation';
import { IEditBoardForm } from '../../../types/board';
import { MutationRes } from '../../../types/mutation';
import { Input, Select } from '../../Input';

export const BoardForm = ({ board, isEdit }: any) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  //post
  const [editBoard, { data, loading }] = useMutation<MutationRes>(
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
  useEffect(() => {
    if (board) {
      if (board.title) setValue('title', board.title.toUpperCase());
      if (board.genre) setValue('genre', board.genre);
      if (board.intro) setValue('intro', board.intro);
    }
    if (data?.ok)
      setTimeout(() => {
        router.reload();
      }, 1000);
  }, [setValue, data, board]);
  //
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      {data?.message && <OkMsg>{data?.message}</OkMsg>}
      {data?.error && <ErrMsg>{data?.error}</ErrMsg>}
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
        disabled={!isEdit && true}
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
        disabled={!isEdit && true}
        placeholder="수정할 보드의 소개글을 작성해 주세요."
        errMsg={errors.intro?.message}
      />
      <Select
        register={register('genre')}
        name="genre"
        disabled={!isEdit && true}
        placeholder="수정할 장르를 선택해주세요."
        errMsg={errors.genre?.message}
      />
      {isEdit && (
        <Button clicked={false} type="submit">
          {loading ? 'Loading...' : 'Edit Board'}
        </Button>
      )}
    </Form>
  );
};
const Button = styled(Btn)<{ clicked: boolean }>`
  width: 80px;
  height: 40px;
  background-color: ${(p) => p.clicked && p.theme.color.logo};
`;
