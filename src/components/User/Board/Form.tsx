import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../Style/Button';
import { ErrorMsg } from '../../Style/ErrMsg';
import { InputWrap } from '../../Style/Input';
import { AvatarLabel } from '../Avatar/Profile';
import { TextAreaWrap } from '../../Style/Input/TextArea';
import { SelectWrap } from '../../Style/Input/SelectWrap';
import useMutation from '../../../libs/client/useMutation';
import { BoardAvatarIcon } from '../../Style/Svg/BoardAvatar';
import { BoardFormCont, Form, Info } from '../../../../styles/global';
import {
  IGetBoard,
  IBoardForm,
  IBoardFormRes,
  IEditBoardFormProps,
} from '../../../types/board';

export const BoardForm = ({
  isEdit,
  isCreate,
  setAvatar,
  setPreview,
}: IEditBoardFormProps) => {
  const router = useRouter();
  const [api, setApi] = useState('');
  const { user_id, board_id } = router.query;
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [postFormData, { loading, data }] = useMutation<IBoardFormRes>(api);
  const {
    watch,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onSubmit' });
  const avatar = watch('avatar');
  const isValue = (type: string | any) => Boolean(getValues(type));
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
      return postFormData({ Title, intro, genre, avatar: id });
    } else {
      setAvatarLoading((p) => !p);
      return postFormData({ Title, intro, genre });
    }
  };
  const queryId = user_id && board_id;
  const { data: BoardData } = useSWR<IGetBoard>(
    queryId && `/api/user/${user_id}/board/${board_id}`
  );
  const board = BoardData?.board;
  useEffect(() => {
    if (board) {
      if (board.title) setValue('title', board.title.toUpperCase());
      if (board.genre) setValue('genre', board.genre);
      if (board.intro) setValue('intro', board.intro);
      setAvatar(board.avatar);
    }
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (user_id) {
      if (isCreate) {
        setApi(`/api/user/${user_id}/board/create`);
      }
      if (board_id && isEdit) {
        setApi(`/api/user/${user_id}/board/${board_id}/edit`);
      }
    }
    if (data?.ok) {
      if (isEdit && queryId) {
        alert('보드가 수정되었습니다.');
        router.replace(`/user/${user_id}/board/${board_id}`);
      }
      if (isCreate) {
        alert('보드를 생성하였습니다. 생성한 보드로 이동합니다.');
        router.replace(`/user/${data.board.UserID}/board/${data.board.id}`);
      }
    }
  }, [
    data,
    board,
    router,
    avatar,
    isEdit,
    setApi,
    user_id,
    board_id,
    isCreate,
    setValue,
  ]);
  return (
    <BoardFormCont>
      <h1>{isEdit ? 'Edit Board' : 'Create Board'}</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <div className="flex">
          <InputWrap
            id="title"
            type="text"
            label="Title"
            watch={watch('title')}
            isValue={isValue('title')}
            inputErrMsg={errors.title?.message}
            register={register('title', {
              required: '생성하실 보드의 제목을 입력하세요.',
              maxLength: {
                value: 20,
                message: '보드제목은 20자 이내여야 합니다.',
              },
            })}
          />
          <AvatarLabel htmlFor="avatar">
            <BoardAvatarIcon />
            <input
              {...register('avatar')}
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
            />
          </AvatarLabel>
        </div>
        <SelectWrap
          id="genre"
          label="Movie Genre"
          watch={watch('genre')}
          isValue={isValue('genre')}
          register={register('genre')}
          inputErrMsg={errors.genre?.message}
        />
        <TextAreaWrap
          id="intro"
          label="Intro"
          watch={watch('intro')}
          isValue={isValue('intro')}
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
        <Btn
          type="submit"
          name={isEdit ? '보드 수정하기' : '보드 만들기'}
          loading={avatarLoading}
        />
        <Info>
          <span>
            * Click the icon beside to {isEdit ? 'edit' : 'add'} Background.
          </span>
          <span>
            * 보드의 배경을 {isEdit ? '수정' : '추가'}하려면 아이콘을
            클릭하세요.
          </span>
          <span>* 보드제목은 20자 이내여야 합니다.</span>
          <span>* 소개글은 100자 이내여야 합니다.</span>
        </Info>
      </Form>
    </BoardFormCont>
  );
};
