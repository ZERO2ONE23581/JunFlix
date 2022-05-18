import { Btn } from '../../Btn';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ModalClose } from '../../../../styles/components/modal';
import useMutation from '../../../libs/client/useMutation';
import {
  Cont,
  DeleteModal,
  Desc,
} from '../../../../styles/components/deleteAcct';

export const Delete_Account = () => {
  const router = useRouter();

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
      {openModal && (
        <DeleteModal>
          <article>
            <h1>계정을 삭제할 경우에는 복구가 불가능합니다.</h1>
            <p>(This is a permanent action and it can't be undone.</p>
            <p>
              After you delete your account no one will be able to recover it.)
            </p>
          </article>
          <Btn
            type="delete"
            onClick={deleteConfirm}
            btnName={loading ? 'Loading...' : 'Confirm Delete'}
          />
        </DeleteModal>
      )}
      <Cont>
        <Desc>
          <h1>DANGER ZONE ⚠</h1>
          <span>"Action can't be undone after submit!"</span>
        </Desc>
        <Btn onClick={onClick} type="delete" btnName="Delete Account" />
      </Cont>
      {openModal && <ModalClose onClick={() => setOpenModal(false)} />}
    </>
  );
};
