import { Answer } from './Answer';
import styled from '@emotion/styled';
import { BoardAvatar } from './Avatar';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ErrorMsg } from '../../Style/ErrMsg';
import { InputWrap } from '../../Style/Input';
import { LoadingModal } from '../../LoadingModal';
import { Container } from '../../../../styles/global';
import { TextAreaWrap } from '../../Style/Input/TextArea';
import { SelectWrap } from '../../Style/Input/SelectWrap';
import useMutation from '../../../libs/client/useMutation';
import { IBoardForm, IBoardFormRes } from '../../../types/board';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Length } from '../../Tools';
import { IconBtn } from '../../Style/Button/IconBtn';

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
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onBlur' });
  //
  const [maxTitle] = useState(30);
  const [maxIntro] = useState(500);
  const [height, setHeight] = useState(40);
  useEffect(() => {
    const intro = watch!('intro');
    setHeight(intro?.length!);
  }, [setHeight, watch!('intro')]);
  //
  const onValid = async ({ title, genre, intro, avatar }: IBoardForm) => {
    if (loading) return;
    if (Length(watch!('title'))! === 0)
      return setError!('title', { message: '제목을 입력해주세요.' });
    if (Length(watch!('title'))! > maxTitle)
      return setError!('title', {
        message: `포스트 제목의 길이는 ${maxTitle}자 이하입니다.`,
      });
    if (Length(watch!('intro'))! > maxIntro)
      return setError!('intro', {
        message: `포스트 길이는 ${maxIntro}자 이하입니다.`,
      });
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
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok) {
      router.replace(
        `/user/${data.board.UserID}/board/${data.board.id}/${data.board.title}`
      );
    }
  }, [data, router]);
  return (
    <>
      {!Loading && (
        <form onSubmit={handleSubmit(onValid)}>
          <Cont>
            <h1>Create Board</h1>
            <Flex>
              <InputWrap
                id="title"
                type="text"
                label="Title"
                watch={watch('title')}
                register={register('title', {
                  required: '보드의 제목을 입력하세요.',
                })}
              />
              <SelectWrap
                id="genre"
                watch={watch('genre')}
                register={register('genre')}
              />
              <BoardAvatar
                register={register}
                isPreivew={isPreivew}
                setPreview={setPreview}
              />
              <IconBtn type="submit" svgType="save" size="2.6rem" />
            </Flex>
            <TextAreaWrap
              id="intro"
              height={height}
              register={register('intro')}
              placeholder="이 보드의 소개글을 작성해주세요."
            />
          </Cont>
        </form>
      )}
      {errors?.title && <ErrorMsg error={errors.title.message} />}
      {errors?.genre && <ErrorMsg error={errors.genre.message} />}
      {errors?.intro && <ErrorMsg error={errors.intro.message} />}
      {errors?.avatar && <ErrorMsg error={errors.avatar.message} />}

      {answer && (
        <Answer openModal={setAnswer} maxTitle={maxTitle} maxIntro={maxIntro} />
      )}
      {Loading && (
        <LoadingModal
          zIndex={100}
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
  .intro {
    textarea {
      border: none;
      font-size: 1.2rem;
      min-height: 100px;
      max-height: 400px;
      :focus {
        outline: none;
      }
    }
  }
`;
const Flex = styled.div`
  width: 100%;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .create-board {
    min-width: 100px;
  }
`;
