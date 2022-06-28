import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { SaveUpdate } from './SaveUpdate';
import { Btn } from '../../Style/Button';
import { Svg } from '../../Style/Svg/Svg';
import { useEffect, useState } from 'react';
import { ErrorMsg } from '../../Style/ErrMsg';
import { ProfileAvatar } from '../../Avatar/Profile';
import { ThumnailAvatar } from '../../Avatar/Thumnail';
import { Input, InputWrap } from '../../Style/Input';
import { TextArea } from '../../Style/Input/TextArea';
import { MutationRes } from '../../../types/mutation';
import { SelectWrap } from '../../Style/Input/SelectWrap';
import useMutation from '../../../libs/client/useMutation';
import { IGetReview, IReviewForm } from '../../../types/review';

export const EditReview = () => {
  const router = useRouter();
  const { user_id, review_id } = router.query;
  const QueryId = user_id && review_id;
  //get
  const { data: ReviewData } = useSWR<IGetReview>(
    QueryId && `/api/user/${user_id}/review/${review_id}`
  );
  const review = ReviewData?.review;

  //post
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IReviewForm>({ mode: 'onChange' });
  const avatar = watch('avatar');
  const [EditReview, { loading, data }] = useMutation<MutationRes>(
    `/api/user/${user_id}/review/${review_id}/edit`
  );
  const [avatarLoading, setAvatarLoading] = useState(false);
  const Loading = avatarLoading ? avatarLoading : loading ? loading : null;
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
    if (review) {
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
    if (data?.ok) {
      alert('리뷰를 수정했습니다.');
      router.replace(`/user/${user_id}/review/${review_id}`);
    }
  }, [review, data, avatar, watch, router]);
  //
  const [saveEdit, setSaveEdit] = useState(false);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <h1>Edit Review</h1>
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
            <Btn name="SAVE" type="button" onClick={() => setSaveEdit(true)} />
          </Title>
          <Content>
            {errors.content && <ErrorMsg error={errors.content.message} />}
            <ThumnailAvatar url={review?.avatar} preview={preview} />
            <Avatar>
              <span>* 새로운 사진을 업로드하려면 아이콘을 클릭하세요.</span>
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
              <ProfileAvatar size={40} url={review?.user?.avatar} />
              <div>
                <span>{review?.user?.username}</span>
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
          <Oneline>
            <label htmlFor="oneline">
              이 영화에 대한 한줄평을 작성해 주세요.
            </label>
            <Input
              id="oneline"
              type="text"
              maxLength={30}
              placeholder="영화 한줄평"
              {...register('oneline')}
            />
            <span>한줄평은 30자 이내 작성할 수 있습니다.</span>
          </Oneline>
          <Score>
            <label htmlFor="score">이 영화에 대한 당신의 별점은?</label>
            <input {...register('score')} type="range" min={0} max={5} />
            <span>숫자를 입력해주세요.</span>
            <span>별점은 0부터 5까지 선택가능합니다.</span>
          </Score>
          <Recommend>
            <label htmlFor="recommend">
              이 영화를 추천한다면 체크해주세요.
            </label>
            <input
              {...register('recommend')}
              type="checkbox"
              id="recommend"
              name="recommend"
            />
          </Recommend>
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
const FlexColumn = styled.div`
  padding: 20px;
  min-width: 330px;
  text-align: center;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  label {
    font-size: 1.1rem;
  }
  input {
    border: ${(p) => p.theme.border.bold};
  }
`;
const Oneline = styled(FlexColumn)``;
const Score = styled(FlexColumn)`
  input {
    padding: 10px;
    width: 60px;
    margin: 10px auto;
    text-align: center;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
  }
`;
const Recommend = styled(FlexColumn)`
  flex-direction: row;
  align-items: center;
  input {
    border-radius: 10%;
    width: 30px;
    height: 30px;
    &:checked {
      color: red;
      background-color: red;
    }
  }
`;
