import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { BoardForm } from '../../src/types/board';
import { Input, Select } from '../../src/components/Input';
import useMutation from '../../src/libs/client/useMutation';
import { CreateBoardResponse } from '../../src/types/mutation';
import { CreateBoardModal } from '../../src/components/Modal/CreateBoardModal';
import { ErrMsg, Form, PageContainer } from '../../styles/components/default';
import { CreateReviewRes, ReviewForm } from '../../src/types/review';

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
  } = useForm<ReviewForm>({ mode: 'onSubmit' });
  const onValid = ({ title, movieTitle, genre, content }: ReviewForm) => {
    console.log(title, movieTitle, genre, content);
    return;
    if (loading) return;
    createReview({ title, movieTitle, genre, content });
  };
  //
  return (
    <>
      <PageContainer>
        <Form onSubmit={handleSubmit(onValid)}>
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
            register={register('genre')}
          />
          <Input
            type="text"
            label="Review"
            name="content"
            errMsg={errors.content?.message}
            placeholder="내용을 작성해 주세요."
            register={register('content', {
              minLength: 20,
            })}
          />
          <Btn type="submit" btnName="리뷰 작성하기" loading={loading} />
        </Form>
      </PageContainer>
    </>
  );
};

export default CreateReview;
