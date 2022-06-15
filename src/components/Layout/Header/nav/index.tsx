import { Tab } from './tab';
import Link from 'next/link';
import { useState } from 'react';
import styled from '@emotion/styled';
import { LogoSvg } from '../../../Svg/Logo';
import { ModalClose } from '../../../../../styles/modal';

export const NavBar = () => {
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
          <Tab type={type} setType={setType} title={'movie'} />
          <Tab type={type} setType={setType} title={'board'} />
          <Tab type={type} setType={setType} title={'post'} />
          <Tab type={type} setType={setType} title={'review'} />
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
