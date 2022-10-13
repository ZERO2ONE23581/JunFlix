import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../styles/global';
import { HeadTitle } from '../../../src/Tools/head_title';
import { VerifyToken } from '../../../src/components/user/read/verify/token';
import { VerifyEmail } from '../../../src/components/user/read/verify/email';
import { VerifyResult } from '../../../src/components/user/read/verify/result';

const FindUserId: NextPage<{ theme: boolean }> = ({ theme }) => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(false);
  const [verify, setVerify] = useState(false);
  return (
    <>
      <HeadTitle title="아이디 찾기" />
      <Cont>
        <VerifyEmail isBox={!token} setToken={setToken} theme={theme} />
        <VerifyToken
          theme={theme}
          setUserId={setUserId}
          setVerify={setVerify}
          isBox={token && !verify}
          titleType="verify-token-userId"
        />
      </Cont>
      <VerifyResult userId={userId} verified={verify} theme={theme} />
    </>
  );
};
export default FindUserId;

const Cont = styled(Page)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;
