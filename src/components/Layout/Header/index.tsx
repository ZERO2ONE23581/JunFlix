import { Logo } from './Logo';
import { Menu } from './Menu';
import { Profile } from './Profile';
import styled from '@emotion/styled';
import { Layout } from '../../../../styles/global';

export const Header = () => {
  return (
    <Cont>
      <Logo />
      <div className="flex">
        <Menu />
        <Profile />
      </div>
    </Cont>
  );
};
const Cont = styled(Layout)`
  position: relative;
  margin-bottom: 5px;
  min-height: 74px;
  display: flex;
  align-items: center;
  border-bottom: ${(p) => p.theme.border.thin};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  .flex {
    width: 100%;
    min-width: 600px;
    margin-left: 160px;
    margin-right: 70px;
    gap: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2rem;
  }
`;
