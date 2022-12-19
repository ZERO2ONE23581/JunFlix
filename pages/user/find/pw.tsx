import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { FlexPage } from '../../../styles/global';
import { Head_ } from '../../../src/Tools/head_title';
import { NewPassord } from '../../../src/components/User/NewPassword';
import { Token } from '../../../src/components/User/Read/Verify/Token';
import { Result } from '../../../src/components/User/Read/Verify/result';
import { VerifyID } from '../../../src/components/User/Read/Verify/UserID';

const FindPassword: NextPage<{ theme: boolean }> = ({ theme }) => {
  const type = 'token_pw';
  const layoutId = 'find_pw';
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(false);
  const [modal, setModal] = useState(false);
  const [verify, setVerify] = useState(false);
  const isBox = token && !verify;
  const isNew = Boolean(token && userId);
  const __data = { theme, layoutId };
  return (
    <>
      <Head_ title="비밀번호 찾기" />
      <Cont>
        <VerifyID _data={{ theme, isBox: !token, setToken, layoutId }} />
        <Token _data={{ ...__data, isBox, setUserId, setVerify, type }} />
        <NewPassord
          _data={{ isBox: isNew, theme, userId, layoutId, setModal }}
        />
      </Cont>
      <Result _data={{ userId: 'isPassword', verify: modal, theme }} />
    </>
  );
};

export default FindPassword;

const Cont = styled(FlexPage)`
  flex-direction: column;
`;
