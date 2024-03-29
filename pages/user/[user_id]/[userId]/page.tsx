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
import { Svg } from '../../../../src/Tools/Svg';
import { Blur, Page } from '../../../../styles/global';
import { Head_ } from '../../../../src/Tools/Title/Head';
import { MsgModal } from '../../../../src/Tools/Modal/Message';
import { useLogin } from '../../../../src/libs/client/useLogin';
import { UseCapLetter } from '../../../../src/libs/client/useTools';
import useFollowUser from '../../../../src/libs/client/useFollow/user';
import { UserContent } from '../../../../src/components/UserContent';
import { UserBtns } from '../../../../src/components/UserBtns';
import { UserHost } from '../../../../src/components/UserHost';

const UserPage: NextPage<IPage> = ({ theme }) => {
  useLogin();
  const router = useRouter();
  const { user_id } = useUser();
  const host_id = Number(router.query.user_id!);
  const isMyAcct = Boolean(host_id === user_id);
  const [clicked, setClicked] = useState('posts');
  const { isFollowing } = useFollowUser(host_id);
  const { user: host, userId, username } = useGetUser(host_id);
  const { onPrivate, onClick, isBlur } = useUserPrivate(host_id, isMyAcct);
  const [msg, setMsg] = useState('');
  const IsBlur = !isFollowing && isBlur;
  const onSvg = () => setMsg('blur_user');
  return (
    <>
      <Head_ title={`${UseCapLetter(username ? username : userId)}'s page`} />
      <Cont>
        <UserHost
          _mode={{ onPrivate, onClick }}
          _data={{ theme, host, isMyAcct }}
        />
        <Layer>
          {IsBlur && (
            <>
              <MsgModal _data={{ msg, theme }} />
              <Svg type="lock" theme={theme} onClick={onSvg} />
            </>
          )}
          <Blur isBlur={IsBlur}>
            <UserBtns _data={{ theme, clicked, setClicked }} />
            <UserContent _data={{ theme, clicked }} />
          </Blur>
        </Layer>
      </Cont>
    </>
  );
};
export default UserPage;

const Layer = styled.section`
  margin-top: 2rem;
  position: relative;
  .lock {
    top: 50%;
    left: 50%;
    z-index: 1;
    position: absolute;
  }
`;
const Cont = styled(Page)`
  padding: 2rem;
`;
