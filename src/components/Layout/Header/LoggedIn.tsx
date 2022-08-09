import Link from 'next/link';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Svg } from '../../Tools/Svg';
import useUser from '../../../libs/client/useUser';
import { ProfileAvatar } from '../../Avatar/Profile';
import { DimBackground } from '../../../../styles/global';

export const LoggedIn = () => {
  const { loggedInUser } = useUser();
  const [open, setOpen] = useState(false);
  return (
    <>
      <ProfileAvatar
        size="3.3rem"
        avatar={loggedInUser?.avatar}
        onClick={() => setOpen((p: boolean) => !p)}
      />
      {open && (
        <>
          <Modal onClick={() => setOpen(false)}>
            <List>
              <Link
                href={`/user/${loggedInUser?.id}/${loggedInUser?.username}/dashboard`}
              >
                <a>
                  <li>
                    <Svg type="home" size="2rem" />
                    <span>마이페이지</span>
                  </li>
                </a>
              </Link>
              <Link
                href={`/user/${loggedInUser?.id}/${loggedInUser?.username}/setting`}
              >
                <a>
                  <li>
                    <Svg type="setting" size="2rem" />
                    <span>설정</span>
                  </li>
                </a>
              </Link>
              <Link href="/api/user/logout">
                <a>
                  <li>
                    <Svg type="logout" size="2rem" />
                    <span>로그아웃</span>
                  </li>
                </a>
              </Link>
            </List>
          </Modal>
          <DimBackground zIndex={1} onClick={() => setOpen(false)} />
        </>
      )}
    </>
  );
};
const Modal = styled.article`
  top: 120%;
  right: 50%;
  z-index: 999;
  min-width: 180px;
  max-width: 300px;
  border-radius: 5px;
  position: absolute;
  transform: translate(50%, 0%);
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;
const List = styled.ul`
  padding: 5px 0;
  li {
    display: flex;
    font-size: 1.2rem;
    padding: 7px 20px;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    :hover {
      color: ${(p) => p.theme.color.font};
      background-color: ${(p) => p.theme.color.logo};
      svg {
        fill: ${(p) => p.theme.color.font};
      }
    }
    svg {
      pointer-events: none;
    }
  }
`;
