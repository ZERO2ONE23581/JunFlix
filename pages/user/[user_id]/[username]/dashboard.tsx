import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Page } from '../../../../styles/global';
import { IData } from '../../../../src/types/global';
import useUser from '../../../../src/libs/client/useUser';
import { HeadTitle } from '../../../../src/components/Layout/Head';
import { UserList } from '../../../../src/components/User/Read/DashBoard/List';
import { Profile } from '../../../../src/components/User/Read/DashBoard/Profile';
import { Boards } from '../../../../src/components/User/Read/DashBoard/Following/Boards';
import { Svg } from '../../../../src/components/Tools/Svg';
import { useState } from 'react';
import { ConfirmModal } from '../../../../src/components/Tools/Modal';
import { FollowModal } from '../../../../src/components/Tools/Modal/Follow';

const DashBoard: NextPage = () => {
  const router = useRouter();
  const { user_id } = router.query;
  const { data } = useSWR<IData>(user_id && `/api/user/${user_id}`);
  const [modal, setModal] = useState(false);
  return (
    <>
      <HeadTitle title={`${data?.User?.username}'s Page`} />
      <Cont>
        <h1>{data?.User?.username}'s Dashboard</h1>
        <Flex>
          <Profile
            name={data?.User?.name!}
            email={data?.User?.email!}
            userId={data?.User?.userId!}
            avatar={data?.User?.avatar!}
          />
          <Boards />
        </Flex>
        <Svg type="lock" size="2.2rem" onClick={() => setModal(true)} />
        <Blur>
          <UserList username={data?.User?.username!} />
        </Blur>
      </Cont>
      {modal && (
        <FollowModal
          closeModal={setModal}
          onClick
          type={{ user: { follow: true, name: data?.User?.username! } }}
        />
      )}
    </>
  );
};
export default DashBoard;

const Cont = styled(Page)`
  padding-top: 50px;
  > h1 {
    font-size: 2rem;
    padding-left: 15px;
    padding-bottom: 15px;
  }
  .lock {
    z-index: 1;
    top: 55%;
    left: 50%;

    position: absolute;
    transform: translate(-50%, 0%);
  }
`;
const Blur = styled.div`
  border: 10px solid blue;
  filter: blur(5px);
`;
const Flex = styled.div`
  gap: 20px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  .box-profile,
  .box-followingBoards {
    width: 100%;
    overflow-y: auto;
    min-height: 350px;
    padding: 30px 40px;
    border-radius: 5px;
    border: ${(p) => p.theme.border.thick};
    box-shadow: ${(p) => p.theme.boxShadow.nav};
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
