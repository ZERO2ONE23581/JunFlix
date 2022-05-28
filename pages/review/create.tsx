import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { IReviewForm } from '../../src/types/review';
import { MutationRes } from '../../src/types/mutation';
import { Input, Select } from '../../src/components/Input';
import useMutation from '../../src/libs/client/useMutation';
import { ErrMsg, PageCont } from '../../styles/components/default';
import { ThumNail } from '../../src/components/Post/AllPostsWithBoard';

const CreateReview: NextPage = () => {
  const router = useRouter();
  //Post
  const [createReview, { loading, data }] =
    useMutation<MutationRes>(`/api/review/create`);
  //Form
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
      alert('새로운 리뷰를 생성하였습니다.');
      router.push('/review');
    }
  }, [data, avatar, watch, router]);
  //
  return (
    <>
      <PageCont>
        <section className="create-review-cont">
          <form onSubmit={handleSubmit(onValid)}>
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
            <ThumNail>
              {preview ? (
                <img src={`${preview}`} alt="파일 업로드" />
              ) : (
                <img
                  className="noimage"
                  src="/img/noimage.svg"
                  alt="파일 업로드"
                />
              )}
            </ThumNail>
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
            <Btn type="submit" btnName="리뷰 작성하기" loading={loading} />
          </form>
        </section>
      </PageCont>
    </>
  );
};

export default CreateReview;
