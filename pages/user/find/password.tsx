import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../styles/global';
import { VerifyUserID } from '../../../src/components/user/read/verify/userId';
import { HeadTitle } from '../../../src/Tools/head_title';
import { VerifyToken } from '../../../src/components/user/read/verify/token';
import { VerifyResult } from '../../../src/components/user/read/verify/result';
import { CreatePassword } from '../../../src/components/user/create/password';

const FindPassword: NextPage<{ theme: boolean }> = ({ theme }) => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(false);
  const [verify, setVerify] = useState(false);
  const [modal, setModal] = useState(false);
  return (
    <>
      <HeadTitle title="비밀번호 찾기" />
      <Cont>
        <VerifyUserID theme={theme} isBox={!token} setToken={setToken} />
        <VerifyToken
          theme={theme}
          setUserId={setUserId}
          setVerify={setVerify}
          isBox={token && !verify}
          titleType="verify-token-password"
        />
        <CreatePassword
          theme={theme}
          isBox={verify}
          userId={userId}
          setModal={setModal}
        />
      </Cont>
      <VerifyResult userId={'isPassword'} verified={modal} theme={theme} />
    </>
  );
};

export default FindPassword;

const Cont = styled(Page)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;
