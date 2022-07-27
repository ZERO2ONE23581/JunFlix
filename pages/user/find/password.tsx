import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { FormCont, Page } from '../../../styles/global';
import { Title } from '../../../src/components/Layout/Title';
import { FindLink } from '../../../src/components/User/Links/Find';
import { Result } from '../../../src/components/User/Login/Find/Result';
import { Token } from '../../../src/components/User/Login/Verify/Token';
import { UserId } from '../../../src/components/User/Login/Verify/UserId';
import { CreatePassword } from '../../../src/components/User/Login/Verify/Create/Password';

const FindUserPassword: NextPage = () => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Title title="비밀번호 찾기" />
      <Cont>
        <Box>
          {!token && <UserId setToken={setToken} />}
          {token && !confirm && (
            <Token setConfirm={setConfirm} setUserId={setUserId} />
          )}
          {confirm && (
            <CreatePassword userId={userId} setOpenModal={setOpenModal} />
          )}
          <FindLink />
        </Box>
      </Cont>
      {openModal && <Result isPassword />}
    </>
  );
};

export default FindUserPassword;

const Cont = styled(Page)`
  padding: 10% 32%;
`;
const Box = styled(FormCont)`
  min-width: 450px;
`;
