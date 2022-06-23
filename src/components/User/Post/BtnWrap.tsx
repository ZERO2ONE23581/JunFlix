import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import useUser from '../../../libs/client/useUser';

interface IBtnWrapProps {
  next: boolean;
  loading: boolean | null;
  setNext: Dispatch<SetStateAction<boolean>>;
  openDeletePost: Dispatch<SetStateAction<boolean>>;
}
export const BtnWrap = ({
  next,
  loading,
  setNext,
  openDeletePost,
}: IBtnWrapProps) => {
  return (
    <>
      <Cont>
        {!next ? (
          <Btn type="button" name="BACK" onClick={() => openDeletePost(true)} />
        ) : (
          <Btn type="button" name="Back" onClick={() => setNext(false)} />
        )}
        <h1>Create Post</h1>
        {!next && (
          <Btn type="button" name="Next" onClick={() => setNext(true)} />
        )}
        {next && <Btn type="submit" name="포스트 생성" loading={loading} />}
      </Cont>
    </>
  );
};
interface IPostInfoBtnWrapProps {
  edit: boolean;
  loading: boolean;
  openSetup: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setOpenSetup: Dispatch<SetStateAction<boolean>>;
  setOpenDelModal: Dispatch<SetStateAction<boolean>>;
}
export const PostInfoBtnWrap = ({
  edit,
  setEdit,
  loading,
  openSetup,
  setOpenSetup,
  setOpenDelModal,
}: IPostInfoBtnWrapProps) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const ClickBackToBoard = () =>
    router.push(`/user/${user_id}/board/${board_id}`);
  const { isLoggedIn, loggedInUser } = useUser();
  const IsMyPost = Boolean(isLoggedIn && loggedInUser?.id === Number(user_id));
  return (
    <>
      <Cont>
        <Btn
          name="Board"
          loading={loading}
          type="button"
          onClick={ClickBackToBoard}
        />
        {IsMyPost && (
          <Btn
            name={openSetup ? 'Back' : 'Setting'}
            loading={loading}
            type="button"
            onClick={() => setOpenSetup((p) => !p)}
          />
        )}
        {openSetup && (
          <Btn
            loading={loading}
            name={edit ? 'Cancel' : 'Edit'}
            type="button"
            onClick={() => setEdit((p) => !p)}
          />
        )}
        {openSetup && (
          <Btn
            loading={loading}
            name="Delete"
            type="button"
            onClick={() => setOpenDelModal((p) => !p)}
          />
        )}
      </Cont>
    </>
  );
};
const Cont = styled.article`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #404040;
  h1 {
    font-weight: 600;
    font-size: 1.5rem;
  }
  button {
    padding: 6px 15px;
  }
`;
