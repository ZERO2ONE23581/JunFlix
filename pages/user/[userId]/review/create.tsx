import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useMutation from '../../../../src/libs/client/useMutation';
import { MutationRes } from '../../../../src/types/mutation';
import { IReviewForm } from '../../../../src/types/review';

import { Input, Select } from '../../../../src/components/Input';
import { ThumNail } from '../../../../src/components/Post/AllPostsWithBoard';
import { Btn } from '../../../../src/components/Button';
import { ErrMsg, PageCont } from '../../../../styles/default';

const Create_Review: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [createReview, { loading, data }] = useMutation<MutationRes>(
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
      alert('새로운 리뷰를 생성하였습니다.');
      router.push('/all/review');
    }
  }, [data, avatar, watch, router]);
  //
  return (
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
            register={register('genre', {
              required: '영화의 장르를 선택해주세요.',
            })}
            name="genre"
            label="Movie Genre"
            errMsg={errors.genre?.message}
            placeholder="영화의 장르를 선택해주세요."
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
            register={register('avatar')}
            type="file"
            name="avatar"
            label="Review Image"
            errMsg={errors.avatar?.message}
          />
          <Input
            register={register('content', {
              required: '영화리뷰를 작성해 주세요.',
              minLength: {
                value: 20,
                message: '리뷰는 최소 20자 이상이어야 합니다.',
              },
            })}
            type="text"
            label="Review"
            name="content"
            placeholder="내용을 작성해 주세요."
            errMsg={errors.content?.message}
          />
          <Input
            register={register('oneline', {
              maxLength: {
                value: 30,
                message: '한줄평은 30자 내외여야 합니다.',
              },
            })}
            type="text"
            label="한줄평"
            name="oneline"
            placeholder="한줄평을 적어보세요."
            errMsg={errors.oneline?.message}
          />
          <Input
            register={register('score')}
            label="별점 (최대 별 5개)"
            name="score"
            type="number"
            max={5}
            min={0}
            errMsg={errors.oneline?.message}
            placeholder="영화 별점을 기록해주세요."
          />
          <Input
            register={register('recommend')}
            type="checkbox"
            name="recommend"
            label="이 영화를 추천한다면 체크하세요!"
            errMsg={errors.recommend?.message}
          />
          <Btn type="submit" btnName="리뷰 작성하기" loading={loading} />
        </form>
      </section>
    </PageCont>
  );
};

export default Create_Review;
