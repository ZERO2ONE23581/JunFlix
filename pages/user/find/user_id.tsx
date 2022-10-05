import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../styles/global';
import { Token } from '../../../src/components/User/Read/Verify/Token';
import { Email } from '../../../src/components/User/Read/Verify/Email';
import { HeadTitle } from '../../../src/components/Head';
import { ConfirmModal } from '../../../src/components/Tools/Modal';

const FindUserId: NextPage = () => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(false);
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      <HeadTitle title="아이디 찾기" />
      <Cont>
        {!token && <Email setToken={setToken} />}
        {token && (
          <Token isFindID setUserId={setUserId} setConfirm={setConfirm} />
        )}
      </Cont>
      {confirm && (
        <ConfirmModal USERID={userId} type="find-user-id" closeModal={null} />
      )}
    </>
  );
};
export default FindUserId;

const Cont = styled(Page)`
  padding: 10% 35%;
`;
