import { useEffect, useState } from 'react';
import { SaveModal } from './Modal';
import styled from '@emotion/styled';
import { Avatar } from '../../Avatar';
import { Review } from '@prisma/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useUser from '../../../libs/client/useUser';
import { IReviewForm } from '../../../types/review';
import { Container } from '../../../../styles/global';
import { TextAreaWrap } from '../../Style/Input/TextArea';
import useMutation from '../../../libs/client/useMutation';
import { Length } from '../../Tools';
import { Inputs } from './Inputs';
import { Errors } from './Error';

interface ICreateReviewRes {
  ok: boolean;
  error?: string;
  review?: Review;
}
export const CreateReview = () => {
  const router = useRouter();
  const { user_id } = router.query;
  const { loggedInUser } = useUser();
  const [CreateReview, { loading, data }] = useMutation<ICreateReviewRes>(
    `/api/user/${user_id}/review/create`
  );
  const {
    watch,
    register,
    setValue,
    setError,
    getValues,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IReviewForm>({ mode: 'onSubmit' });
  const [maxTitle] = useState(30);
  const [maxContent] = useState(4000);
  const [maxMovieTitle] = useState(30);
  const [height, setHeight] = useState(40);
  useEffect(() => {
    const content = watch!('content');
    setHeight(content?.length! * 0.2);
  }, [setHeight, watch!('content')]);
  const TitleLen = Length(watch('title'));
  const CntLen = Length(watch('content'));
  const MovieLen = Length(watch('movieTitle'));
  useEffect(() => {
    if (TitleLen! !== 0 && TitleLen! < maxTitle) clearErrors('title');
    if (MovieLen! !== 0 && MovieLen! < maxMovieTitle) clearErrors('movieTitle');
    if (CntLen! > 50 && CntLen! < maxContent) clearErrors('content');
  }, [
    CntLen,
    TitleLen,
    MovieLen,
    maxTitle,
    maxContent,
    clearErrors,
    maxMovieTitle,
  ]);
  const [save, setSave] = useState(false);
  const clickSave = () => {
    if (!TitleLen)
      return setError('title', { message: '리뷰제목을 입력해주세요.' });
    if (TitleLen! > maxTitle)
      return setError('title', {
        message: `리뷰제목의 길이는 ${maxTitle}자 이하입니다.`,
      });
    if (!MovieLen)
      return setError('movieTitle', { message: '영화제목을 입력해주세요.' });
    if (MovieLen! > maxMovieTitle)
      return setError('movieTitle', {
        message: `영화제목의 길이는 ${maxMovieTitle}자 이하입니다.`,
      });
    if (!CntLen)
      return setError('content', { message: '리뷰를 입력해주세요.' });
    if (CntLen! <= 50)
      return setError('content', {
        message: `리뷰의 최소길이는 50자 이상입니다.`,
      });
    if (CntLen! > maxContent)
      return setError('content', {
        message: `리뷰의 최대길이는 ${maxContent}자 이하입니다.`,
      });
    setSave(true);
  };
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : false;
  const onValid = async ({
    title,
    genre,
    score,
    avatar,
    oneline,
    content,
    recommend,
    movieTitle,
  }: IReviewForm) => {
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
      CreateReview({
        avatar: id,
        title,
        movieTitle,
        genre,
        content,
        score,
        oneline,
        recommend,
      });
      setAvatarLoading((p) => !p);
    } else {
      CreateReview({
        title,
        movieTitle,
        genre,
        content,
        score,
        oneline,
        recommend,
      });
    }
  };
  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok && data.review)
      router.replace(`/user/${data.review.UserID}/review/${data.review.id}`);
  }, [data, router]);

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <ReviewCont>
          <h1>Create Review</h1>
          <Inputs watch={watch} register={register} clickSave={clickSave} />
          <Avatar
            id="avatar"
            avatarWatch={watch('avatar')}
            register={register('avatar')}
          />
          <TextAreaWrap
            id="content"
            height={height}
            user={loggedInUser}
            watch={watch('content')}
            placeholder="리뷰 작성하기..."
            register={register('content')}
          />
        </ReviewCont>
        {save && (
          <SaveModal
            watch={watch}
            loading={Loading}
            setSave={setSave}
            setError={setError}
            register={register}
            setValue={setValue}
            getValues={getValues}
            clearErrors={clearErrors}
          />
        )}
      </form>
      <Errors errors={errors} />
    </>
  );
};
export const ReviewCont = styled(Container)`
  gap: 20px;
  padding: 0;
  display: flex;
  box-shadow: none;
  flex-direction: column;
  justify-content: center;
  h1 {
    font-size: 1.8rem;
    margin-top: 20px;
  }
  .avatar {
    label {
      border-right: none;
    }
    .isImageTag,
    .isPreivewTag,
    .noImageDiv {
      width: 80vw;
      min-height: 500px;
      border: ${(p) => p.theme.border.thick};
      box-shadow: ${(p) => p.theme.boxShadow.nav};
    }
  }
  .content {
    textarea {
      min-height: 300px;
      max-height: 500px;
      font-size: 1.2rem;
      :focus {
        outline: none;
      }
    }
  }
`;
