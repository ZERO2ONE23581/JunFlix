import { Logo } from './Logo';
import { Menu } from './Menu';
import styled from '@emotion/styled';
import { Layout } from '../../../../styles/global';
import useUser from '../../../libs/client/useUser';
import { LoggedIn } from './Logged';
import { UnLoggedIn } from './NotLogged';

export const Header = () => {
  const { isLoggedIn } = useUser();
  return (
    <Cont>
      <Logo />
      <div className="flex">
        <Menu />
        <article className="isLoggedIn">
          {isLoggedIn && <LoggedIn />}
          {!isLoggedIn && <UnLoggedIn />}
        </article>
      </div>
    </Cont>
  );
};
const Cont = styled(Layout)`
  gap: 50px;
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border-bottom: ${(p) => p.theme.border.thin};
  .flex {
    gap: 40px;
    width: 100%;
    display: flex;
    font-size: 1.2rem;
    align-items: center;
    justify-content: space-between;
    .isLoggedIn {
      position: relative;
    }
  }
`;
