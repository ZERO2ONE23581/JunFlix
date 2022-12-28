import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { BG, FlexPage } from '../../../styles/global';
import { Head_ } from '../../../src/Tools/Title/Head';
import { Email } from '../../../src/components/User/Read/Verify/email';
import { Token } from '../../../src/components/User/Read/Verify/Token';
import { Result } from '../../../src/components/User/Read/Verify/result';
import { useResponsive } from '../../../src/libs/client/useTools';

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
        <Email _data={{ ...__data, isBox: !token, setToken }} />
        <Token _data={{ ...__data, isBox, setUserId, setVerify, type }} />
      </Cont>
      <Result _data={{ userId, verify, theme }} />
    </>
  );
};
export default FindID;

const Cont = styled(BG)`
  padding-top: 15vh;
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
