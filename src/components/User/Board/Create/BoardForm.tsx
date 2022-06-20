import styled from '@emotion/styled';
import { Board } from '@prisma/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../../Style/Button';
import { IBoardForm } from '../../../../types/board';
import useMutation from '../../../../libs/client/useMutation';
import { InputWrap } from '../../../Style/Input';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { AvatarLabel } from '../../Avatar/Profile';
import { TextAreaWrap } from '../../../Style/Input/TextArea';
import { BoardAvatarIcon } from '../../../Style/Svg/BoardAvatar';
import { Form, FormCont, Info } from '../../../../../styles/global';
import { SelectWrap } from '../../../Style/Input/SelectWrap';

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
        <Form onSubmit={handleSubmit(onValid)}>
          <div className="flex">
            <InputWrap
              type="text"
              id="title"
              label="Title"
              watch={watch('title')}
              inputErrMsg={errors.title?.message}
              register={register('title', {
                required: '생성하실 보드의 제목을 입력하세요.',
                maxLength: {
                  value: 30,
                  message: '보드제목은 30자 이내여야 합니다.',
                },
              })}
            />
            <Avatar htmlFor="avatar">
              <BoardAvatarIcon />
              <input
                {...register('avatar')}
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
              />
            </Avatar>
          </div>
          <SelectWrap
            id="genre"
            label="Movie Genre"
            watch={watch('genre')}
            register={register('genre')}
            inputErrMsg={errors.genre?.message}
          />
          <TextAreaWrap
            id="intro"
            label="Intro"
            watch={watch('intro')}
            inputErrMsg={errors.intro?.message}
            placeholder="이 보드의 소개글을 작성해주세요."
            register={register('intro', {
              maxLength: {
                value: 100,
                message: '소개글은 100자 이내여야 합니다.',
              },
            })}
          />
          {data?.error && <ErrorMsg error={data.error} />}
          {errors.avatar && <ErrorMsg error={errors.avatar.message} />}
          <Btn type="submit" name="나의 보드 만들기" loading={avatarLoading} />
          <Info>
            <span>* Click the icon beside to add Background.</span>
            <span>* 보드의 배경을 추가하려면 아이콘을 클릭하세요.</span>
            <span>* 소개글은 100자 이내여야 합니다.</span>
          </Info>
        </Form>
      </Cont>
    </>
  );
};
const Cont = styled(FormCont)`
  form {
    gap: 25px;
  }
`;
const Avatar = styled(AvatarLabel)`
  /* border: 3px solid white; */
`;
