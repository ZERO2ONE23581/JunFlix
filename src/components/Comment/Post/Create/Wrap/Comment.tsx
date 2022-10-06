import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Svg } from '../../../../../Tools/Svg';
import { ErrorMsg } from '../../../../../Tools/Errors';
import { TextArea } from '../../../../../Tools/Input/TextArea';
import useMutation from '../../../../../libs/client/useMutation';
import { ICmtForm, ICmtRes } from '../../../../../types/comments';
import { IQuery } from '../../../../../types/global';

export const CreateComment = ({ query }: IQuery) => {
  const [CreateComment, { loading, data }] = useMutation<ICmtRes>(
    `/api/user/${query.userId}/board/${query.boardId}/post/${query.postId}/comment/create`
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
        <Cont>
          <Svg type="smile" size="2rem" />
          <Flex>
            <TextArea
              {...register('content', { required: '댓글을 입력해주세요.' })}
              id="content"
              name="content"
              height={height}
              placeholder="댓글 달기..."
            />
            {loading && <Svg type="loading" size="2rem" />}
            {!loading && <Svg type="paper-plane" size="1.8rem" />}
          </Flex>
        </Cont>
      </form>
      {data?.error && <ErrorMsg error={data.error} />}
      {errors.content && <ErrorMsg error={errors.content?.message} />}
    </>
  );
};
const Cont = styled.article`
  gap: 1rem;
  display: flex;
  padding: 10px 20px;
  align-items: center;
  justify-content: flex-start;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border-top: 1px solid ${(p) => p.theme.color.font};
`;
const Flex = styled.div`
  width: 100%;
  gap: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  textarea {
    border: none;
    padding: 10px;
    font-size: 1rem;
    min-height: 40px;
    max-height: 100px;
    color: ${(p) => p.theme.color.bg};
    background-color: ${(p) => p.theme.color.font};
    :focus {
      outline: none;
      border: 1px double #dfe6e9;
    }
  }
`;
