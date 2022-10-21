import { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useUser from '../../libs/client/useUser';
import { IReviewForm } from '../../types/review';
import { TextAreaWrap } from '../../Tools/Input/TextArea';
import useMutation from '../../libs/client/useMutation';
import { Errors } from '../../Tools/Errors';
import { Box } from '../../../styles/global';
import { ITheme } from '../../../styles/theme';
import { IRes } from '../../types/global';

export const CreateReview = ({ theme }: ITheme) => {
  const router = useRouter();
  const { user_id } = router.query;
  const { loggedInUser } = useUser();
  const [CreateReview, { loading, data }] = useMutation<IRes>(
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
  const [maxTitle] = useState(50);
  const [maxContent] = useState(4000);
  const [maxMovieTitle] = useState(50);
  const [height, setHeight] = useState(40);

  const [save, setSave] = useState(false);

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

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <ReviewCont>
          <h1>Create Review</h1>

          <TextAreaWrap
            id="content"
            theme={theme}
            minHeight={200}
            watch={watch('content')}
            placeholder="리뷰 작성하기..."
            register={register('content')}
          />
        </ReviewCont>
      </form>
      <Errors errors={errors} />
    </>
  );
};
export const ReviewCont = styled(Box)`
  margin: 0;
  gap: 20px;
  padding: 0;
  border: none;
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
      min-height: 300px;
      max-height: 700px;
      border: ${(p) => p.theme.border.thick};
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
