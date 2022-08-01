import { DashBoard } from '../DashBoard';
import { Boards } from './Boards';
import styled from '@emotion/styled';

export const Info = () => {
  return (
    <Cont>
      <DashBoard />
      <Boards />
    </Cont>
  );
};
const Cont = styled.article`
  gap: 20px;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  .boards,
  .dashboard {
    width: 100%;
    height: 330px;
    min-height: 330px;
    padding: 20px 40px;
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
    border-radius: 5px;
    border: ${(p) => p.theme.border.thick};
    box-shadow: ${(p) => p.theme.boxShadow.nav};
    h1 {
      font-weight: 500;
      font-size: 1.6rem;
      span {
        margin-right: 20px;
      }
      .kor {
        font-size: 1.4rem;
      }
    }
  }
`;
