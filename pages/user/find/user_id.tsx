import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { FormCont, Page } from '../../../styles/global';
import { Title } from '../../../src/components/Layout/Title';
import { Token } from '../../../src/components/User/Login/Verify/Token';
import { Email } from '../../../src/components/User/Login/Verify/Email';
import { FindLink } from '../../../src/components/User/Links/Find';
import { Result } from '../../../src/components/User/Login/Find/Result';

const FindUserId: NextPage = () => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(false);
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      <Title title="아이디 찾기" />
      <Cont>
        <Box>
          {!token && <Email setToken={setToken} />}
          {token && <Token setUserId={setUserId} setConfirm={setConfirm} />}
          <FindLink />
        </Box>
      </Cont>
      {confirm && <Result isUserID foundUserID={userId} />}
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
