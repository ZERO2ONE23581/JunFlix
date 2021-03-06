import { useEffect, useState } from 'react';
import { SaveModal } from '../../Tools/Modal/review_create';
import { Avatar } from '../../Avatar';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useUser from '../../../libs/client/useUser';
import { IGetReview, IReviewForm } from '../../../types/review';
import { TextAreaWrap } from '../../Tools/Input/TextArea';
import useMutation from '../../../libs/client/useMutation';
import { Length } from '../../Tools/Tools';
import { Inputs } from '../Inputs';
import { Errors } from '../../Tools/Error';
import useSWR from 'swr';
import { MutationRes } from '../../../types/mutation';
import { ReviewCont } from '../Create';

export const EditReview = () => {
  const router = useRouter();
  const { user_id, review_id } = router.query;
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetReview>(
    user_id && review_id && `/api/user/${user_id}/review/${review_id}`
  );
  const review = data?.review;
  useEffect(() => {
    if (review) {
      if (review.title) setValue('title', review.title);
      if (review.movieTitle) setValue('movieTitle', review.movieTitle);
      if (review.genre) setValue('genre', review.genre);
      if (review.content) setValue('content', review.content);
      if (review.score) setValue('score', review.score);
      if (review.oneline) setValue('oneline', review.oneline);
      if (review.recommend) setValue('recommend', review.recommend);
    }
  }, [review]);

  const [EditReview, { loading, data: res }] = useMutation<MutationRes>(
    `/api/user/${user_id}/review/${review_id}/edit`
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
      return setError('title', { message: '??????????????? ??????????????????.' });
    if (TitleLen! > maxTitle)
      return setError('title', {
        message: `??????????????? ????????? ${maxTitle}??? ???????????????.`,
      });
    if (!MovieLen)
      return setError('movieTitle', { message: '??????????????? ??????????????????.' });
    if (MovieLen! > maxMovieTitle)
      return setError('movieTitle', {
        message: `??????????????? ????????? ${maxMovieTitle}??? ???????????????.`,
      });
    if (!CntLen)
      return setError('content', { message: '????????? ??????????????????.' });
    if (CntLen! <= 50)
      return setError('content', {
        message: `????????? ??????????????? 50??? ???????????????.`,
      });
    if (CntLen! > maxContent)
      return setError('content', {
        message: `????????? ??????????????? ${maxContent}??? ???????????????.`,
      });
    setSave(true);
  };
  const [removeBG, setRemoveBG] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : false;
  const [deleteBG, { loading: delLoading, data: delRes }] =
    useMutation<MutationRes>(
      `/api/user/${user_id}/review/${review_id}/delete/bg`
    );
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
    if (removeBG) return deleteBG({ avatar: '' });
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
      EditReview({
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
      EditReview({
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
    if (res?.error) alert(res.error);
    if (res?.ok) router.replace(`/user/${user_id}/review/${review_id}`);
  }, [res, router]);

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <ReviewCont>
          <h1>Edit Review</h1>
          <Inputs
            isEdit
            watch={watch}
            register={register}
            clickSave={clickSave}
            setRemoveBG={setRemoveBG}
            delData={{ data: delRes, loading: delLoading }}
          />
          <Avatar
            id="avatar"
            avatar={review?.avatar!}
            avatarWatch={watch('avatar')}
            register={register('avatar')}
          />
          <TextAreaWrap
            id="content"
            height={height}
            user={loggedInUser}
            watch={watch('content')}
            placeholder="?????? ????????????..."
            register={register('content')}
          />
        </ReviewCont>
        {save && (
          <SaveModal
            isEdit
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
