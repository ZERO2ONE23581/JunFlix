import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../styles/global';
import { Title } from '../../../src/components/Layout/Title';
import { LoginForm } from '../../../src/components/User/Login';

const Login: NextPage = () => {
  return (
    <>
      <Title title="로그인" />
      <Cont>
        <LoginForm />
      </Cont>
    </>
  );
};
export default Login;

const Cont = styled(Page)`
  padding: 10% 35%;
`;
