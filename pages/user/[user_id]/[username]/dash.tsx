import useSWR from 'swr';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { BtnWrap, FlexPage } from '../../../../styles/global';
import { IGetUser } from '../../../../src/types/user';
import useUser from '../../../../src/libs/client/useUser';
import { HeadTitle } from '../../../../src/Tools/head_title';
import { Host } from '../../../../src/components/user/read/dash/Host';
import { FollowingBoards } from '../../../../src/components/user/read/dash/boards';
import { Btn } from '../../../../src/Tools/Button';

const DashBoard: NextPage<{ theme: boolean }> = ({ theme }) => {
  const router = useRouter();
  const { user_id } = router.query;
  const { loggedInUser } = useUser();
  const { data } = useSWR<IGetUser>(user_id && `/api/user/${user_id}`);
  const host = data?.user!;
  const username = data?.user?.username;
  const array = host?.followings.filter((e) => e.board_id);
  return (
    <>
      <HeadTitle title={`${username}'s Page`} />
      <Cont>
        <Host host={host} theme={theme} />
        <Btns className="control-btns">
          <Btn item={{ theme, name: 'Created' }} type="button" />
          <Btn item={{ theme, name: 'Saved ' }} type="button" />
          <Btn item={{ theme, name: 'Likes ' }} type="button" />
        </Btns>
      </Cont>
    </>
  );
};
export default DashBoard;
const Btns = styled(BtnWrap)`
  border: 2px solid yellow;
  button {
    width: fit-content;
  }
`;
const Cont = styled(FlexPage)`
  padding-top: 30px;
  gap: 20px;
  flex-direction: column;
  justify-content: flex-start;
  > article {
    padding: 20px;
  }
  .host-box {
    width: 100vw;
    border: 5px solid cornflowerblue;
  }
  .following-boards {
    width: 100vw;
    border: 5px solid orangered;
  }
  .lock {
    top: 65%;
    left: 50%;
    z-index: 1;
    position: absolute;
    transform: translate(-50%, 0%);
  }
`;
