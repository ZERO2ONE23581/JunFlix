import { EditCont } from '../Edit';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Profile } from '../Read/Info/Content/Profile';
import { Svg } from '../../../Tools/Svg';
import { ErrorMsg } from '../../../Tools/ErrMsg';
import useUser from '../../../../libs/client/useUser';
import { IconBtn } from '../../../Tools/Button/IconBtn';
import { TextArea } from '../../../Tools/Input/TextArea';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useMutation from '../../../../libs/client/useMutation';
import { ICmtRes, ICmtForm } from '../../../../types/comments';
import { IQuery } from '../../../../types/global';

interface ICreatePostReply extends IQuery {
  comment_id: number;
  setChosenId: Dispatch<SetStateAction<number>>;
  setReply: Dispatch<SetStateAction<boolean>>;
}
export const CreateReply = ({
  query,
  setReply,
  comment_id,
  setChosenId,
}: ICreatePostReply) => {
  const { loggedInUser } = useUser();
  const [CreateReply, { loading, data }] = useMutation<ICmtRes>(
    `/api/user/${query.userId}/board/${query.boardId}/post/${query.postId}/comment/${comment_id}/create`
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
          <Profile isInReply userAvatar={loggedInUser?.avatar!} size="2.5rem" />
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
        </Cont>
      </form>
      {data?.error && <ErrorMsg error={data.error} />}
      {errors.content && <ErrorMsg error={errors.content?.message} />}
    </>
  );
};
const Cont = styled(EditCont)``;
