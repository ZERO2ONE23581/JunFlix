import {
  ICommentRes,
  ICreateCommentsForm,
  IPostComment,
} from '../../../../types/comments';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Style/Button';
import { Svg } from '../../../Style/Svg/Svg';
import { ErrorMsg } from '../../../Style/ErrMsg';
import useUser from '../../../../libs/client/useUser';
import { TextArea } from '../../../Style/Input/TextArea';
import useMutation from '../../../../libs/client/useMutation';
import { ProfileAvatar } from '../../../Avatar/ProfileAvatar';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ICreatePostReply extends IPostComment {
  comment_id: number;
  setSelectId: Dispatch<SetStateAction<number>>;
  setReplyCmt: Dispatch<SetStateAction<boolean>>;
}
export const CreatePostReply = ({
  post,
  comment_id,
  setSelectId,
  setReplyCmt,
}: ICreatePostReply) => {
  const [CreateReply, { loading, data }] = useMutation<ICommentRes>(
    `/api/user/${post?.UserID}/board/${post?.BoardID}/post/${post?.id}/comment/${comment_id}/create`
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateCommentsForm>({ mode: 'onSubmit' });
  const onValid = ({ content }: ICreateCommentsForm) => {
    if (loading) return;
    return CreateReply({ content });
  };
  const [height, setHeight] = useState(40);
  useEffect(() => {
    const content = watch('content');
    setHeight(content?.length!);
  }, [setHeight, watch('content')]);
  useEffect(() => {
    if (data?.ok) {
      setSelectId(0);
      setReplyCmt(false);
      alert('새로운 댓글을 생성합니다.');
    }
  }, [data, setReplyCmt, setSelectId]);
  const { loggedInUser } = useUser();
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <Flex height={height}>
            <ProfileAvatar avatar={loggedInUser?.avatar} size="2.2rem" />
            <TextArea
              {...register('content', { required: '댓글을 입력해주세요.' })}
              id="content"
              name="content"
              placeholder="답글 달기..."
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
  padding: 12px 20px;
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
  }
`;
