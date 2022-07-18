import Link from 'next/link';
import styled from '@emotion/styled';
import { Svg } from '../../../Style/Svg/Svg';
import { DimBackground } from '../../../../../styles/global';

export const Modal = ({ setOpen }: any) => {
  return (
    <>
      <Cont onClick={() => setOpen(false)}>
        <List>
          <Link href="/user/my/page">
            <a>
              <li>
                <Svg type="home" size="2rem" />
                <span>마이페이지</span>
              </li>
            </a>
          </Link>
          <Link href="/user/my/profile/edit">
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
      </Cont>
      <DimBackground zIndex={1} onClick={() => setOpen(false)} />
    </>
  );
};
const Cont = styled.article`
  top: 120%;
  right: 50%;
  z-index: 2;
  position: absolute;
  transform: translate(50%, 0%);
  min-width: 180px;
  max-width: 300px;
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  border: 1px solid ${(p) => p.theme.color.logo};
`;
const List = styled.ul`
  padding: 5px 0;
  li {
    padding: 7px 20px;
    text-align: center;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
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
  a {
  }
`;
