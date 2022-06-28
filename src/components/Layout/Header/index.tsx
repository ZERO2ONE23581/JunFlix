import { useState } from 'react';
import { Logo } from './Nav/Logo';
import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';
import { ProfileNav } from './My/ProfileNav';
import { MainNavBar } from './Nav/MainNavBar';
import { LayoutPage, ModalClose } from '../../../../styles/global';

interface IHeaderProps {
  theme: string;
  themeClick: () => void;
}
export const Header = ({ theme, themeClick }: IHeaderProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Cont>
      <div className="flex">
        <div className="flex logo">
          <Logo />
          <MainNavBar />
        </div>
        <div className="flex profile">
          <ProfileNav open={open} setOpen={setOpen} />
          <Btn type="button" name={theme} onClick={themeClick} />
        </div>
      </div>
      {open && <ModalClose onClick={() => setOpen(false)} />}
    </Cont>
  );
};
const Cont = styled(LayoutPage)`
  margin-bottom: 5px;
  border-bottom: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo,
    .profile {
      justify-content: start;
      gap: 40px;
    }
  }
`;
