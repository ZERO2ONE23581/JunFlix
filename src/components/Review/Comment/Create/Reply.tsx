import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Style/Button';
import { Svg } from '../../../Style/Svg/Svg';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { IReview } from '../../../../types/review';
import useUser from '../../../../libs/client/useUser';
import { TextArea } from '../../../Style/Input/TextArea';
import useMutation from '../../../../libs/client/useMutation';
import { ProfileAvatar } from '../../../Avatar/ProfileAvatar';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ICmtRes, ICmtForm } from '../../../../types/comments';
import { Length } from '../../../Tools';

interface ICreateReviewReply extends IReview {
  comment_id: number;
  setSelectId: Dispatch<SetStateAction<number>>;
  setReplyCmt: Dispatch<SetStateAction<boolean>>;
}
export const CreateReply = ({
  review,
  comment_id,
  setSelectId,
  setReplyCmt,
}: ICreateReviewReply) => {
  const [CreateReply, { loading, data }] = useMutation<ICmtRes>(
    `/api/user/${review?.UserID}/review/${review?.id}/comment/${comment_id}/create`
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICmtForm>({ mode: 'onSubmit' });
  const onValid = ({ content }: ICmtForm) => {
    if (loading) return;
    return CreateReply({ content });
  };
  const minHeight = 50;
  const maxHeight = 100;
  const [height, setHeight] = useState(minHeight);
  useEffect(() => {
    const length = Length({ watch: watch, type: 'content' });
    if (length) setHeight(minHeight + length);
  }, [watch('content'), setHeight, Length]);
  //
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
            <ProfileAvatar avatar={loggedInUser?.avatar} size="3rem" />
            <TextArea
              {...register('content', { required: '댓글을 입력해주세요.' })}
              id="content"
              name="content"
              placeholder="답글 달기..."
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
  button {
    width: 10%;
    height: 100%;
    color: inherit;
    background-color: inherit;
  }
`;
const Flex = styled.div<{ height: number }>`
  gap: 20px;
  display: flex;
  align-items: flex-start;
  textarea {
    min-height: 40px;
    max-height: 100px;
    height: ${(p) => p.height && `${p.height}px`};
  }
`;
