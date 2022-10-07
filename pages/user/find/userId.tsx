import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../styles/global';
import { HeadTitle } from '../../../src/components/Head';
import { Token } from '../../../src/components/User/Find/Token';
import { Email } from '../../../src/components/User/Find/verify_email';
import { ResultModal } from '../../../src/components/User/Find/result_modal';

const Find_ID: NextPage<{ theme: boolean }> = ({ theme }) => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(false);
  const [verify, setVerify] = useState(false);
  return (
    <>
      <HeadTitle title="아이디 찾기" />
      <Cont>
        <Email isBox={!token} setToken={setToken} theme={theme} />
        <Token
          theme={theme}
          isBox={token && !verify}
          setUserId={setUserId}
          setVerify={setVerify}
        />
      </Cont>
      <ResultModal userId={userId} verified={verify} theme={theme} />
    </>
  );
};
export default Find_ID;

const Cont = styled(Page)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;
