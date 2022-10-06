import { Title } from './Title';
import { Inputs } from './Inputs';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { LoadingModal } from '../../../Tools/Modal/Loading';
import { TextAreaWrap } from '../../../Tools/Input/TextArea';
import useMutation from '../../../libs/client/useMutation';
import { IBoardForm, IBoardFormRes } from '../../../types/board';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLength } from '../../../libs/client/useTools';
import { Errors } from '../../../Tools/Errors';
import { Box } from '../../../../styles/global';

interface ICreateBoard {
  isPreview: boolean;
  setPreview: Dispatch<SetStateAction<string>>;
}
export const CreateBoard = ({ isPreview, setPreview }: ICreateBoard) => {
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
  const [maxIntro] = useState(1000);
  const [height, setHeight] = useState(40);
  useEffect(() => {
    const intro = watch!('intro');
    setHeight(intro?.length * 0.2);
  }, [setHeight, watch!('intro')]);
  //
  const onValid = async ({ title, genre, intro, avatar }: IBoardForm) => {
    if (loading) return;
    if (useLength(watch!('title'))! === 0)
      return setError!('title', { message: '제목을 입력해주세요.' });
    if (useLength(watch!('title'))! > maxTitle)
      return setError!('title', {
        message: `포스트 제목의 길이는 ${maxTitle}자 이하입니다.`,
      });
    if (useLength(watch!('intro'))! > maxIntro)
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
  const [answer, setAnswer] = useState(false);
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Cont isAvatar={Boolean(avatar?.length! > 0)}>
        <Title
          answer={answer}
          maxTitle={maxTitle}
          maxIntro={maxIntro}
          setAnswer={setAnswer}
        />
        <Inputs
          watch={watch}
          register={register}
          isPreview={isPreview}
          setPreview={setPreview}
        />
        <TextAreaWrap
          id="intro"
          height={height}
          register={register('intro')}
          placeholder="이 보드의 소개글을 작성해주세요."
        />
      </Cont>
      <Errors errors={errors} />
      {Loading && <LoadingModal zIndex={100} type="create-board" />}
    </form>
  );
};
const Cont = styled(Box)<{ isAvatar: boolean }>`
  margin: 0;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: ${(p) => !p.isAvatar && p.theme.border.thick};
  .intro {
    textarea {
      border: none;
      font-size: 1.2rem;
      min-height: 150px;
      max-height: 400px;
      :focus {
        outline: none;
      }
    }
  }
`;
