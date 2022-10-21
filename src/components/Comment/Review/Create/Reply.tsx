import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { AltSvg, Svg } from '../../../../Tools/Svg';
import { ErrorMsg } from '../../../../Tools/Errors';
import { IReview } from '../../../../types/review';
import useUser from '../../../../libs/client/useUser';
import { TextArea } from '../../../../Tools/Input/TextArea';
import useMutation from '../../../../libs/client/useMutation';
import { Avatar } from '../../../../Tools/Avatar/profile';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ICmtRes, ICmtForm } from '../../../../types/comments';
import { useLength } from '../../../../libs/client/useTools';

interface IReplyCmt extends IReview {
  comment_id: number;
  setSelectId: Dispatch<SetStateAction<number>>;
  setReply: Dispatch<SetStateAction<boolean>>;
}
export const CreateReply = ({
  review,
  comment_id,
  setSelectId,
  setReply,
}: IReplyCmt) => {
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
  const [height, setHeight] = useState(minHeight);
  useEffect(() => {
    const length = useLength(watch('content'));
    if (length) setHeight(minHeight + length);
  }, [watch('content'), setHeight, useLength]);

  useEffect(() => {
    if (data?.ok) {
      setSelectId(0);
      setReply(false);
      alert('새로운 댓글을 생성합니다.');
    }
  }, [data, setReply, setSelectId]);
  const { loggedInUser } = useUser();
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <AltSvg type="reply" size="1.4rem" />
          <Avatar avatar={loggedInUser?.avatar} size="3rem" />
          <Flex>
            <TextArea
              {...register('content', { required: '댓글을 입력해주세요.' })}
              id="content"
              name="content"
              height={height}
              placeholder="답글 달기..."
            />
            {loading && <Svg type="loading" size="2rem" />}
            {!loading && <Svg size="2rem" type="paper-plane" />}
          </Flex>
        </Cont>
      </form>
      {data?.error && <ErrorMsg error={data.error} />}
      {errors.content && <ErrorMsg error={errors.content?.msg} />}
    </>
  );
};
const Cont = styled.div`
  gap: 20px;
  display: flex;
  padding: 12px 20px;
  margin-bottom: 15px;
  align-items: center;
  border: 2px dashed ${(p) => p.theme.color.logo};
  .reply {
    margin-top: 5px;
  }
`;
const Flex = styled.div`
  width: 90%;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  textarea {
    min-height: 10px;
    max-height: 100px;
    padding: 20px 10px 0;
    :focus {
      outline: none;
    }
  }
`;
