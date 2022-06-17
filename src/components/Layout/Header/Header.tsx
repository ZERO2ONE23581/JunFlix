import { useState } from 'react';
import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';
import { ProfileNav } from './My/ProfileNav';
import { MainNavBar } from './Nav/MainNavBar';
import { ModalClose } from '../../../../styles/global';

export const Header = ({ theme, themeClick }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <Cont>
      <div className="flex">
        <MainNavBar />
        <div className="usernav-bar-wrap">
          <ProfileNav open={open} setOpen={setOpen} />
          <Btn type="button" name={theme} onClick={themeClick} />
        </div>
      </div>
      {open && <ModalClose onClick={() => setOpen(false)} />}
    </Cont>
  );
};
const Cont = styled.section`
  padding: 10px 15%;
  font-weight: 700;
  margin-bottom: 5px;
  border-bottom: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .usernav-bar-wrap {
      gap: 40px;
      display: flex;
      align-items: center;
    }
  }
`;
