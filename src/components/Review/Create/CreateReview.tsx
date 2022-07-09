import styled from '@emotion/styled';
import { Avatar } from '../../Avatar';
import { Review } from '@prisma/client';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { Svg } from '../../Style/Svg/Svg';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { SubmitReview } from './SubmitReview';
import { InputWrap } from '../../Style/Input';
import { ErrorMsg } from '../../Style/ErrMsg';
import useUser from '../../../libs/client/useUser';
import { IReviewForm } from '../../../types/review';
import { TextArea } from '../../Style/Input/TextArea';
import { SelectWrap } from '../../Style/Input/SelectWrap';
import { ProfileAvatar } from '../../Avatar/ProfileAvatar';
import useMutation from '../../../libs/client/useMutation';

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
      router.replace(`/user/${data.review?.UserID}/review/${data.review?.id}`);
    }
  }, [data, avatar, watch, router]);
  //
  const [isFocus, setIsFocus] = useState(false);
  const [openLabel, setOpenLabel] = useState(false);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <TopLayer>
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
            <Btn
              CLASSNAME="create-reivew-btn"
              type="button"
              name="SAVE"
              onClick={clickSave}
            />
          </TopLayer>
          {errors.content && <ErrorMsg error={errors.content.message} />}
          {openLabel && (
            <Avatar
              avatar=""
              preview={preview}
              register={register('avatar')}
              size={{ width: '100vw', height: '66vh' }}
            />
          )}
          <div className="flex">
            <span>
              * 사진을 업로드하려면 아이콘을 클릭한 후 배경화면을 클릭하세요.
            </span>
            <span>
              (Click the icon beside and click the screen after to post a photo
              on your review.)
            </span>
            <div onClick={() => setOpenLabel((p) => !p)}>
              <Svg type="file-upload" />
            </div>
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
  padding: 20px 30px;
  padding-bottom: 50px;
  border-radius: 5px;
  border: 1px solid #636e72;
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
// const Preview = styled.div<{ preview: string | null }>`
//   min-height: 300px;
//   background: ${(p) =>
//     p.preview && `url(${p.preview}) center / contain  no-repeat`};
// `;

// const Avatar = styled.article`
//   gap: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: end;
//   font-size: 1rem;
//   label {
//     width: 50px;
//     height: 50px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     svg {
//       width: 1.4em;
//       height: 1.4em;
//     }
//     &:hover {
//       svg {
//         fill: ${(p) => p.theme.color.logo};
//       }
//     }
//   }
//   input {
//     display: none;
//   }
//   span {
//     opacity: 0.8;
//     font-style: italic;
//     color: ${(p) => p.theme.color.logo};
//   }
// `;
