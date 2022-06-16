import {
  Errors,
  Form,
  FormCont,
  Input,
  Page,
  Select,
} from '../../../../../styles/global';
import type { NextPage } from 'next';
import { Review } from '@prisma/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../../../../src/components/Style/Button';
import { IReviewForm } from '../../../../../src/types/review';
import useMutation from '../../../../../src/libs/client/useMutation';
import { ThumnailAvatar } from '../../../../../src/components/User/Avatar/ThumnailAvatar';

interface ICreateReviewRes {
  ok: boolean;
  error?: string;
  review?: Review;
}

const Create_Review: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [createReview, { loading, data }] = useMutation<ICreateReviewRes>(
    `/api/user/${userId}/review/create`
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
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
      const { uploadURL } = await (await fetch(`/api/file`)).json(); //GET
      const form = new FormData();
      form.append('file', avatar[0]);
      //POST
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
        Title,
        movieTitle,
        genre,
        content,
        score,
        oneline,
        recommend,
      });
    } else {
      createReview({
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
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
    if (data?.ok) {
      alert('새로운 리뷰를 생성하였습니다. 생성한 리뷰로 이동합니다.');
      router.push(`/user/${data.review?.UserID}/review/${data.review?.id}`);
    }
  }, [data, avatar, watch, router]);
  //
  return (
    <Page>
      <FormCont>
        <h1>Create Review</h1>
        <Form onSubmit={handleSubmit(onValid)}>
          <label htmlFor="title" />
          <Input
            {...register('title', {
              required: '제목을 작성해 주세요.',
            })}
            type="text"
            id="title"
            name="title"
            placeholder="Title"
          />
          {errors.title && <Errors>{errors.title?.message}</Errors>}

          <label htmlFor="movieTitle" />
          <Input
            {...register('movieTitle', {
              required: '리뷰하는 영화제목을 작성해 주세요.',
            })}
            type="text"
            id="movieTitle"
            name="movieTitle"
            placeholder="Movie Title"
          />
          {errors.movieTitle && <Errors>{errors.movieTitle?.message}</Errors>}

          <label htmlFor="genre" />
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

          <ThumnailAvatar preview={preview} />
          <input type="file" {...register('avatar')} />

          <label htmlFor="content" />
          <Input
            {...register('content', {
              required: '영화리뷰를 작성해 주세요.',
              minLength: {
                value: 20,
                message: '리뷰는 최소 20자 이상이어야 합니다.',
              },
            })}
            type="text"
            id="content"
            name="content"
            placeholder="content"
          />
          {errors.content && <Errors>{errors.content?.message}</Errors>}

          <label htmlFor="oneline" />
          <Input
            {...register('oneline', {
              maxLength: {
                value: 30,
                message: '한줄평은 30자 내외여야 합니다.',
              },
            })}
            type="text"
            id="oneline"
            name="oneline"
            placeholder="oneline"
          />
          {errors.oneline && <Errors>{errors.oneline?.message}</Errors>}

          <label htmlFor="score" />
          <Input
            {...register('score')}
            type="number"
            max={5}
            min={0}
            id="score"
            name="score"
            placeholder="score"
          />
          {errors.score && <Errors>{errors.score?.message}</Errors>}

          <label htmlFor="recommend" />
          <Input
            {...register('recommend')}
            type="checkbox"
            id="recommend"
            name="recommend"
            placeholder="recommend"
          />
          {errors.recommend && <Errors>{errors.recommend?.message}</Errors>}

          <Btn type="submit" name="리뷰 작성하기" loading={loading} />
          {data?.error && <Errors>{data?.error}</Errors>}
        </Form>
      </FormCont>
    </Page>
  );
};
export default Create_Review;
