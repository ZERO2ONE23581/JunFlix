import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Board } from '@prisma/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Style/Button';
import { IBoardForm } from '../../../../types/board';
import { MutationRes } from '../../../../types/mutation';
import useMutation from '../../../../libs/client/useMutation';
import { MovieGenreOption } from '../../../Style/GenreOption';
import {
  Errors,
  Form,
  Input,
  Select,
  TextArea,
} from '../../../../../styles/global';
import { AddBoardAvatarIcon } from '../../../Style/Svg/BoardAvatar';

interface IEditBoardFormProps {
  board?: Board;
  setPreview: any;
}
export const EditBoardForm = ({ board, setPreview }: IEditBoardFormProps) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const [editBoard, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${user_id}/board/${board_id}/edit`
  );
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onSubmit' });
  const avatar = watch('avatar');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const onValid = async ({ title, genre, intro, avatar }: IBoardForm) => {
    const Title = title?.toUpperCase();
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

      return editBoard({ Title, intro, genre, avatar: id });
    } else {
      setAvatarLoading((p) => !p);
      return editBoard({ Title, intro, genre });
    }
  };
  useEffect(() => {
    if (board) {
      if (board.title) setValue('title', board.title.toUpperCase());
      if (board.genre) setValue('genre', board.genre);
      if (board.intro) setValue('intro', board.intro);
    }
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (data?.ok) {
      alert('보드가 수정되었습니다.');
      router.reload();
    }
  }, [setValue, data, board, router, avatar]);
  return (
    <Cont>
      <h1 className="h1">Edit Board</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <div className="label-input-wrap">
          <div className="flex">
            <div>
              <h2>Click the icon beside to edit Background.</h2>
              <h3>보드의 배경을 수정하려면 아이콘을 클릭하세요.</h3>
            </div>
            <label htmlFor="avatar" className="avatar-label">
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
        </div>
        <div className="label-input-wrap">
          <label htmlFor="title">Title</label>
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
            placeholder="수정할 보드의 제목을 입력하세요."
          />
          {errors.title && <Errors>{errors.title.message}</Errors>}
        </div>

        <div className="label-input-wrap">
          <label htmlFor="genre">Genre</label>
          <Select {...register('genre')} id="genre" name="genre">
            <MovieGenreOption />
          </Select>
          {errors.genre && <Errors>{errors.genre.message}</Errors>}
        </div>

        <div className="label-input-wrap">
          <label htmlFor="intro">Intro</label>
          <TextArea
            {...register('intro', {
              maxLength: {
                value: 100,
                message: '소개글은 100자 이내여야 합니다.',
              },
            })}
            id="intro"
            name="intro"
            placeholder="보드에 대한 소개글을 수정합니다."
          />
          {errors.intro && <Errors>{errors.intro?.message}</Errors>}
        </div>

        <div className="btn-wrap">
          <Btn
            name="보드 수정"
            type="submit"
            loading={avatarLoading ? avatarLoading : loading}
          />
        </div>
      </Form>
    </Cont>
  );
};

const Cont = styled.article`
  padding: 20px 50px;
  form {
    margin-top: 30px;
    gap: 30px;
    .label-input-wrap {
      .avatar-label {
        position: relative;
      }
      .avatar-input {
        display: none;
      }
      position: relative;
      label {
        position: absolute;
        top: -20px;
        left: 20px;
        font-size: 1.2rem;
        font-weight: 500;
        z-index: 99;
        padding: 5px;
        display: block;
        background-color: ${(p) => p.theme.color.bg};
      }
      input,
      textarea,
      select {
        width: 100%;
      }
    }
  }
  .btn-wrap {
    button {
      font-size: 1.1rem;
      padding: 12px;
      width: 100%;
    }
  }
`;
