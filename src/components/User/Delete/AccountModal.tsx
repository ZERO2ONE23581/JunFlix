import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import { Modal } from '../../../../styles/global';
import useUser from '../../../libs/client/useUser';
import useMutation from '../../../libs/client/useMutation';

interface IDeleteAccountProps {
  setOpenDel: Dispatch<SetStateAction<boolean>>;
}
export const DeleteAccountModal = ({ setOpenDel }: IDeleteAccountProps) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const clickYes = () => {
    if (loading) return;
    deleteAcct({});
  };
  const clickNo = () => {
    setOpenDel(false);
  };
  const [deleteAcct, { data, loading }] = useMutation(
    `/api/user/${loggedInUser?.id}/delete`
  );
  useEffect(() => {
    if (data?.ok) {
      alert('계정이 삭제되었습니다.');
      router.push('/');
    }
  }, [data, router]);
  return (
    <Modal>
      <h1>계정을 삭제할 경우에는 복구가 불가능합니다.</h1>
      <h2>삭제하시겠습니까?</h2>
      <div className="btn-wrap">
        <Btn name="YES" type="button" loading={loading} onClick={clickYes} />
        <Btn name="NO" type="button" onClick={clickNo} />
      </div>
    </Modal>
  );
};
