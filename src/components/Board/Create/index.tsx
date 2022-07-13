import { Answer } from './Answer';
import styled from '@emotion/styled';
import { BoardAvatar } from './Avatar';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { useForm } from 'react-hook-form';
import { ErrorMsg } from '../../Style/ErrMsg';
import { InputWrap } from '../../Style/Input';
import { LoadingModal } from '../../LoadingModal';
import { Container } from '../../../../styles/global';
import { TextArea } from '../../Style/Input/TextArea';
import { SelectWrap } from '../../Style/Input/SelectWrap';
import useMutation from '../../../libs/client/useMutation';
import { IBoardForm, IBoardFormRes } from '../../../types/board';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ICreateBoard {
  answer: boolean;
  isPreivew: boolean;
  setAnswer: Dispatch<SetStateAction<boolean>>;
  setPreview: Dispatch<SetStateAction<string>>;
}
export const CreateBoard = ({
  answer,
  isPreivew,
  setAnswer,
  setPreview,
}: ICreateBoard) => {
  const router = useRouter();
  const { user_id } = router.query;
  const [CreateBoard, { loading, data }] = useMutation<IBoardFormRes>(
    `/api/user/${user_id}/board/create`
  );
  const {
    watch,
    register,
    setError,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onBlur' });
  //
  const [MaxTitle] = useState(30);
  const [MaxIntro] = useState(200);
  const TitleLength = watch('title')?.toString().replace(/\s/gi, '')?.length;
  const IntroLength = watch('intro')?.toString().replace(/\s/gi, '')?.length;
  //
  const onValid = async ({ title, genre, intro, avatar }: IBoardForm) => {
    if (loading) return;
    //
    if (TitleLength > MaxTitle)
      return setError('title', {
        message: `제목의 길이는 ${MaxTitle}이하여야 합니다.`,
      });
    if (IntroLength > MaxIntro)
      return setError('intro', {
        message: `소개글의 길이는 ${MaxIntro}이하여야 합니다.`,
      });
    //
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
  const avatar = watch('avatar');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : null;
  const isValue = (type: string | any) => Boolean(getValues(type));

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
  //
  return (
    <>
      {!Loading && (
        <form onSubmit={handleSubmit(onValid)}>
          <Cont>
            <h1>Create Board</h1>
            <Wrap>
              <InputWrap
                id="title"
                type="text"
                label="Title"
                watch={watch('title')}
                isValue={isValue('title')}
                register={register('title', {
                  required: '보드의 제목을 입력하세요.',
                })}
              />
              <SelectWrap
                id="genre"
                genre={watch('genre')}
                register={register('genre')}
              />
              <BoardAvatar
                register={register}
                isPreivew={isPreivew}
                setPreview={setPreview}
              />
              <Btn type="submit" name="보드 만들기" CLASSNAME="create-board" />
            </Wrap>
            <Intro
              {...register('intro')}
              rows={4}
              name="intro"
              placeholder="이 보드의 소개글을 작성해주세요."
            />
            <>
              {data?.error && <ErrorMsg error={data.error} />}
              {errors?.title && <ErrorMsg error={errors.title.message} />}
              {errors?.genre && <ErrorMsg error={errors.genre.message} />}
              {errors?.intro && <ErrorMsg error={errors.intro.message} />}
              {errors?.avatar && <ErrorMsg error={errors.avatar.message} />}
            </>
          </Cont>
        </form>
      )}
      {answer && (
        <Answer openModal={setAnswer} MaxTitle={MaxTitle} MaxIntro={MaxIntro} />
      )}
      {Loading && (
        <LoadingModal
          zIndex={99}
          text={{ kor: '보드 생성중...', eng: 'Creating Board...' }}
        />
      )}
    </>
  );
};

const Cont = styled(Container)`
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    font-size: 1.8rem;
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }
`;
const Intro = styled(TextArea)`
  border: ${(p) => p.theme.border.thick};
  box-shadow: ${(p) => p.theme.boxShadow.input};
  :focus {
    outline: 2px solid ${(p) => p.theme.color.logo};
  }
`;
const Wrap = styled.div`
  width: 70%;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .create-board {
    min-width: 100px;
  }
`;
