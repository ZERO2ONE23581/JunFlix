import { Answer } from './Answer';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { useForm } from 'react-hook-form';
import { BoardAvatar } from './Avatar';
import { ErrorMsg } from '../../Style/ErrMsg';
import { InputWrap } from '../../Style/Input';
import { LoadingModal } from '../../LoadingModal';
import { FormCont } from '../../../../styles/global';
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
      setError('title', {
        message: `제목의 길이는 ${MaxTitle}이하여야 합니다.`,
      });
    if (IntroLength > MaxIntro)
      setError('intro', {
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

  //
  return (
    <>
      {!Loading ? (
        <form onSubmit={handleSubmit(onValid)}>
          <Cont>
            <h1>Create Board</h1>
            <Flex>
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
                register={register('genre', {
                  required: '보드 장르를 선택해주세요.',
                })}
              />
              <BoardAvatar
                register={register}
                isPreivew={isPreivew}
                setPreview={setPreview}
              />
            </Flex>
            <TextArea
              {...register('intro', {
                maxLength: {
                  value: MaxIntro,
                  message: `소개글은 ${MaxIntro}자 이내여야 합니다.`,
                },
              })}
              rows={4}
              name="intro"
              placeholder="이 보드의 소개글을 작성해주세요."
            />
            <div className="errors">
              {data?.error && <ErrorMsg error={data.error} />}
              {errors?.title && <ErrorMsg error={errors.title.message} />}
              {errors?.genre && <ErrorMsg error={errors.genre.message} />}
              {errors?.intro && <ErrorMsg error={errors.intro.message} />}
              {errors?.avatar && <ErrorMsg error={errors.avatar.message} />}
            </div>
            <Btn type="submit" name="보드생성" />
          </Cont>
        </form>
      ) : (
        <LoadingModal
          text={{ kor: '보드 생성중...', eng: 'Creating Board...' }}
        />
      )}
      {answer && (
        <Answer openModal={setAnswer} MaxTitle={MaxTitle} MaxIntro={MaxIntro} />
      )}
    </>
  );
};

const Cont = styled(FormCont)`
  margin: 0 auto;
  max-width: 500px;
  padding: 30px 40px;
  border-radius: 8px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    font-size: 1.4rem;
  }
  textarea {
    border: ${(p) => p.theme.border.thick};
    box-shadow: ${(p) => p.theme.boxShadow.input};
    :focus {
      outline: 2px solid ${(p) => p.theme.color.logo};
    }
  }
`;
const Flex = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  input,
  select {
    border-radius: 3px;
    border: ${(p) => p.theme.border.thick};
  }
  input {
    padding: 12px;
  }
  select {
    min-height: 45px;
    min-width: 120px;
  }
`;
