import useSWR from 'swr';
import { Critic } from './Critic';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { SaveUpdate } from './SaveUpdate';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Avatar } from '../../Avatar/Avatar';
import { InputWrap } from '../../Style/Input';
import { ErrorMsg } from '../../Style/ErrMsg';
import useUser from '../../../libs/client/useUser';
import { ProfileAvatar } from '../../Avatar/Profile';
import { TextArea } from '../../Style/Input/TextArea';
import { MutationRes } from '../../../types/mutation';
import { SelectWrap } from '../../Style/Input/SelectWrap';
import useMutation from '../../../libs/client/useMutation';
import { IGetReview, IReviewForm } from '../../../types/review';

export const EditReview = () => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const { user_id, review_id } = router.query;
  const QueryId = user_id && review_id;
  //
  const { data: ReviewData } = useSWR<IGetReview>(
    QueryId && `/api/user/${user_id}/review/${review_id}`
  );
  const review = ReviewData?.review;
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
  //
  const [EditReview, { loading, data }] = useMutation<MutationRes>(
    `/api/user/${user_id}/review/${review_id}/edit`
  );
  const {
    watch,
    getValues,
    setValue,
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IReviewForm>({ mode: 'onSubmit' });
  const avatar = watch('avatar');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : null;
  const [saveEdit, setSaveEdit] = useState(false);

  const clickSave = () => {
    if (getValues('title') === '')
      return setError('title', { type: 'test', message: '제목을 입력하세요.' });
    if (getValues('movieTitle') === '')
      return setError('movieTitle', { message: '영화제목을 입력하세요.' });
    if (getValues('genre') === '')
      return setError('genre', { message: '영화 장르를 선택해 주세요.' });
    if (getValues('content') === '')
      return setError('content', {
        type: 'custom',
        message: '리뷰를 적어주세요',
      });
    if (getValues('content')!.length <= 50)
      return setError('content', {
        type: 'custom',
        message: '리뷰는 최소 50자 이상이어야 합니다.',
      });
    setSaveEdit(true);
  };
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
  //

  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }

    if (data?.ok) {
      router.replace(`/user/${user_id}/review/${review_id}`);
    }
  }, [, data, avatar, router, setPreview]);
  //
  const [isFocus, setIsFocus] = useState(false);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <h1>Edit Review</h1>
          <TopLayer>
            <InputWrap
              id="title"
              type="text"
              label="리뷰제목"
              watch={watch('title')}
              inputErrMsg={errors.title?.message}
              isValue={Boolean(getValues('title'))}
              register={register('title', {
                required: '제목을 작성해 주세요.',
                maxLength: {
                  value: 30,
                  message: '제목은 최대 30자이내 입니다.',
                },
              })}
            />
            <InputWrap
              id="movieTitle"
              type="text"
              label="영화제목"
              watch={watch('movieTitle')}
              inputErrMsg={errors.movieTitle?.message}
              isValue={Boolean(getValues('movieTitle'))}
              register={register('movieTitle', {
                required: '리뷰하는 영화제목을 작성해 주세요.',
                maxLength: {
                  value: 30,
                  message: '영화제목은 최대 30자이내 입니다.',
                },
              })}
            />
            <SelectWrap
              id="genre"
              watch={watch('genre')}
              inputErrMsg={errors.genre?.message}
              register={register('genre', {
                required: '영화의 장르를 선택해주세요.',
              })}
            />
            <Btn
              CLASSNAME="create-reivew-btn"
              type="button"
              name="SAVE"
              onClick={clickSave}
            />
          </TopLayer>
          {errors.content && <ErrorMsg error={errors.content.message} />}

          <Avatar
            url={review?.avatar}
            preview={preview}
            register={register('avatar')}
            size={{ width: '100vw', height: '66vh' }}
          />

          <div className="flex">
            <span>* 새로운 사진을 업로드하려면 기존 사진을 클릭하세요.</span>
            <span>(click the original picture to post a new one.)</span>
          </div>

          <ContentInput isFocus={isFocus}>
            <Profile>
              <ProfileAvatar size={'3em'} url={loggedInUser?.avatar} />
              <div>
                <span>{loggedInUser?.username}</span>
                <span>'s Review</span>
              </div>
            </Profile>
            <TextArea
              {...register('content', {
                required: '영화리뷰를 작성해 주세요.',
                minLength: {
                  value: 50,
                  message: '리뷰는 최소 50자 이상이어야 합니다.',
                },
              })}
              rows={10}
              id="content"
              name="content"
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />
          </ContentInput>
          <Critic register={register} />
        </Cont>

        {saveEdit && (
          <SaveUpdate
            data={data}
            loading={Loading}
            closeModal={setSaveEdit}
            errors={{
              data: data?.error,
              title: errors.title?.message,
              movieTitle: errors.movieTitle?.message,
              genre: errors.genre?.message,
              content: errors.content?.message,
              score: errors.score?.message,
              oneline: errors.oneline?.message,
              recommend: errors.recommend?.message,
            }}
          />
        )}
      </form>
    </>
  );
};
const Cont = styled.section`
  padding: 20px 30px;
  padding-bottom: 50px;
  border-radius: 5px;
  border: 1px solid #636e72;
  h1 {
    font-size: 1.6rem;
    padding-bottom: 20px;
  }
  .thumnail-avatar {
    margin-top: 20px;
  }
  .flex {
    gap: 20px;
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 15px 0;
    font-size: 1rem;
    font-style: italic;
    opacity: 0.7;
  }
`;
const ContentInput = styled.div<{ isFocus: boolean }>`
  padding: 20px;
  border-radius: 5px;
  border: ${(p) =>
    p.isFocus ? `2px solid ${p.theme.color.logo}` : p.theme.border.thin};
  textarea {
    font-size: 1.2rem;
  }
`;
const TopLayer = styled.article`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  select,
  input {
    border: ${(p) => p.theme.border.thick};
  }
  select {
    padding: 15px;
  }
  .create-reivew-btn {
    width: auto;
  }
`;
const Profile = styled.article`
  gap: 10px;
  display: flex;
  align-items: center;
  opacity: 0.8;
  font-style: italic;
  font-size: 1rem;
`;
