import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';
import { useRouter } from 'next/router';
import useUser from '../../../libs/client/useUser';
import useMutation from '../../../libs/client/useMutation';

export const DeleteAccountModal = ({ setOpenDel }: any) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const clickConfirm = () => {
    if (loading) return;
    deleteAcct({});
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
    <Cont>
      <h2>계정을 삭제할 경우에는 복구가 불가능합니다.</h2>
      <h3>삭제하시겠습니까?</h3>
      <div className="flex">
        <Btn
          name="YES"
          type="button"
          loading={loading}
          onClick={clickConfirm}
        />
        <Btn name="No" type="button" onClick={() => setOpenDel(false)} />
      </div>
    </Cont>
  );
};
const Cont = styled.article`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);
  //
  gap: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  //
  height: 200px;
  padding: 20px 40px;
  border-radius: 8px;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  h2 {
    color: red;
    font-weight: 600;
    font-size: 1.3rem;
    text-align: center;
  }
  h3 {
    font-weight: 700;
    font-size: 1.2rem;
    text-align: center;
  }
  .flex {
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
