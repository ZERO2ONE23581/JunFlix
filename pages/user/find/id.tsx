import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { FlexPage } from '../../../styles/global';
import { Head_ } from '../../../src/Tools/head_title';
import { Email } from '../../../src/components/User/Read/Verify/email';
import { Token } from '../../../src/components/User/Read/Verify/Token';
import { Result } from '../../../src/components/User/Read/Verify/result';

const FindID: NextPage<{ theme: boolean }> = ({ theme }) => {
  const type = 'token_id';
  const layoutId = 'find_id';
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(false);
  const [verify, setVerify] = useState(false);
  const isBox = token && !verify;
  const __data = { theme, layoutId };
  return (
    <>
      <Head_ title="아이디 찾기" />
      <Cont>
        <Email _data={{ ...__data, isBox: !token, setToken }} />
        <Token _data={{ ...__data, isBox, setUserId, setVerify, type }} />
      </Cont>
      <Result _data={{ userId, verify, theme }} />
    </>
  );
};
export default FindID;

const Cont = styled(FlexPage)`
  flex-direction: column;
`;
