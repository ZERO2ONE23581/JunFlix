import {
  ICommentRes,
  ICreateCommentsForm,
  IPostComment,
} from '../../../../types/comments';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Style/Button';
import { Svg } from '../../../Style/Svg/Svg';
import { ComputeLength } from '../../../Tools';
import { ErrorMsg } from '../../../Style/ErrMsg';
import useUser from '../../../../libs/client/useUser';
import { TextAreaWrap } from '../../../Style/Input/TextArea';
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
  const { loggedInUser } = useUser();
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
      setSelectId(0);
      setReplyCmt(false);
      alert('새로운 댓글을 생성합니다.');
    }
  }, [data, setReplyCmt, setSelectId]);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <Flex height={height}>
            <ProfileAvatar avatar={loggedInUser?.avatar} size="2.2rem" />
            <TextAreaWrap
              id="content"
              height={height}
              minHeight={minHeight}
              maxHeight={maxHeight}
              placeholder="답글 달기..."
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
  .textarea-wrap {
    border: none;
    padding: 10px;
    border-radius: 0;
    border: 2px double red;
    textarea {
      padding: 0;
    }
  }
`;
