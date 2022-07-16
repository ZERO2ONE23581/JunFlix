import { Info } from './Info';
import { useEffect } from 'react';
import { SaveReivew } from './Save';
import styled from '@emotion/styled';
import { Avatar } from '../../Avatar';
import { Review } from '@prisma/client';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { useForm } from 'react-hook-form';
import { CreatePreivew } from './Preview';
import { ComputeLength } from '../../Tools';
import { InputWrap } from '../../Style/Input';
import { ErrorMsg } from '../../Style/ErrMsg';
import { TextAreaHeight } from './TextAreaHeight';
import useUser from '../../../libs/client/useUser';
import { IReviewForm } from '../../../types/review';
import { IconBtn } from '../../Style/Button/IconBtn';
import { Container } from '../../../../styles/global';
import { TextAreaWrap } from '../../Style/Input/TextArea';
import { SelectWrap } from '../../Style/Input/SelectWrap';
import useMutation from '../../../libs/client/useMutation';

interface ICreateReviewRes {
  ok: boolean;
  error?: string;
  review?: Review;
}
export const CreateReview = () => {
  const router = useRouter();
  const { user_id } = router.query;
  const { loggedInUser } = useUser();
  const {
    watch,
    register,
    setValue,
    setError,
    getValues,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IReviewForm>({ mode: 'onChange' });
  //
  const [createReview, { loading, data }] = useMutation<ICreateReviewRes>(
    `/api/user/${user_id}/review/create`
  );
  const [
    preview,
    Loading,
    openAvatar,
    setPreview,
    setOpenAvatar,
    setAvatarLoading,
  ] = CreatePreivew(watch, loading);

  const [clickSave, setSave, save, height, minHeight, maxHeight] =
    TextAreaHeight(watch, setError, clearErrors);

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
      createReview({
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
      createReview({
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
    if (data?.ok && data.review)
      router.replace(`/user/${data.review.UserID}/review/${data.review.id}`);
  }, [data, router]);
  //
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont isPreview={Boolean(preview)}>
          <h1>Create Review</h1>
          <Flex>
            <InputWrap
              id="title"
              type="text"
              label="Review Title"
              watch={watch('title')}
              register={register('title')}
            />
            <InputWrap
              type="text"
              id="movieTitle"
              label="Movie Title"
              watch={watch('movieTitle')}
              register={register('movieTitle')}
            />
            <SelectWrap
              id="genre"
              watch={watch('genre')}
              register={register('genre')}
            />
            <IconBtn
              size="2rem"
              type="button"
              svgType="file-upload"
              isClicked={Boolean(preview)}
              onClick={() => setOpenAvatar(true)}
            />
            <IconBtn
              size="2rem"
              type="button"
              svgType="undo"
              onClick={() => {
                setPreview('');
                setOpenAvatar(false);
              }}
            />
          </Flex>
          <>
            {data?.error && <ErrorMsg error={data?.error} />}
            {errors.title && <ErrorMsg error={errors.title.message} />}
            {errors.content && <ErrorMsg error={errors.content.message} />}
            {errors.movieTitle && (
              <ErrorMsg error={errors.movieTitle.message} />
            )}
          </>
          {openAvatar && (
            <Avatar
              avatar=""
              id="avatar"
              preview={preview}
              register={register('avatar')}
              size={{ width: '60vw', height: '60vh' }}
            />
          )}
          <TextAreaWrap
            id="content"
            height={height}
            user={loggedInUser}
            minHeight={minHeight}
            maxHeight={maxHeight}
            watch={watch('content')}
            placeholder="리뷰 작성하기..."
            register={register('content', {
              required: '리뷰를 작성해주세요.',
            })}
          />
          <Flex>
            <Info />
            <Btn type="button" name="SAVE" onClick={clickSave} />
          </Flex>
        </Cont>

        {save && (
          <SaveReivew
            watch={watch}
            loading={Loading}
            setSave={setSave}
            setError={setError}
            register={register}
            setValue={setValue}
            getValues={getValues}
            clearErrors={clearErrors}
            OneLineError={errors.oneline?.message}
          />
        )}
      </form>
    </>
  );
};
const Cont = styled(Container)<{ isPreview: boolean }>`
  padding: 0;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: none;
  h1 {
    font-size: 1.8rem;
    margin-top: 20px;
  }
  .avatar {
    label {
      box-shadow: ${(p) => p.theme.boxShadow.nav};
      border: ${(p) => !p.isPreview && p.theme.border.thin};
    }
  }
  .content {
    border: 1px solid #dfe6e9;
    textarea {
      font-size: 1.1rem;
    }
  }
`;
const Flex = styled.article`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  label {
    padding: 10px;
  }
  input {
    padding: 11px 20px;
  }
  .upload {
    gap: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
