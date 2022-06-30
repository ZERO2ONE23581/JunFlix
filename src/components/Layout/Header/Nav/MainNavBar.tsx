import { useState } from 'react';
import { NavTab } from './NavTab';
import styled from '@emotion/styled';
import { DimBackground } from '../../../../../styles/global';

export const MainNavBar = () => {
  const [type, setType] = useState('');
  const isTabbed = Boolean(
    type == 'movie' || type == 'board' || type == 'post' || type == 'review'
  );
  return (
    <>
      <Cont>
        <Nav>
          <NavTab type={type} setType={setType} title={'board'} />
          <NavTab type={type} setType={setType} title={'post'} />
          <NavTab type={type} setType={setType} title={'review'} />
          <NavTab type={type} setType={setType} title={'movie'} />
        </Nav>
      </Cont>
      {isTabbed && <DimBackground onClick={() => setType('')} />}
    </>
  );
};
const Cont = styled.article`
  gap: 50px;
  display: flex;
  align-content: center;
`;

const Nav = styled.nav`
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .board {
    position: relative;
  }
`;
