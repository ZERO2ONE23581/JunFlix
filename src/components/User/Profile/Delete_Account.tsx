import { Btn } from '../../Btn';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useMutation from '../../../libs/client/useMutation';
import { ModalClose } from '../../../../styles/components/modal';
import useUser from '../../../libs/client/loggedInUser';
import styled from '@emotion/styled';
import {
  DeleteModalCont,
  Desc,
} from '../../../../styles/components/deleteAcct';

export const Delete_Account = () => {
  const router = useRouter();
  const { loggedInUserId } = useUser();

  //Post
  const [deleteAcct, { data, loading }] = useMutation(
    `/api/user/${loggedInUserId}/delete`
  );

  //Open Modal
  const [openModal, setOpenModal] = useState(false);
  const onClick = () => {
    setOpenModal(true);
  };

  //Delete Confirm
  const deleteConfirm = () => {
    if (loading) return;
    deleteAcct(true);
  };

  //UI
  useEffect(() => {
    if (data?.ok) {
      alert('계정이 삭제되었습니다.');
      router.push('/');
    }
  }, [data]);
  //
  return (
    <>
      <>
        {openModal && (
          <DeleteModalCont>
            <article>
              <h1>계정을 삭제할 경우에는 복구가 불가능합니다.</h1>
              <p>(This is a permanent action and it can't be undone.</p>
              <p>
                After you delete your account no one will be able to recover
                it.)
              </p>
            </article>
            <Btn
              type="delete"
              onClick={deleteConfirm}
              btnName={loading ? 'Loading...' : 'Confirm Delete'}
            />
          </DeleteModalCont>
        )}
      </>
      <Cont>
        <Desc>
          <h1>DANGER ZONE ⚠</h1>
          <span>"Action can't be undone after submit!"</span>
        </Desc>
        <Btn
          onClick={onClick}
          type="delete"
          btnName="Delete Account"
          loading={loading}
        />
      </Cont>
      {openModal && <ModalClose onClick={() => setOpenModal(false)} />}
    </>
  );
};
const Cont = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  padding: 20px 100px;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  h1 {
    font-size: 1.3em;
  }
`;
