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
  gap: 3rem;
  display: flex;
  font-size: 1.3em;
  margin-bottom: 5px;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${(p) => p.theme.border.thin};
  //border: 10px solid hotpink;
  .logo {
    //border: 5px solid cornflowerblue;
  }
  .flex {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    //border: 5px solid cornflowerblue;
    .main-menu {
      width: 60%;
      //border: 2px solid yellow;
    }
    .user-menu {
      //border: 2px solid red;
      .logged-in {
        //border: 2px solid yellow;
      }
      .unlogged-in {
        //border: 2px solid yellow;
      }
    }
    span {
      cursor: pointer;
    }
  }
`;
