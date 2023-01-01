import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { BG } from '../../../styles/global';
import { Head_ } from '../../../src/Tools/Title/Head';
import { useResponsive } from '../../../src/libs/client/useTools';
import { NewPassord } from '../../../src/components/User/NewPassword';
import { VerifyToken } from '../../../src/components/User/VerifyToken';
import { VerifyID } from '../../../src/components/VerifyID';
import { VerifyResult } from '../../../src/components/VerifyResult';

const FindPassword: NextPage<{ theme: boolean }> = ({ theme }) => {
  const type = 'token_pw';
  const layoutId = 'find_pw';
  const { isDesk } = useResponsive();
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
      <Cont isDesk={isDesk}>
        <VerifyID _data={{ theme, isBox: !token, setToken, layoutId }} />
        <VerifyToken _data={{ ...__data, isBox, setUserId, setVerify, type }} />
        <NewPassord
          _data={{ isBox: isNew, theme, userId, layoutId, setModal }}
        />
      </Cont>
      <VerifyResult _data={{ userId: 'isPassword', verify: modal, theme }} />
    </>
  );
};

export default FindPassword;

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
