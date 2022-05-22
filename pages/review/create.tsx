import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { Input, Select } from '../../src/components/Input';
import useMutation from '../../src/libs/client/useMutation';
import { CreateReviewRes, IReviewForm } from '../../src/types/review';
import {
  ErrMsg,
  ReviewForm,
  ReviewPageCont,
} from '../../styles/components/default';

const CreateReview: NextPage = () => {
  const router = useRouter();
  //Post
  const [createReview, { loading, data }] =
    useMutation<CreateReviewRes>(`/api/review/create`);
  //Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IReviewForm>({ mode: 'onSubmit' });
  const onValid = ({ title, movieTitle, genre, content }: IReviewForm) => {
    const titleCap = title.toUpperCase();
    if (loading) return;
    createReview({ titleCap, movieTitle, genre, content });
  };
  //After post
  useEffect(() => {
    if (data?.ok) {
      alert('새로운 리뷰를 생성하였습니다.');
      router.push('/review');
    }
  }, [data]);
  //
  return (
    <>
      <ReviewPageCont>
        <ReviewForm onSubmit={handleSubmit(onValid)}>
          {data?.error && <ErrMsg>{data?.error}</ErrMsg>}
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
            options={[
              'SF',
              'Drama',
              'Horror',
              'Comedy',
              'Fantasy',
              'Romance',
              'Action',
              'Mystery',
              'Thriller',
              'Others',
            ]}
            placeholder="영화의 장르를 선택해주세요."
            register={register('genre', {
              required: '영화의 장르를 선택해주세요.',
            })}
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
          <Btn type="submit" btnName="리뷰 작성하기" loading={loading} />
        </ReviewForm>
      </ReviewPageCont>
    </>
  );
};

export default CreateReview;
