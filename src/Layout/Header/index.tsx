import { Logo } from './Logo';
import { UserMenu } from './User';
import styled from '@emotion/styled';
import { ITheme } from '../../../styles/theme';
import { MainMenu } from './Main';

export const Header = ({ theme }: ITheme) => {
  //
  return (
    <Cont className="header">
      <Logo />
      <div className="flex">
        <MainMenu theme={theme} />
        <UserMenu theme={theme} />
      </div>
    </Cont>
  );
};
const Cont = styled.header`
  gap: 3em;
  display: flex;
  font-size: 1.3em;
  margin-bottom: 5px;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border-bottom: ${(p) => p.theme.border.thin};
  background-color: ${(p) => p.theme.color.bg};
  .flex {
    width: 100%;
    gap: 10em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    //border: 5px solid cornflowerblue;
    .main-menu {
      width: 70%;
      //border: 2px solid yellow;
    }
    .user-menu {
      width: 30%;
      //border: 2px solid red;
      .isNotLogged {
      }
    }
    span {
      cursor: pointer;
    }
  }
`;
