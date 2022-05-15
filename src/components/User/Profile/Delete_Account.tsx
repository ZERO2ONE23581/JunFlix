import styled from '@emotion/styled';
import { useState } from 'react';
import { ModalClose, ModalCont } from '../../../../styles/modal-style';
import useMutation from '../../../libs/client/useMutation';
import { Btn } from '../../Btn';

export const Delete_Account = () => {
  //Post
  const [postDelete, { data, loading }] = useMutation(
    `/api/user/profile/delete`
  );

  //Open Modal
  const [openModal, setOpenModal] = useState(false);
  const onClick = () => {
    setOpenModal(true);
  };

  //Delete Confirm
  const deleteConfirm = () => {
    if (loading) return;
    postDelete(true);
  };

  //
  return (
    <>
      {openModal && (
        <ModalCont>
          <Warning>
            <h1>계정을 삭제할 경우에는 복구가 불가능합니다.</h1>
            <p>(This is a permanent action and it can't be undone.</p>
            <p>
              After you delete your account no one will be able to recover it.)
            </p>
          </Warning>
          <Btn
            type="delete"
            onClick={deleteConfirm}
            btnName={loading ? 'Loading...' : 'Confirm Delete'}
          />
        </ModalCont>
      )}
      <Cont>
        <Btn onClick={onClick} type="delete" btnName="Delete Account" />
      </Cont>
      {openModal && <ModalClose onClick={() => setOpenModal(false)} />}
    </>
  );
};

const Warning = styled.article`
  border: 1px solid red;
  text-align: center;
  padding: 20px;
  width: 100%;
  h1 {
    margin-bottom: 10px;
  }
  p {
    font-size: 0.9rem;
  }
`;

const Cont = styled.section`
  border: 5px solid ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 30px;
`;
