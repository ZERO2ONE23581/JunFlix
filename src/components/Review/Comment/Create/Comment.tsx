import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../../Style/Button';
import { Svg } from '../../../Style/Svg/Svg';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { IReview } from '../../../../types/review';
import { TextArea } from '../../../Style/Input/TextArea';
import useMutation from '../../../../libs/client/useMutation';
import { ICommentRes, ICreateCommentsForm } from '../../../../types/comments';

export const CreateComment = ({ review }: IReview) => {
  const [CreateComment, { loading, data }] = useMutation<ICommentRes>(
    `/api/user/${review?.UserID}/review/${review?.id}/comment/create`
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateCommentsForm>({ mode: 'onSubmit' });
  const onValid = ({ content }: ICreateCommentsForm) => {
    if (loading) return;
    return CreateComment({ content });
  };
  const [height, setHeight] = useState(40);
  useEffect(() => {
    const content = watch('content');
    setHeight(content?.length!);
  }, [setHeight, watch('content')]);

  useEffect(() => {
    if (data?.ok) {
      alert('새로운 댓글을 생성합니다.');
    }
  }, [data]);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont height={height}>
          <Svg type="smile" size="3rem" />
          <TextArea
            {...register('content', { required: '댓글을 입력해주세요.' })}
            id="content"
            name="content"
            placeholder="댓글 달기..."
          />
          {loading && <Svg type="loading" size="2rem" />}
          {!loading && <Btn name="Post" type="submit" CLASSNAME="submit-btn" />}
        </Cont>
      </form>
      {data?.error && <ErrorMsg error={data.error} />}
      {errors.content && <ErrorMsg error={errors.content?.message} />}
    </>
  );
};
const Cont = styled.div<{ height: number }>`
  margin-bottom: 20px;
  gap: 20px;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 5px;
  svg {
    pointer-events: none;
  }
  textarea {
    cursor: auto;
    min-height: 50px;
    max-height: 120px;
    padding-top: 20px;
    font-size: 1.4rem;
    height: ${(p) => p.height && `${p.height}px`};
  }
  .submit-btn {
    padding: 0;
    color: inherit;
    font-size: 1.5rem;
    background-color: inherit;
    :hover {
      color: ${(p) => p.theme.color.logo};
      text-decoration: 3px underline ${(p) => p.theme.color.logo};
      text-underline-offset: 5px;
    }
  }
`;
