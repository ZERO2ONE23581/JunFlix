import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Btn } from '../../../../Tools/Button';
import { Avatar } from '../../../../Tools/Avatar';
import { IUserType } from '../../../../types/user';
import { ITheme } from '../../../../../styles/theme';
import useUser from '../../../../libs/client/useUser';
import { BtnWrap } from '../../../../../styles/global';
import useFollow from '../../../../libs/client/useFollow';

interface IUserBox extends ITheme {
  host: IUserType;
}
export const Host = ({ theme, host }: IUserBox) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const isMeHost = Boolean(loggedInUser?.id === host?.id);
  const { onClick, name, isFollowing } = useFollow(host && host.id, 'user');
  const clickBtn = (type: string) =>
    router.push(`/user/${host.id}/${host.username}/${type}`);
  const clickAvatar = () => router.push(`/user/${host && host.id}/dash`);
  //
  return (
    <>
      {host && (
        <Cont className="host">
          <Avatar
            onClick={clickAvatar}
            item={{ theme, size: '10rem', preview: null, avatar: host?.avatar }}
          />
          {!isMeHost && (
            <Btn
              type="button"
              onClick={onClick}
              item={{ theme, name, isFollowing, className: 'follow-btn' }}
            />
          )}
          {isMeHost && (
            <HostBtns className="host-btns">
              <Btn
                type="button"
                item={{ theme, name: 'Edit' }}
                onClick={() => clickBtn('update')}
              />
              <Btn
                type="button"
                item={{ theme, name: 'Profile' }}
                onClick={() => clickBtn('profile')}
              />
            </HostBtns>
          )}
        </Cont>
      )}
    </>
  );
};

const Cont = styled(motion.article)`
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .follow-btn {
    padding: 8px 30px;
    font-size: 1.1rem;
    width: fit-content;
    border-radius: 30px;
  }
`;
const HostBtns = styled(BtnWrap)`
  width: fit-content;
  padding: 10px;
  button {
    width: 90px;
    font-size: 1.05rem;
    border-radius: 30px;
  }
`;
