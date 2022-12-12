import {
  useUser,
  useGetUser,
  useUserPrivate,
} from '../../../../src/libs/client/useUser';
import { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { IPage } from '../../../_app';
import { useRouter } from 'next/router';
import { Blur, Page } from '../../../../styles/global';
import { Head_ } from '../../../../src/Tools/head_title';
import { useCapLetter } from '../../../../src/libs/client/useTools';
import { Host } from '../../../../src/components/User/Read/MyPage/Host';
import { UserContent } from '../../../../src/components/User/Read/MyPage/Content';
import { UserBtns } from '../../../../src/components/User/Read/MyPage/Content/Btns';

const UserPage: NextPage<IPage> = ({ theme, setFixed }) => {
  const router = useRouter();
  const { user_id } = useUser();
  const host_id = Number(router.query.user_id!);
  const isMyAcct = Boolean(host_id === user_id);
  const [clicked, setClicked] = useState('posts');
  const { user: host, userId, username } = useGetUser(host_id);
  const { onPrivate, onClick, isBlur } = useUserPrivate(host_id, isMyAcct);
  return (
    <>
      <Head_ title={`${useCapLetter(username ? username : userId)}'s page`} />
      <Cont>
        <Host
          _mode={{ onPrivate, onClick }}
          _data={{ theme, host, isMyAcct, setFixed }}
        />
        <Layer>
          <Blur isBlur={isBlur}>
            <UserBtns _data={{ theme, clicked, setClicked }} />
            <UserContent _data={{ theme, clicked, setFixed }} />
          </Blur>
        </Layer>
      </Cont>
    </>
  );
};
export default UserPage;

const Layer = styled.section`
  margin-top: 2rem;
  //border: 5px solid blueviolet;
`;
const Cont = styled(Page)`
  padding: 1.1rem;
  min-width: 1200px;
`;
