import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { BG } from '../../../styles/global';
import { Head_ } from '../../../src/Tools/Title/Head';
import { useResponsive } from '../../../src/libs/client/useTools';
import { VerifyToken } from '../../../src/components/User/VerifyToken';
import { VerifyEmail } from '../../../src/components/VerifyEmail';
import { VerifyResult } from '../../../src/components/VerifyResult';

const FindID: NextPage<{ theme: boolean }> = ({ theme }) => {
  const type = 'token_id';
  const layoutId = 'find_id';
  const { isDesk } = useResponsive();
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(false);
  const [verify, setVerify] = useState(false);
  const isBox = token && !verify;
  const __data = { theme, layoutId };
  return (
    <>
      <Head_ title="아이디 찾기" />
      <Cont isDesk={isDesk}>
        <VerifyEmail _data={{ ...__data, isBox: !token, setToken }} />
        <VerifyToken _data={{ ...__data, isBox, setUserId, setVerify, type }} />
      </Cont>
      <VerifyResult _data={{ userId, verify, theme }} />
    </>
  );
};
export default FindID;

const Cont = styled(BG)`
  padding: 15vh 0;
  .box {
    margin: 0 auto;
    width: ${(p) => p.isDesk && 'fit-content'};
  }
  .title {
    font-size: ${(p) => (p.isDesk ? '2rem' : '4rem')};
    .kor {
      margin-left: 12px;
      font-size: ${(p) => (p.isDesk ? '1.5rem' : '3rem')};
    }
  }
  button {
    padding: 0.5rem;
    margin-top: 2rem;
    font-size: ${(p) => (p.isDesk ? '1.1rem' : '3rem')};
  }
`;
