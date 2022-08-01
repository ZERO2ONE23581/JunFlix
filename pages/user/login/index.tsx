import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../styles/global';
import { LoginForm } from '../../../src/components/User/Read';
import { HeadTitle } from '../../../src/components/Layout/Head';

const Login: NextPage = () => {
  return (
    <>
      <HeadTitle title="로그인" />
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
