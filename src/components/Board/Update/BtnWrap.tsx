import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { CreatePost } from '../../Post/Create';
import useUser from '../../../libs/client/useUser';
import { ModalBtn } from '../../../Tools/Button/Modal/Board';
import { Dispatch, SetStateAction, useState } from 'react';
import { Svg } from '../../../Tools/Svg';

interface IBtnWrap {
  setEdit: Dispatch<SetStateAction<boolean>>;
  setAvatar: Dispatch<SetStateAction<boolean>>;
}
export const BtnWrap = ({ setEdit, setAvatar }: IBtnWrap) => {
  const router = useRouter();
  const { user_id } = router.query;
  const { loggedInUser } = useUser();
  const [modal, setModal] = useState(false);
  const [create, setCreate] = useState(false);
  const isMyBoard = Boolean(loggedInUser?.id === Number(user_id));
  return (
    <>
      <Cont>
        {isMyBoard && (
          <>
            <Svg
              size="2.2rem"
              type="post"
              onClick={() => {
                setCreate(true);
                setModal(false);
              }}
            />
            <Svg
              size="2.2rem"
              type="setting"
              onClick={() => setModal((p) => !p)}
            />
          </>
        )}
      </Cont>
      <ModalBtn
        modal={modal}
        setEdit={setEdit}
        setModal={setModal}
        setAvatar={setAvatar}
      />
      {create && <CreatePost setCreate={setCreate} />}
    </>
  );
};
const Cont = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
