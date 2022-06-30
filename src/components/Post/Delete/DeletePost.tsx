import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { ErrorMsg } from '../../Style/ErrMsg';
import { InputWrap } from '../../Style/Input';
import { LoadingModal } from '../../LoadingModal';
import useUser from '../../../libs/client/useUser';
import { IconBtn } from '../../Style/Button/IconBtn';
import { MutationRes } from '../../../types/mutation';
import useMutation from '../../../libs/client/useMutation';
import { IDeleteBoard, IVerifyID } from '../../Board/Delete/DeleteBoard';
import { Form, Info, Modal, DimBackground } from '../../../../styles/global';

interface IDeletePost extends IDeleteBoard {
  POSTID: number;
}
export const DeletePost = ({
  USERID,
  BOARDID,
  POSTID,
  openModal,
}: IDeletePost) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const [confirm, setConfirm] = useState(false);
  const isMyPost = Boolean(loggedInUser?.id === USERID);
  const clickYes = () => {
    if (!isMyPost) alert('삭제권한이 없습니다.');
    setConfirm(true);
  };
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IVerifyID>({ mode: 'onSubmit' });
  const [DeletePost, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${USERID}/board/${BOARDID}/post/${POSTID}/delete`
  );
  const onValid = async ({ userId }: IVerifyID) => {
    if (loading) return;
    return DeletePost({ userId });
  };
  const isTyped = Boolean(watch('userId'));
  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok) {
      router.reload();
    }
  }, [data, router]);
  return (
    <>
      {!loading && (
        <Cont>
          {!confirm ? (
            <>
              <h1>이 포스트를 삭제 하시겠습니까?</h1>
              <h2>삭제시 복구가 불가합니다.</h2>
              <Notice>
                <span>Are you sure to delete this post?</span>
                <span>You cant' recover the post once it is deleted.</span>
              </Notice>
              <div className="btn-wrap">
                <Btn name="YES" type="button" onClick={clickYes} />
                <Btn name="NO" type="button" onClick={() => openModal(false)} />
              </div>
            </>
          ) : (
            <Wrap>
              <IconBtn
                type="button"
                svgType="close-btn"
                onClick={() => openModal(false)}
              />
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
                {isTyped && <IconBtn type="submit" svgType="trash" />}
              </Form>
            </Wrap>
          )}
          {data?.error && <ErrorMsg error={data?.error} />}
        </Cont>
      )}
      {loading && (
        <LoadingModal
          zIndex={103}
          text={{ kor: '포스트 삭제중...', eng: 'Deleting post...' }}
        />
      )}
      <DimBackground zIndex={102} onClick={() => openModal(false)} />
    </>
  );
};
const Cont = styled(Modal)`
  z-index: 103;
  gap: 12px;
  padding: 20px;
  min-width: 500px;
  border: 1px solid #353b48;
  form {
    width: 70%;
    margin: 0 auto;
    text-align: center;
    input {
      padding: 12px;
      border: ${(p) => p.theme.border.thick};
    }
  }
  .close-btn {
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
