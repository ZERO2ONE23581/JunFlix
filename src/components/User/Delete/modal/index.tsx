import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Btn } from '../../../Button';
import { useRouter } from 'next/router';
import useUser from '../../../../libs/client/useUser';
import useMutation from '../../../../libs/client/useMutation';

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
      <h1>계정을 삭제할 경우에는 복구가 불가능합니다.</h1>
      <h2>삭제하시겠습니까?</h2>
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
  top: 50%;
  left: 50%;
  gap: 10px;
  z-index: 999;
  height: 200px;
  display: flex;
  position: absolute;
  padding: 20px 40px;
  border-radius: 8px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  transform: translate(-50%, -50%);
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  h1 {
    font-size: 1.3rem;
    font-weight: 700;
  }
  h2 {
    color: red;
    font-weight: 600;
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
