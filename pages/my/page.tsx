import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { Page } from '../../styles/global';
import useUser from '../../src/libs/client/useUser';
import { HeadTitle } from '../../src/components/Layout/Head';
import { useNeedLogin } from '../../src/libs/client/useTools';
import { MyList } from '../../src/components/User/Read/MyPage/List';
import { DashBoard } from '../../src/components/User/Read/MyPage/DashBoard';
import { Boards } from '../../src/components/User/Read/MyPage/Boards';

const MyPage: NextPage = () => {
  useNeedLogin();
  const { loggedInUser } = useUser();
  return (
    <>
      <HeadTitle title={`${loggedInUser?.username}'s Page`} />
      <Cont>
        <div className="info">
          <DashBoard />
          <Boards />
        </div>
        <MyList />
      </Cont>
    </>
  );
};
export default MyPage;

const Cont = styled(Page)`
  padding-top: 50px;
  .info {
    gap: 20px;
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    .boards,
    .dashboard {
      width: 100%;
      height: 330px;
      min-height: 330px;
      padding: 20px 40px;
      overflow-y: auto;
      ::-webkit-scrollbar {
        display: none;
      }
      border-radius: 5px;
      border: ${(p) => p.theme.border.thick};
      box-shadow: ${(p) => p.theme.boxShadow.nav};
      h1 {
        font-weight: 500;
        font-size: 1.6rem;
        span {
          margin-right: 20px;
        }
        .kor {
          font-size: 1.4rem;
        }
      }
    }
  }
`;
