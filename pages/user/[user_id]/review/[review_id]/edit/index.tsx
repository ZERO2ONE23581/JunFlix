import {
  Errors,
  Form,
  FormCont,
  Input,
  Page,
  Select,
} from '../../../../../../styles/global';
import useSWR from 'swr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MutationRes } from '../../../../../../src/types/mutation';
import useMutation from '../../../../../../src/libs/client/useMutation';
import { Btn } from '../../../../../../src/components/Style/Button';
import { IGetReview, IReviewForm } from '../../../../../../src/types/review';
import { ThumnailAvatar } from '../../../../../../src/components/User/Avatar/ThumnailAvatar';

const EditReview: NextPage = () => {
  const router = useRouter();
  const { user_id, review_id } = router.query;
  const queryId = user_id && review_id;
  const { data } = useSWR<IGetReview>(
    queryId && `/api/user/${user_id}/review/${review_id}`
  );
  const review = data?.review;
  const [editReview, { loading, data: response }] = useMutation<MutationRes>(
    `/api/user/${user_id}/review/${review?.id}/edit`
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IReviewForm>({ mode: 'onSubmit' });

  const avatar = watch('avatar');
  const onValid = async ({
    avatar,
    title,
    movieTitle,
    genre,
    content,
    score,
    oneline,
    recommend,
  }: IReviewForm) => {
    if (loading) return;
    const Title = title.toUpperCase();
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
      editReview({
        avatar: id,
        Title,
        movieTitle,
        genre,
        content,
        score,
        oneline,
        recommend,
      });
    } else {
      editReview({
        Title,
        movieTitle,
        genre,
        content,
        score,
        oneline,
        recommend,
      });
    }
  };
  //
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (data?.ok && review) {
      if (review.title) setValue('title', review.title);
      if (review.movieTitle) setValue('movieTitle', review.movieTitle);
      if (review.genre) setValue('genre', review.genre);
      if (review.content) setValue('content', review.content);
      if (review.score) setValue('score', review.score);
      if (review.oneline) setValue('oneline', review.oneline);
      if (review.recommend) setValue('recommend', review.recommend);
    }
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (response?.ok) {
      alert('리뷰를 수정했습니다.');
      router.push('/all/reviews');
    }
  }, [setValue, avatar, watch, data, response]);
  return (
    <Page>
      <FormCont>
        <Form onSubmit={handleSubmit(onValid)}>
          <label htmlFor="title" />
          <Input
            {...register('title', {
              required: '제목을 작성해 주세요.',
            })}
            type="text"
            id="title"
            name="title"
            placeholder="제목을 작성해 주세요."
          />
          {errors.title && <Errors>{errors.title.message}</Errors>}

          <label htmlFor="movieTitle" />
          <Input
            {...register('movieTitle', {
              required: '리뷰하는 영화제목을 작성해 주세요.',
            })}
            type="text"
            id="movieTitle"
            name="movieTitle"
            placeholder="리뷰하는 영화제목을 작성해 주세요."
          />
          {errors.movieTitle && <Errors>{errors.movieTitle.message}</Errors>}

          <Select
            {...register('genre', {
              required: '영화의 장르를 선택해주세요.',
            })}
            id="genre"
            name="genre"
            placeholder="Movie Title"
          >
            <option value="">장르를 선택해주세요.</option>
            <option value="SF">SF</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Comedy">Comedy</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Thriller">Thriller</option>
          </Select>
          {errors.genre && <Errors>{errors.genre?.message}</Errors>}

          <ThumnailAvatar preview={preview} url={review?.avatar} />
          <label htmlFor="avatar" />
          <Input
            {...register('avatar')}
            type="file"
            id="avatar"
            name="avatar"
          />
          {errors.avatar && <Errors>{errors.avatar.message}</Errors>}

          <label htmlFor="content" />
          <Input
            {...register('content', {
              required: '내용을 작성해 주세요.',
              minLength: 20,
            })}
            type="text"
            id="content"
            name="content"
            placeholder="내용을 작성해 주세요."
          />
          {errors.content && <Errors>{errors.content.message}</Errors>}

          <label htmlFor="oneline" />
          <Input
            {...register('oneline', { maxLength: 50 })}
            type="text"
            name="oneline"
            placeholder="한줄평을 적어보세요."
          />
          {errors.oneline && <Errors>{errors.oneline.message}</Errors>}

          <label htmlFor="score" />
          <Input
            {...register('score')}
            id="score"
            name="score"
            type="number"
            max={5}
            min={0}
            placeholder="영화 별점을 기록해주세요."
          />
          {errors.score && <Errors>{errors.score.message}</Errors>}

          <label htmlFor="recommend" />
          <Input
            {...register('recommend')}
            type="checkbox"
            id="recommend"
            name="recommend"
          />
          {errors.recommend && <Errors>{errors.recommend.message}</Errors>}

          {response?.error && <Errors>{response?.error}</Errors>}
          <Btn type="submit" name="리뷰 수정하기" loading={loading} />
        </Form>
      </FormCont>
    </Page>
  );
};

export default EditReview;
