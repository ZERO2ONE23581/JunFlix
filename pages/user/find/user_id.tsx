import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { FormCont, Page } from '../../../styles/global';
import { Token } from '../../../src/components/User/Read/Find/Token';
import { Email } from '../../../src/components/User/Read/Find/Email';
import { FindLink } from '../../../src/components/User/Read/Links/Find';
import { Result } from '../../../src/components/Tools/Modal/user_find_result';
import { HeadTitle } from '../../../src/components/Layout/Head';

const FindUserId: NextPage = () => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(false);
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      <HeadTitle title="아이디 찾기" />
      <Cont>
        <Box>
          {!token && <Email setToken={setToken} />}
          {token && <Token setUserId={setUserId} setConfirm={setConfirm} />}
          <FindLink />
        </Box>
      </Cont>
      {confirm && <Result isUserID foundUserID={userId} />}
    </>
  );
};
export default FindUserId;

const Cont = styled(Page)`
  padding: 10% 35%;
`;
const Box = styled(FormCont)`
  min-width: 450px;
`;
