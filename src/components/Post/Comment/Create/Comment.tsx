import {
  ICommentRes,
  ICreateCommentsForm,
  IPostComment,
} from '../../../../types/comments';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../../Style/Button';
import { Svg } from '../../../Style/Svg/Svg';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { TextArea, TextAreaWrap } from '../../../Style/Input/TextArea';
import useMutation from '../../../../libs/client/useMutation';
import { ComputeLength } from '../../../Tools';

export const CreatePostComment = ({ post }: IPostComment) => {
  const [CreateComment, { loading, data }] = useMutation<ICommentRes>(
    `/api/user/${post?.UserID}/board/${post?.BoardID}/post/${post?.id}/comment/create`
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
  const minHeight = 20;
  const maxHeight = 100;
  const [height, setHeight] = useState(minHeight);
  useEffect(() => {
    const length = ComputeLength({ watch: watch, type: 'content' });
    if (length) setHeight(minHeight + length);
  }, [watch('content'), setHeight, ComputeLength]);
  //
  useEffect(() => {
    if (data?.ok) {
      alert('새로운 댓글을 생성합니다.');
    }
  }, [data]);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <Flex height={height}>
            <Svg type="smile" size="1.6rem" />
            <TextAreaWrap
              id="content"
              height={height}
              minHeight={minHeight}
              maxHeight={maxHeight}
              placeholder="Add a comment..."
              register={register('content', {
                required: '댓글을 입력해주세요.',
              })}
            />
            {loading && <Svg type="loading" size="2rem" />}
            {!loading && <Btn name="Post" type="submit" />}
          </Flex>
        </Cont>
      </form>
      {data?.error && <ErrorMsg error={data.error} />}
      {errors.content && <ErrorMsg error={errors.content?.message} />}
    </>
  );
};
const Cont = styled.div`
  padding: 15px 20px;
  border-top: ${(p) => p.theme.border.thin};
  button {
    width: 10%;
    height: 100%;
    color: inherit;
    background-color: inherit;
  }
`;
const Flex = styled.div<{ height: number }>`
  gap: 10px;
  display: flex;
  align-items: center;
  .textarea-wrap {
    border: none;
    padding: 10px;
    textarea {
      padding: 0;
    }
  }
`;
