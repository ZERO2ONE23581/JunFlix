import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import useUser from '../../src/libs/client/useUser';
import { HeadTitle } from '../../src/components/Layout/Head';
import { useNeedLogin } from '../../src/libs/client/useTools';
import { Info } from '../../src/components/User/Read/MyPage/Info';
import { MyList } from '../../src/components/User/Read/MyPage/List';

const MyPage: NextPage = () => {
  useNeedLogin();
  const { loggedInUser } = useUser();
  return (
    <>
      <HeadTitle title={`${loggedInUser?.username}'s Page`} />
      <Cont>
        <section className="wrap">
          <Info />
          <MyList />
        </section>
      </Cont>
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
