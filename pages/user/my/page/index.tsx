import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../../../styles/global';
import useUser from '../../../../src/libs/client/useUser';
import { Title } from '../../../../src/components/Layout/Title';
import { TopLayer } from '../../../../src/components/User/Profile/TopLayer';
import { MyList } from '../../../../src/components/User/Profile/MyList';

const MyPage: NextPage = () => {
  const { isLoggedIn, loggedInUser } = useUser();
  return (
    <>
      <Title title={`${loggedInUser?.username}'s Page`} />
      {isLoggedIn && (
        <Cont>
          <TopLayer />
          <MyList />
        </Cont>
      )}
      {!isLoggedIn && (
        <>
          <h1>로그인이 필요합니다!</h1>
        </>
      )}
    </>
  );
};
export default MyPage;

const Cont = styled(Page)``;
