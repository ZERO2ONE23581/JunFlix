import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Btn } from '../../../../Tools/Button';
import { IUserType } from '../../../../types/user';
import { ITheme } from '../../../../../styles/theme';
import useUser from '../../../../libs/client/useUser';
import { BtnWrap } from '../../../../../styles/global';
import { TweenTrans, variants } from '../../../../../styles/variants';
import useFollowUser from '../../../../libs/client/useFollowUser';
import { Avatar } from '../../../../Tools/Avatar';

interface IUserBox extends ITheme {
  host: IUserType;
}
export const Host = ({ theme, host }: IUserBox) => {
  const router = useRouter();
  const { loggedInUser, isLoggedIn } = useUser();
  const [modal, setModal] = useState(false);
  const isMeHost = Boolean(loggedInUser?.id === host?.id);
  const item = {
    theme,
    size: '10rem',
    preview: null,
    avatar: host?.avatar,
    onClick: () => router.push(`/user/${host.id}/${host.username}/profile`),
  };
  const clickBtn = (type: string) =>
    router.push(`/user/${host.id}/${host.username}/${type}`);
  //
  const [clickFollow, { post_data, btnName, isFollowing }] = useFollowUser(
    host?.id
  );
  console.log(post_data);
  return (
    <>
      {host && (
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          custom={theme}
          variants={variants}
          transition={TweenTrans}
          className="host-box"
        >
          <Avatar item={{ ...item }} />
          {!isMeHost && (
            <Btn
              type="button"
              onClick={clickFollow}
              item={{ theme, name: btnName, className: 'follow-btn' }}
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
    padding: 8px 15px;
    font-size: 1.1rem;
    width: fit-content;
    border-radius: 30px;
  }
`;
const HostBtns = styled(BtnWrap)`
  padding: 10px;
  button {
    font-size: 1rem;
    border-radius: 30px;
  }
`;
