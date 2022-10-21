import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Svg } from '../../../../Tools/Svg';
import { ErrorMsg } from '../../../../Tools/Errors';
import { IReview } from '../../../../types/review';
import { TextArea } from '../../../../Tools/Input/TextArea';
import useMutation from '../../../../libs/client/useMutation';
import { ICmtRes, ICmtForm } from '../../../../types/comments';

export const CreateComment = ({ review }: IReview) => {
  const [CreateComment, { loading, data }] = useMutation<ICmtRes>(
    `/api/user/${review?.UserID}/review/${review?.id}/comment/create`
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICmtForm>({ mode: 'onSubmit' });
  const onValid = ({ content }: ICmtForm) => {
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
        <Cont height={height} className="create-cmt">
          <Svg type="smile" size="3rem" />
          <TextArea
            {...register('content', { required: '댓글을 입력해주세요.' })}
            id="content"
            name="content"
            placeholder="댓글 달기..."
          />
          {loading && <Svg type="loading" size="2rem" />}
          {!loading && <Svg size="2.2rem" type="paper-plane" />}
        </Cont>
      </form>
      {data?.error && <ErrorMsg error={data.error} />}
      {errors.content && <ErrorMsg error={errors.content?.msg} />}
    </>
  );
};
const Cont = styled.div<{ height: number }>`
  gap: 20px;
  display: flex;
  padding: 20px 40px;
  border-radius: 5px;
  align-items: center;
  border: 2px solid ${(p) => p.theme.color.font};
  .smile {
    pointer-events: none;
  }
  textarea {
    cursor: auto;
    padding: 10px;
    min-height: 50px;
    max-height: 120px;
    font-size: 1.3rem;
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
