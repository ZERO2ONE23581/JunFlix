import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { FormCont, Page } from '../../../styles/global';
import { FindLink } from '../../../src/components/User/Read/Links/Find';
import { Token } from '../../../src/components/User/Read/Find/Token';
import { UserId } from '../../../src/components/User/Read/Find/UserId';
import { CreatePassword } from '../../../src/components/User/Create/Password';
import { HeadTitle } from '../../../src/components/Layout/Head';
import { ConfirmModal } from '../../../src/components/Tools/Modal';

const FindUserPassword: NextPage = () => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [closeModal, setcloseModal] = useState(false);
  return (
    <>
      <HeadTitle title="비밀번호 찾기" />
      <Cont>
        <Box>
          {!token && <UserId setToken={setToken} />}
          {token && !confirm && (
            <Token setConfirm={setConfirm} setUserId={setUserId} />
          )}
          {confirm && (
            <CreatePassword userId={userId} setcloseModal={setcloseModal} />
          )}
          <FindLink />
        </Box>
      </Cont>
      {closeModal && <ConfirmModal type="find-user-password" />}
    </>
  );
};

export default FindUserPassword;

const Cont = styled(Page)`
  padding: 10% 32%;
`;
const Box = styled(FormCont)`
  min-width: 450px;
`;
