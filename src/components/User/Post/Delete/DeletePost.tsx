import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Info, Modal, ModalClose } from '../../../../../styles/global';
import useMutation from '../../../../libs/client/useMutation';
import { MutationRes } from '../../../../types/mutation';
import { Btn } from '../../../Style/Button';
import { IconBtn } from '../../../Style/Button/IconBtn';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { InputWrap } from '../../../Style/Input';

interface IDeletePostProps {
  post_id: number;
  closeModal: Dispatch<SetStateAction<boolean>>;
}
interface IDeletePostForm {
  userId: string;
}

export const DeletePost = ({ post_id, closeModal }: IDeletePostProps) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const [confirm, setConfirm] = useState(false);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDeletePostForm>({ mode: 'onSubmit' });
  const [DeletePost, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${user_id}/board/${board_id}/post/${post_id}/delete`
  );
  const onValid = async ({ userId }: IDeletePostForm) => {
    if (loading) return;
    return DeletePost({ userId });
  };
  const isTyped = Boolean(watch('userId'));
  useEffect(() => {
    if (data?.ok) {
      alert('게시물이 삭제되었습니다.');
      router.reload();
    }
  }, [data, router]);
  return (
    <>
      <Cont>
        {!confirm ? (
          <>
            <h1>이 게시물을 삭제 하시겠습니까?</h1>
            <h2>삭제시 복구가 불가합니다.</h2>
            <Notice>
              <span>Are you sure to delete this post?</span>
              <span>You cant' recover the post once it is deleted.</span>
            </Notice>
            <div className="btn-wrap">
              <Btn name="YES" type="button" onClick={() => setConfirm(true)} />
              <Btn name="NO" type="button" onClick={() => closeModal(false)} />
            </div>
          </>
        ) : (
          <Wrap>
            <div className="click-cancel">
              <IconBtn type="button" svgType="close-btn" />
            </div>
            <Notice className="second-notice">
              <span>삭제확인을 위해 회원님의 아이디를 입력해주세요.</span>
              <span style={{ fontSize: '1.1rem' }}>
                Please type the your ID to confirm delete.
              </span>
            </Notice>
            <Form onSubmit={handleSubmit(onValid)}>
              <InputWrap
                id="userId"
                type="text"
                label="USER ID"
                watch={watch('userId')}
                inputErrMsg={errors.userId?.message}
                register={register('userId', {
                  required: '아이디를 입력해주세요.',
                })}
              />
              {isTyped && (
                <IconBtn
                  type="submit"
                  svgType={loading ? 'loading' : 'trash'}
                />
              )}
            </Form>
          </Wrap>
        )}
        {data?.error && <ErrorMsg error={data?.error} />}
      </Cont>
      <ModalClose zIndex={202} onClick={() => closeModal(false)} />
    </>
  );
};
const Cont = styled(Modal)`
  gap: 20px;
  z-index: 203;
  min-height: 240px;
  padding: 40px 30px;
  border: 1px solid #353b48;
  form {
    width: 100%;
    text-align: center;
    input {
      padding: 10px;
    }
  }
  .click-cancel {
    top: 15px;
    right: 10px;
    position: absolute;
  }
`;
const Wrap = styled.article`
  padding: 0 15px;
  .second-notice {
    margin: 22px 0;
    font-size: 1.2rem;
    span {
      margin-bottom: 10px;
    }
  }
`;
const Notice = styled(Info)`
  font-size: 1.2rem;
  text-align: center;
`;
