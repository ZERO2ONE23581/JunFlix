import {
  ICommentRes,
  ICreateCommentsForm,
  IPostComment,
} from '../../../../types/comments';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../../Style/Button';
import { Svg } from '../../../Style/Svg/Svg';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { TextArea } from '../../../Style/Input/TextArea';
import useMutation from '../../../../libs/client/useMutation';

interface ICreatePostComment extends IPostComment {}
export const CreatePostComment = ({ post }: ICreatePostComment) => {
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
          <Flex height={height}>
            <Svg type="smile" size="1.6rem" />
            <TextArea
              {...register('content', { required: '댓글을 입력해주세요.' })}
              id="content"
              name="content"
              placeholder="댓글 달기..."
            />
            {loading && <Svg type="loading" />}
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
  textarea {
    min-height: 40px;
    max-height: 100px;
    height: ${(p) => p.height && `${p.height}px`};
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
