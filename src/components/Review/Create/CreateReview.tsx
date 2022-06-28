import styled from '@emotion/styled';
import { Review } from '@prisma/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../Style/Button';
import { SubmitReview } from './SubmitReview';
import { InputWrap } from '../../Style/Input';
import { ErrorMsg } from '../../Style/ErrMsg';
import { AvatarInput } from '../../Avatar/AvatarInput';
import { IReviewForm } from '../../../types/review';
import { SelectWrap } from '../../Style/Input/SelectWrap';
import useMutation from '../../../libs/client/useMutation';
import { TextArea, TextAreaWrap } from '../../Style/Input/TextArea';
import { IconBtn } from '../../Style/Button/IconBtn';
import { Svg } from '../../Style/Svg/Svg';
import useUser from '../../../libs/client/useUser';
import { ProfileAvatar } from '../../Avatar/Profile';

interface ICreateReviewRes {
  ok: boolean;
  error?: string;
  review?: Review;
}
export const CreateReview = () => {
  const router = useRouter();
  const { user_id } = router.query;
  const { loggedInUser } = useUser();
  const {
    watch,
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<IReviewForm>({ mode: 'onChange' });
  const avatar = watch('avatar');
  //
  const [createReview, { loading, data }] = useMutation<ICreateReviewRes>(
    `/api/user/${user_id}/review/create`
  );
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : null;
  const [submit, setSubmit] = useState(false);
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
    setSubmit(true);
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
      createReview({
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
      createReview({
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
      alert('새로운 리뷰를 생성하였습니다. 생성한 리뷰로 이동합니다.');
      router.push(`/user/${data.review?.UserID}/review/${data.review?.id}`);
    }
  }, [data, avatar, watch, router]);
  //
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <h1>Create Review</h1>
          <Title>
            <InputWrap
              id="title"
              type="text"
              watch={watch('title')}
              inputErrMsg={errors.title?.message}
              label="리뷰제목"
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
              watch={watch('movieTitle')}
              inputErrMsg={errors.movieTitle?.message}
              label="영화제목"
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
            <Btn type="button" name="SAVE" onClick={clickSave} />
          </Title>
          <Content>
            {errors.content && <ErrorMsg error={errors.content.message} />}
            {preview && <Preview preview={preview} />}
            <Avatar>
              <span>* 사진을 업로드하려면 아이콘을 클릭하세요.</span>
              <label htmlFor="avatar">
                <Svg type="file-upload" />
              </label>
              <input
                {...register('avatar')}
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
              />
            </Avatar>
            <Profile>
              <ProfileAvatar size={40} url={loggedInUser?.avatar} />
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
            />
          </Content>
        </Cont>
        {submit && (
          <SubmitReview
            loading={Loading}
            setSubmit={setSubmit}
            register={register}
            error={{ data: data?.error, score: errors.score }}
            setError={setError}
            getValues={getValues}
          />
        )}
      </form>
    </>
  );
};
const Cont = styled.section`
  h1 {
    font-size: 1.6rem;
  }
  .avatar-cont {
    width: 60%;
    margin: 0 auto;
    border-radius: 3px;
    background-size: contain;
    border: ${(p) => p.theme.border.bold};
  }
  .avatar-label {
    min-height: 400px;
  }
`;
const Title = styled.article`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  select,
  input {
    border: ${(p) => p.theme.border.bold};
  }
  select {
    padding: 15px;
  }
`;
const Content = styled.article`
  padding: 30px 60px;
  border-radius: 5px;
  border: 1px solid #636e72;
  textarea {
    font-size: 1.2rem;
    margin-top: 12px;
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
const Avatar = styled.article`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
  font-size: 1rem;
  label {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 1.4em;
      height: 1.4em;
    }
    &:hover {
      svg {
        fill: ${(p) => p.theme.color.logo};
      }
    }
  }
  input {
    display: none;
  }
  span {
    opacity: 0.8;
    font-style: italic;
    color: ${(p) => p.theme.color.logo};
  }
`;
const Preview = styled.div<{ preview: string | null }>`
  min-height: 300px;
  background: ${(p) =>
    p.preview && `url(${p.preview}) center / contain  no-repeat`};
`;
