import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { IPostCmtQuery } from '../../Read/List';
import { Svg } from '../../../../../../../../Style/Svg/Svg';
import { ErrorMsg } from '../../../../../../../../Style/ErrMsg';
import { TextArea } from '../../../../../../../../Style/Input/TextArea';
import useMutation from '../../../../../../../../../libs/client/useMutation';
import {
  ICommentRes,
  ICreateCommentsForm,
} from '../../../../../../../../../types/comments';
import { IconBtn } from '../../../../../../../../Style/Button/IconBtn';

export const CreateComment = ({ userId, boardId, postId }: IPostCmtQuery) => {
  const [CreateComment, { loading, data }] = useMutation<ICommentRes>(
    `/api/user/${userId}/board/${boardId}/post/${postId}/comment/create`
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
        <Cont>
          <Svg type="smile" size="2rem" />
          <TextArea
            {...register('content', { required: '댓글을 입력해주세요.' })}
            id="content"
            name="content"
            height={height}
            placeholder="댓글 달기..."
          />
          {loading && <Svg type="loading" size="2rem" />}
          {!loading && (
            <IconBtn type="submit" svgType="paper-plane" size="1.8rem" />
          )}
        </Cont>
      </form>
      {data?.error && <ErrorMsg error={data.error} />}
      {errors.content && <ErrorMsg error={errors.content?.message} />}
    </>
  );
};
const Cont = styled.div`
  gap: 15px;
  display: flex;
  padding: 15px 20px;
  align-items: center;
  justify-content: flex-start;
  border-top: ${(p) => p.theme.border.thin};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  textarea {
    min-height: 30px;
    max-height: 80px;
    font-size: 1.1rem;
  }
  button {
    .reply {
      svg {
      }
    }
  }
`;
