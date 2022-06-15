import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Errors,
  Form,
  FormCont,
  Input,
  Select,
} from '../../../../styles/global';
import useMutation from '../../../libs/client/useMutation';
import { IEditBoardForm } from '../../../types/board';
import { MutationRes } from '../../../types/mutation';
import { Btn } from '../../Button';

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
    <FormCont>
      <Form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="title" />
        <Input
          {...register('title', {
            required: '수정할 보드의 제목을 입력하세요.',
            maxLength: {
              value: 30,
              message: '보드제목은 30자 이내여야 합니다.',
            },
          })}
          type="text"
          id="title"
          name="title"
          disabled={!isEdit && true}
          placeholder="수정할 보드의 제목을 입력하세요."
        />
        {errors.title && <Errors>{errors.title.message}</Errors>}

        <label htmlFor="intro" />
        <Input
          {...register('intro', {
            maxLength: {
              value: 50,
              message: '소개글은 50자 이내여야 합니다.',
            },
          })}
          type="text"
          id="intro"
          name="intro"
          disabled={!isEdit && true}
          placeholder="수정할 보드의 소개글을 작성해 주세요."
        />
        {errors.intro && <Errors>{errors.intro.message}</Errors>}

        <label htmlFor="title" />
        <Select
          {...register('genre')}
          id="genre"
          name="genre"
          disabled={!isEdit && true}
        >
          <option value="">수정할 장르를 선택해주세요.</option>
          <option value="SF">SF</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
          <option value="Comedy">Comedy</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Thriller">Thriller</option>
        </Select>
        {errors.genre && <Errors>{errors.genre.message}</Errors>}

        {isEdit && (
          <Btn
            clicked={false}
            name="보드 수정"
            type="submit"
            loading={loading}
          />
        )}
      </Form>
    </FormCont>
  );
};
