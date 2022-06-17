import styled from '@emotion/styled';
import { Board } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Errors,
  Form,
  FormCont,
  Input,
  Select,
  TextArea,
} from '../../../../../styles/global';
import useMutation from '../../../../libs/client/useMutation';
import { IBoardForm } from '../../../../types/board';
import { Btn } from '../../../Style/Button';
import { MovieGenreOption } from '../../../Style/GenreOption';
import { AddBoardAvatarIcon } from '../../../Style/Svg/BoardAvatar';

interface ICreateBoardRes {
  ok: boolean;
  error?: string;
  board: Board;
}
export const CreateBoardForm = ({ setPreview }: any) => {
  const router = useRouter();
  const { user_id } = router.query;
  const [createBoard, { loading, data }] = useMutation<ICreateBoardRes>(
    `/api/user/${user_id}/board/create`
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onSubmit' });
  const avatar = watch('avatar');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const onValid = async ({ title, intro, genre, avatar }: IBoardForm) => {
    const Title = title.toUpperCase();
    setAvatarLoading((p) => !p);
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
      setAvatarLoading((p) => !p);
      return createBoard({ Title, intro, genre, avatar: id });
    } else {
      setAvatarLoading((p) => !p);
      return createBoard({ Title, intro, genre });
    }
  };
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
      <Cont>
        <h1>Create Board</h1>
        <BoardForm onSubmit={handleSubmit(onValid)}>
          <div className="flex">
            <div>
              <h2>Click the icon beside to add Background.</h2>
              <h3>보드의 배경을 추가하려면 아이콘을 클릭하세요.</h3>
            </div>
            <label htmlFor="avatar" className="avatar">
              <AddBoardAvatarIcon />
            </label>
          </div>
          <Input
            {...register('avatar')}
            type="file"
            id="avatar"
            name="avatar"
            className="avatar-input"
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
            placeholder="생성하실 보드의 제목을 입력하세요."
          />

          <label htmlFor="genre" />
          <Select {...register('genre')} id="genre" name="genre">
            <MovieGenreOption />
          </Select>
          {errors.genre && <Errors>{errors.genre.message}</Errors>}

          <label htmlFor="intro" />
          <TextArea
            {...register('intro', {
              maxLength: {
                value: 100,
                message: '소개글은 100자 이내여야 합니다.',
              },
            })}
            id="intro"
            name="intro"
            placeholder="보드에 대한 소개글을 작성해 보세요."
          />
          {errors.intro && <Errors>{errors.intro?.message}</Errors>}

          {data?.error && <Errors>{data?.error}</Errors>}
          <Btn type="submit" name="나의 보드 만들기" loading={avatarLoading} />
        </BoardForm>
      </Cont>
    </>
  );
};

const Cont = styled(FormCont)`
  width: 540px;
  padding: 30px 50px;
  h2 {
    font-size: 1.2 rem;
  }
`;
const BoardForm = styled(Form)`
  .flex {
    margin-top: 10px;
    align-items: flex-start;
    .avatar {
      cursor: pointer;
      display: block;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .avatar-input {
    display: none;
  }
  button {
    width: 100%;
  }
`;
