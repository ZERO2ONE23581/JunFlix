import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { ErrorMsg } from '../../../../../../../Style/ErrMsg';
import { Creator } from '../../../../../../../../../Creator';
import { AltSvg, Svg } from '../../../../../../../Style/Svg/Svg';
import useUser from '../../../../../../../../libs/client/useUser';
import { IconBtn } from '../../../../../../../Style/Button/IconBtn';
import { TextArea } from '../../../../../../../Style/Input/TextArea';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useMutation from '../../../../../../../../libs/client/useMutation';
import {
  ICommentRes,
  ICreateCommentsForm,
} from '../../../../../../../../types/comments';
import { IPostCmtQuery } from '../../../../../../../../types/post';

interface ICreatePostReply extends IPostCmtQuery {
  comment_id: number;
  setChosenId: Dispatch<SetStateAction<number>>;
  setReply: Dispatch<SetStateAction<boolean>>;
}
export const CreateReply = ({
  userId,
  boardId,
  postId,
  comment_id,
  setChosenId,
  setReply,
}: ICreatePostReply) => {
  const { loggedInUser } = useUser();
  const [CreateReply, { loading, data }] = useMutation<ICommentRes>(
    `/api/user/${userId}/board/${boardId}/post/${postId}/comment/${comment_id}/create`
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
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const content = watch('content');
    setHeight(content?.length!);
  }, [setHeight, watch('content')]);

  useEffect(() => {
    if (data?.ok) {
      setChosenId(0);
      setReply(false);
      alert('답글을 생성합니다.');
    }
  }, [data, setReply, setChosenId]);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <AltSvg type="reply" size="1.5rem" />
          <Creator userAvatar={loggedInUser?.avatar!} size="2.5rem" />
          <TextArea
            {...register('content', { required: '댓글을 입력해주세요.' })}
            id="content"
            name="content"
            height={height}
            placeholder="댓글 달기..."
          />
          {!loading && (
            <IconBtn size="1.5rem" type="submit" svgType="paper-plane" />
          )}
          {loading && <Svg size="1.5rem" type="loading" />}
          {data?.error && <ErrorMsg error={data.error} />}
          {errors.content && <ErrorMsg error={errors.content?.message} />}
        </Cont>
      </form>
    </>
  );
};
const Cont = styled.div`
  position: relative;
  padding: 15px 20px;
  gap: 15px;
  display: flex;
  align-items: flex-start;
  .reply {
    margin-top: 5px;
  }
  textarea {
    padding: 3px;
    min-height: 30px;
    font-size: 1rem;
    max-height: 100px;
  }
  .error-msg {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;
