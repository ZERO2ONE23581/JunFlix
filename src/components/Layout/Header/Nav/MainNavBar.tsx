import Link from 'next/link';
import { useState } from 'react';
import { NavTab } from './NavTab';
import styled from '@emotion/styled';
import { LogoSvg } from '../../../Style/Svg/Logo';
import { ModalClose } from '../../../../../styles/global';

export const MainNavBar = () => {
  const [type, setType] = useState('');
  const isTabbed = Boolean(
    type == 'movie' || type == 'board' || type == 'post' || type == 'review'
  );
  //
  return (
    <>
      <Cont>
        <Logo>
          <Link href="/">
            <a>
              <LogoSvg />
            </a>
          </Link>
        </Logo>
        <Nav>
          <NavTab type={type} setType={setType} title={'movie'} />
          <NavTab type={type} setType={setType} title={'board'} />
          <NavTab type={type} setType={setType} title={'post'} />
          <NavTab type={type} setType={setType} title={'review'} />
        </Nav>
      </Cont>
      {isTabbed && <ModalClose onClick={() => setType('')} />}
    </>
  );
};
const Cont = styled.article`
  gap: 50px;
  display: flex;
  align-content: center;
`;
const Logo = styled.div`
  a {
    img {
      width: 100px;
      height: 100px;
    }
  }
`;
const Nav = styled.nav`
  width: 400px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  .board {
    position: relative;
  }
`;
