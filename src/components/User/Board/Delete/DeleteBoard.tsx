import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Style/Button';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { InputWrap } from '../../../Style/Input';
import useUser from '../../../../libs/client/useUser';
import { IconBtn } from '../../../Style/Button/IconBtn';
import { MutationRes } from '../../../../types/mutation';
import useMutation from '../../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, Info, Modal, ModalClose } from '../../../../../styles/global';

interface IDeleteBoardProps {
  closeModal: Dispatch<SetStateAction<boolean>>;
}
interface IDeleteBoardForm {
  userId: string;
}
export const DeleteBoard = ({ closeModal }: IDeleteBoardProps) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const { user_id, board_id } = router.query;
  const [confirm, setConfirm] = useState(false);
  const isMyBoard = Boolean(String(loggedInUser?.id) === user_id);
  //
  const clickYes = () => {
    if (!isMyBoard) alert('삭제권한이 없습니다.');
    setConfirm(true);
  };
  //post
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDeleteBoardForm>({ mode: 'onSubmit' });
  const [DeleteBoard, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${user_id}/board/${board_id}/delete`
  );
  const onValid = async ({ userId }: IDeleteBoardForm) => {
    if (loading) return;
    return DeleteBoard({ userId });
  };
  const isTyped = Boolean(watch('userId'));
  useEffect(() => {
    if (data?.ok) {
      alert('보드가 삭제되었습니다.');
      router.replace('/user/all/boards');
    }
  }, [data, router]);
  return (
    <>
      <Cont>
        {!confirm ? (
          <>
            <h1>이 보드를 삭제 하시겠습니까?</h1>
            <h2>삭제시 복구가 불가합니다.</h2>
            <Notice>
              <span>Are you sure to delete this board?</span>
              <span>You cant' recover the board once it is deleted.</span>
            </Notice>
            <div className="btn-wrap">
              <Btn name="YES" type="button" onClick={clickYes} />
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
  gap: 12px;
  width: 60%;
  z-index: 203;
  min-height: 240px;
  padding: 20px;
  border: 1px solid #353b48;
  form {
    width: 70%;
    margin: 0 auto;
    text-align: center;
    input {
      padding: 12px;
      border: ${(p) => p.theme.border.bold};
    }
  }
  .click-cancel {
    top: 15px;
    right: 10px;
    position: absolute;
  }
`;
const Wrap = styled.article`
  padding: 0 5%;
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
