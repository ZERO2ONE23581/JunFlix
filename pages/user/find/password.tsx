import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../styles/global';
import { Token } from '../../../src/components/User/Find/Token';
import { VerifyUserID } from '../../../src/components/User/Find/verify_userId';
import { NewPassword } from '../../../src/components/User/Create/Password';
import { HeadTitle } from '../../../src/components/Head';
import { ResultModal } from '../../../src/components/User/Find/result_modal';

const Find_Password: NextPage<{ theme: boolean }> = ({ theme }) => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(false);
  const [verify, setVerify] = useState(false);
  const [modal, setModal] = useState(false);
  return (
    <>
      <HeadTitle title="비밀번호 찾기" />
      <Cont>
        <VerifyUserID theme={theme} isBox={!token} setToken={setToken} />
        <Token
          theme={theme}
          setUserId={setUserId}
          setVerify={setVerify}
          isBox={token && !verify}
        />
        <NewPassword
          theme={theme}
          isBox={verify}
          userId={userId}
          setModal={setModal}
        />
      </Cont>
      <ResultModal userId={'isPassword'} verified={modal} theme={theme} />
    </>
  );
};

export default Find_Password;

const Cont = styled(Page)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  .result-modal {
    width: fit-content;
    height: fit-content;
  }
`;
