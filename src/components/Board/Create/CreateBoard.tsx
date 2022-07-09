import {
  IBoardForm,
  IBoardFormRes,
  IEditBoardFormProps,
} from '../../../types/board';
import { Answer } from './Answer';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { Svg } from '../../Style/Svg/Svg';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ErrorMsg } from '../../Style/ErrMsg';
import { InputWrap } from '../../Style/Input';
import { LoadingModal } from '../../LoadingModal';
import { AvatarLabel } from '../../Avatar/ProfileAvatar';
import { FormCont, Info } from '../../../../styles/global';
import { SelectWrap } from '../../Style/Input/SelectWrap';
import { TextAreaWrap } from '../../Style/Input/TextArea';
import useMutation from '../../../libs/client/useMutation';
import { IconBtnFixed } from '../../Style/Button/IconBtnFixed';

export const CreateBoard = ({ isCreate, setPreview }: IEditBoardFormProps) => {
  const router = useRouter();
  const { user_id } = router.query;
  const [CreateBoard, { loading, data }] = useMutation<IBoardFormRes>(
    `/api/user/${user_id}/board/create`
  );
  const {
    watch,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onSubmit' });
  //
  const avatar = watch('avatar');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : null;
  const isValue = (type: string | any) => Boolean(getValues(type));
  //
  const onValid = async ({ title, genre, intro, avatar }: IBoardForm) => {
    if (loading) return;
    if (avatar && avatar.length > 0) {
      setAvatarLoading((p) => !p);
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
      CreateBoard({ title, intro, genre, avatar: id });
      setAvatarLoading((p) => !p);
    } else {
      CreateBoard({ title, intro, genre });
    }
  };
  //
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (data?.error) alert(data.error);
    if (data?.ok) {
      router.replace(
        `/user/${data.board.UserID}/board/${data.board.id}/${data.board.title}`
      );
    }
  }, [data, router, avatar]);
  const [question, setQuestion] = useState(false);
  //
  return (
    <>
      {!Loading ? (
        <form onSubmit={handleSubmit(onValid)}>
          <Cont>
            <h1>Create Board</h1>
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
                  value: 30,
                  message: '보드제목은 30자 이내여야 합니다.',
                },
              })}
            />
            <SelectWrap
              id="genre"
              watch={watch('genre')}
              isValue={isValue('genre')}
              register={register('genre', {
                required: '보드 장르를 선택해주세요.',
              })}
              inputErrMsg={errors.genre?.message}
            />
            <TextAreaWrap
              id="intro"
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
            <Avatar>
              <Info>
                <span>* 보드의 사진을 추가하려면 아이콘을 클릭해주세요.</span>
                <span>
                  * Please click the icon beside to add photo on your BOARD.
                </span>
              </Info>
              <AvatarLabel htmlFor="avatar">
                <Svg type="file-upload" />
                <input
                  {...register('avatar')}
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                />
              </AvatarLabel>
            </Avatar>
            {data?.error && <ErrorMsg error={data.error} />}
            {errors.avatar && <ErrorMsg error={errors.avatar.message} />}
            <Btn type="submit" name="보드생성" />
          </Cont>
        </form>
      ) : (
        <LoadingModal
          text={{ kor: '보드 생성중...', eng: 'Creating Board...' }}
        />
      )}
      <IconBtnFixed
        type="button"
        svgType="question"
        isClicked={question}
        onClick={() => setQuestion(true)}
      />
      {question && <Answer openModal={setQuestion} />}
    </>
  );
};

const Cont = styled(FormCont)`
  min-width: 600px;
  padding: 30px 50px;
  border-radius: 5px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    font-size: 1.4rem;
  }
  input,
  select,
  textarea {
    border: ${(p) => p.theme.border.thin};
  }
  select {
    width: 100%;
    padding: 15px;
  }
  textarea {
  }
`;
const Avatar = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
