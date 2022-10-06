import { Btn } from '../Button';
import { InputWrap } from '../Input';
import { ErrorMsg } from '../Errors';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { LoadingModal } from './Loading';
import { Dispatch, SetStateAction } from 'react';
import { IUseform } from '../../types/global';
import { SmallModal, BtnWrap, DimBackground } from '../../../styles/global';
import { Svg } from '../Svg';

interface IConfirmModal extends IUseform {
  type: string;
  USERID?: string;
  loading?: boolean;
  clickDelPost?: any;
  clickDelReview?: any;
  boardUrl?: string;
  setEdit?: Dispatch<SetStateAction<boolean>>;
  closePost?: Dispatch<SetStateAction<boolean>>;
  setConfirm?: Dispatch<SetStateAction<boolean>>;
  closeModal?: Dispatch<SetStateAction<boolean>> | null;
}
export const ConfirmModal = ({
  type,
  errors,
  USERID,
  loading,
  setEdit,
  closePost,
  setConfirm,
  closeModal,
  clickDelPost,
  clickDelReview,
  register,
  boardUrl,
}: IConfirmModal) => {
  const isClose = !Boolean(
    type === 'find-user-id' || type === 'find-user-password'
  );
  return (
    <>
      {!loading && (
        <Cont type={type} className="confirm-modal">
          {isClose && (
            <Svg size="2rem" type="close" onClick={() => closeModal!(false)} />
          )}
          {Texts(type, USERID!)}
          <BtnWrap>
            <Btns
              boardUrl={boardUrl}
              type={type}
              errors={errors}
              setEdit={setEdit}
              register={register}
              closePost={closePost}
              setConfirm={setConfirm}
              closeModal={closeModal}
              clickDelPost={clickDelPost}
              clickDelReview={clickDelReview}
            />
          </BtnWrap>
          {errors?.userId && (
            <ErrorMsg type="err-delete-user" error={errors.userId.message} />
          )}
        </Cont>
      )}
      {loading && <LoadingModal type={type} zIndex={103} />}

      <DimBackground
        zIndex={102}
        onClick={() => closeModal !== null && closeModal!(false)}
      />
    </>
  );
};
const Cont = styled(SmallModal)<{ type: string }>`
  gap: 10px;
  gap: ${(p) =>
    (p.type === 'delete-board-avatar' || p.type === 'update-board-avatar') &&
    '15px'};
  z-index: 103;
  align-items: center;
  button {
    height: 33px;
    width: 120px;
    font-weight: 400;
    font-size: 1.2rem;
  }
  .delete-user {
    gap: 15px;
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    justify-content: center;
    .userId {
      width: 250px;
      input {
        padding: 10px;
      }
    }
    button {
      width: 250px;
      font-size: 1rem;
    }
  }
  .err-delete-user {
    padding: 10px;
    top: 80%;
    span {
      font-size: 1rem;
    }
  }
  .follow {
    margin-top: 10px;
    width: 200px;
  }
`;
const Texts = (type: string, USERID: string) => {
  return (
    <>
      {type === 'lock' && (
        <>
          <span>포스트를 보려면 해당포스트의 보드를 팔로우 하세요.</span>
          <span>보드로 이동하겠습니까?</span>
          <span>Please follow the board to see the POST.</span>
          <span>Would you like to move to the BOARD?</span>
        </>
      )}
      {(type === 'confirm-delete-board' || type === 'delete-user') && (
        <>
          <span>삭제를 위해 회원님의 아이디를 입력해주세요.</span>
          <span>Type your ID to delete.</span>
        </>
      )}
      {type === 'delete-board' && (
        <>
          <span>이 보드를 삭제 하시겠습니까?</span>
          <span className="small">* 삭제후 복구가 불가합니다.</span>
          <span>Are you sure to delete this BOARD?</span>
          <span className="small">
            * BOARD would not be recovered once it is delete.
          </span>
        </>
      )}
      {type === 'find-user-id' && (
        <>
          <span>회원님의 아이디는 "{USERID}" 입니다.</span>
          <span>로그인 페이지로 이동하시겠습니까?</span>
        </>
      )}
      {type === 'find-user-password' && (
        <>
          <span>비밀번호가 성공적으로 업데이트 되었습니다.</span>
          <span>로그인 페이지로 이동하시겠습니까?</span>
        </>
      )}
      {type === 'delete-review' && (
        <>
          <span>이 리뷰를 삭제 하시겠습니까?</span>
          <span className="small">* 삭제후 복구가 불가합니다.</span>
          <span>Are you sure to delete this review?</span>
          <span className="small">
            * Review would not be recoverd once it is deleted.
          </span>
        </>
      )}
      {type === 'delete-review-avatar' && (
        <>
          <span>사진을 삭제하겠습니까?</span>
          <span>Do you want to remove current photo?</span>
        </>
      )}
      {type === 'delete-post' && (
        <>
          <span>현 포스트를 정말로 삭제 하시겠습니까?</span>
          <span className="small">* 삭제후 복구가 불가합니다.</span>
          <span>Are you sure to delete this post?</span>
          <span className="small">
            * Post would not be recoverd once it is deleted.
          </span>
        </>
      )}
      {type === 'update-post' && (
        <>
          <span>업데이트를 저장하시겠습니까?</span>
          <span>Do you want to save the recent update?</span>
        </>
      )}
      {type === 'cancel-create-post' && (
        <>
          <span>포스트 작성을 취소 하시겠습니까?</span>
          <span className="small">
            * 작성을 취소하면 내용은 저장되지 않습니다.
          </span>
          <span>Do you want to cancel creating post?</span>
          <span className="small">
            * Current post is going to be lost once it is canceled.
          </span>
        </>
      )}
      {type === 'update-board-avatar' && (
        <>
          <span>배경을 업데이트 하시겠습니까?</span>
          <span>Would you like to update the backgroud?</span>
        </>
      )}
      {type === 'cancel-update-board' && (
        <>
          <span>업데이트를 취소하시겠습니까?</span>
          <span className="small">
            * 지금 취소하면 업데이트는 저장되지 않습니다.
          </span>
          <span>Do you want to cancel the update?</span>
          <span className="small">
            * Update is not going to be saved when it is canceled.
          </span>
        </>
      )}
      {type === 'create-post' && (
        <>
          <span>포스트를 해당 보드에 올리시겠습니까?</span>
          <span>Would you like to post this on your board?</span>
          <span className="small">* 포스트는 추후에 수정이 가능합니다.</span>
          <span className="small">* You can edit your post later.</span>
        </>
      )}
      {type === 'delete-board-avatar' && (
        <>
          <span>보드배경을 삭제하시겠습니까?</span>
          <span>Would you like to delete the board background?</span>
        </>
      )}
    </>
  );
};
const Btns = ({
  type,
  setEdit,
  register,
  closePost,
  setConfirm,
  closeModal,
  clickDelPost,
  clickDelReview,
  boardUrl,
}: IConfirmModal) => {
  const router = useRouter();
  return (
    <>
      {type === 'lock' && (
        <>
          <Btn
            name="YES"
            type="button"
            onClick={() => router.push(boardUrl!)}
          />
          <Btn name="NO" type="button" onClick={() => closeModal!(false)} />
        </>
      )}
      {(type === 'find-user-id' || type === 'find-user-password') && (
        <>
          <Btn
            name="YES"
            type="button"
            onClick={() => router.replace('/login')}
          />
          <Btn name="NO" type="button" onClick={() => router.reload()} />
        </>
      )}
      {(type === 'delete-user' || type === 'confirm-delete-board') && (
        <div className="delete-user">
          <InputWrap
            id="userId"
            type="text"
            placeholder="아이디 입력"
            register={register!('userId', {
              required: `${
                type === 'delete-user'
                  ? '계정을'
                  : type === 'confirm-delete-board'
                  ? '보드를'
                  : ''
              } 삭제하려면 아이디를 입력해주세요.`,
            })}
          />
          <Btn name="DELETE" type="submit" />
        </div>
      )}
      {type === 'delete-board' && (
        <>
          <Btn
            name="YES"
            type="button"
            onClick={() => {
              closeModal!(false);
              setConfirm!(true);
            }}
          />
          <Btn name="NO" type="button" onClick={() => closeModal!(false)} />
        </>
      )}
      {type === 'delete-review' && (
        <>
          <Btn name="YES" type="button" onClick={clickDelReview} />
          <Btn name="NO" type="button" onClick={() => closeModal!(false)} />
        </>
      )}
      {type === 'delete-post' && (
        <>
          <Btn name="YES" type="button" onClick={clickDelPost} />
          <Btn name="NO" type="button" onClick={() => closeModal!(false)} />
        </>
      )}
      {type === 'cancel-create-post' && (
        <>
          <Btn name="YES" type="button" onClick={() => closePost!(false)} />
          <Btn name="NO" type="button" onClick={() => closeModal!(false)} />
        </>
      )}
      {type === 'cancel-update-board' && (
        <>
          <Btn name="YES" type="button" onClick={() => setEdit!(false)} />
          <Btn name="NO" type="button" onClick={() => closeModal!(false)} />
        </>
      )}
      {(type === 'update-board-avatar' ||
        type === 'update-post' ||
        type === 'delete-board-avatar' ||
        type === 'delete-review-avatar' ||
        type === 'create-post') && (
        <>
          <Btn name="YES" type="submit" />
          <Btn type="button" name="NO" onClick={() => closeModal!(false)} />
        </>
      )}
    </>
  );
};
