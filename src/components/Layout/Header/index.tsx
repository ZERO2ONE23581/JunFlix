import { NavBar } from './nav';
import { Btn } from '../../Button';
import styled from '@emotion/styled';
import { ProfileNav } from './user';
import { ModalClose } from '../../../../styles/modal';
import { useState } from 'react';

export const Header = ({ theme, themeClick }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <Cont>
      <div className="flex">
        <NavBar />
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
  font-weight: 700;
  padding: 10px 20%;
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
