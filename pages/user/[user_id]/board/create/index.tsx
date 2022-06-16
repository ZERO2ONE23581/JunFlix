import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Board } from '@prisma/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { BoardForm } from '../../../../../src/types/board';
import { Errors, Input } from '../../../../../styles/global';
import { Btn } from '../../../../../src/components/Style/Button';
import useMutation from '../../../../../src/libs/client/useMutation';
import { BackGroundAvatar } from '../../../../../src/components/User/Avatar/BackgroundAvatar';

interface ICreateBoardRes {
  ok: boolean;
  error?: string;
  board: Board;
}
const CreateBoard: NextPage = () => {
  const router = useRouter();
  const { user_id } = router.query;
  const [createBoard, { loading, data }] = useMutation<ICreateBoardRes>(
    `/api/user/${user_id}/board/create`
  );
  //
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardForm>({ mode: 'onSubmit' });
  const avatar = watch('avatar');
  const onValid = async ({ title, intro, genre, avatar }: BoardForm) => {
    if (loading) return;
    if (avatar && avatar.length > 0) {
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append('file', avatar[0]);
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      return createBoard({ title, intro, genre, avatar: id });
    } else {
      return createBoard({ title, intro, genre });
    }
  };
  //
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (data?.ok) {
      alert('보드를 생성하였습니다. 생성한 보드로 이동합니다.');
      router.replace(`/user/${data.board.UserID}/board/${data.board.id}`);
    }
  }, [data, router, avatar]);
  return (
    <>
      <BackGroundAvatar preview={preview} url={true} />
      <Cont>
        <h1>Create Board</h1>
        <Form onSubmit={handleSubmit(onValid)}>
          <label htmlFor="avatar" />
          <Input
            {...register('avatar')}
            type="file"
            id="avatar"
            name="avatar"
          />
          {errors.avatar && <Errors>{errors.avatar?.message}</Errors>}

          <label htmlFor="title" />
          <Input
            {...register('title', {
              required: '생성하실 보드의 제목을 입력하세요.',
              maxLength: {
                value: 30,
                message: '보드제목은 30자 이내여야 합니다.',
              },
            })}
            type="text"
            id="title"
            name="title"
            placeholder="Title"
          />

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
            placeholder="Intro"
          />
          {errors.intro && <Errors>{errors.intro?.message}</Errors>}

          <label htmlFor="genre" />
          {data?.error && <Errors>{data?.error}</Errors>}
          <Btn type="submit" name="나의 보드 만들기" loading={loading} />
        </Form>
      </Cont>
    </>
  );
};
export default CreateBoard;
const Cont = styled.article`
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
  h1 {
    font-size: 2rem;
    font-weight: 700;
  }
`;
const Form = styled.form`
  margin: 0 auto;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  border-radius: 8px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
