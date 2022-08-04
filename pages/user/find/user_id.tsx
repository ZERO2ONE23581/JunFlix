import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { FormCont, Page } from '../../../styles/global';
import { Token } from '../../../src/components/User/Read/Find/Token';
import { Email } from '../../../src/components/User/Read/Find/Email';
import { HeadTitle } from '../../../src/components/Layout/Head';
import { ConfirmModal } from '../../../src/components/Tools/Modal';
import { FindLink } from '../../../src/components/User/Read/Links/Find';

const FindUserId: NextPage = () => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(false);
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      <HeadTitle title="아이디 찾기" />
      <Cont>
        <Box>
          {!token && <Email setToken={setToken} />}
          {token && <Token setUserId={setUserId} setConfirm={setConfirm} />}
          <FindLink />
        </Box>
      </Cont>
      {confirm && <ConfirmModal type="find-user-id" USERID={userId} />}
    </>
  );
};
export default FindUserId;

const Cont = styled(Page)`
  padding: 10% 35%;
`;
const Box = styled(FormCont)`
  min-width: 450px;
`;
