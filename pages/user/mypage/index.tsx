import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../../styles/global';
import useUser from '../../../src/libs/client/useUser';
import { MyList } from '../../../src/components/User/MyPage/MyList';
import { Info } from '../../../src/components/User/MyPage/Info';
import { HeadTitle } from '../../../src/components/Title/Head';

const MyPage: NextPage = () => {
  const { isLoggedIn, loggedInUser } = useUser();
  return (
    <>
      <HeadTitle title={`${loggedInUser?.username}'s Page`} />
      {isLoggedIn && (
        <Cont>
          <section className="wrap">
            <Info />
            <MyList />
          </section>
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

const Cont = styled(Page)`
  padding: 3% 12% 5%;
  .wrap {
    min-width: 1200px;
  }
`;
