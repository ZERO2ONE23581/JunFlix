import useSWR from 'swr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MutationRes } from '../../../../../../src/types/mutation';
import useMutation from '../../../../../../src/libs/client/useMutation';
import { Input, Select } from '../../../../../../src/components/Input';
import { Btn } from '../../../../../../src/components/Button';
import { IGetReview, IReviewForm } from '../../../../../../src/types/review';
import { Errors, Page } from '../../../../../../styles/global';

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
  //
  return (
    <Page>
      <section className="edit-review-cont">
        <form onSubmit={handleSubmit(onValid)}>
          {response?.error && <Errors>{response?.error}</Errors>}
          <Input
            type="text"
            label="Title"
            name="title"
            errMsg={errors.title?.message}
            placeholder="제목을 작성해 주세요."
            register={register('title', {
              required: '제목을 작성해 주세요.',
            })}
          />
          <Input
            type="text"
            label="Movie Title"
            name="movieTitle"
            errMsg={errors.movieTitle?.message}
            placeholder="리뷰하는 영화제목을 작성해 주세요."
            register={register('movieTitle', {
              required: '리뷰하는 영화제목을 작성해 주세요.',
            })}
          />
          <Select
            name="genre"
            label="Movie Genre"
            errMsg={errors.genre?.message}
            placeholder="영화의 장르를 선택해주세요."
            register={register('genre', {
              required: '영화의 장르를 선택해주세요.',
            })}
          />
          <Avatar preview={preview} url={review?.avatar} />
          <Input
            type="file"
            name="avatar"
            label="Review Image"
            register={register('avatar')}
            errMsg={errors.avatar?.message}
          />
          <Input
            type="text"
            label="Review"
            name="content"
            errMsg={errors.content?.message}
            placeholder="내용을 작성해 주세요."
            register={register('content', {
              required: '내용을 작성해 주세요.',
              minLength: 20,
            })}
          />
          <Input
            type="text"
            label="한줄평"
            name="oneline"
            placeholder="한줄평을 적어보세요."
            errMsg={errors.oneline?.message}
            register={register('oneline', { maxLength: 50 })}
          />
          <Input
            label="별점 (최대 별 5개)"
            name="score"
            type="number"
            max={5}
            min={0}
            register={register('score')}
            errMsg={errors.oneline?.message}
            placeholder="영화 별점을 기록해주세요."
          />
          <Input
            type="checkbox"
            name="recommend"
            register={register('recommend')}
            label="이 영화를 추천한다면 체크하세요!"
            errMsg={errors.recommend?.message}
          />
          <Btn type="submit" btnName="리뷰 수정하기" loading={loading} />
        </form>
      </section>
    </Page>
  );
};

export default EditReview;
