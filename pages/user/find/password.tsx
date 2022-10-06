import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Box, Page } from '../../../styles/global';
import { FindLink } from '../../../src/components/User/Read/Links/Find';
import { Token } from '../../../src/components/User/Read/Verify/Token';
import { VerifyUserId } from '../../../src/components/User/Read/Verify/UserID';
import { CreatePassword } from '../../../src/components/User/Create/Password';
import { HeadTitle } from '../../../src/components/Head';
import { ConfirmModal } from '../../../src/Tools/Modal';

const FindUserPassword: NextPage = () => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [closeModal, setcloseModal] = useState(false);
  return (
    <>
      <HeadTitle title="비밀번호 찾기" />
      <Cont>
        {!token && <VerifyUserId setToken={setToken} />}
        {token && !confirm && (
          <Token isFindPW setConfirm={setConfirm} setUserId={setUserId} />
        )}
        {confirm && (
          <CreatePassword userId={userId} setcloseModal={setcloseModal} />
        )}
      </Cont>
      {closeModal && <ConfirmModal type="find-user-password" />}
    </>
  );
};

export default FindUserPassword;

const Cont = styled(Page)`
  padding: 10% 34%;
`;
