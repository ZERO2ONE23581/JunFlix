import styled from '@emotion/styled';
import { ModalCont } from './modal';

export const Cont = styled.section`
  background-color: ${(p) => p.theme.color.bg};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border};
  border-radius: 5px;
  padding: 20px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 1.3em;
  }
`;
export const Desc = styled.article`
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.logo};
  background-color: ${(p) => p.theme.color.bg};
  border: ${(p) => p.theme.border};
  border-radius: 5px;
  text-align: center;
  padding: 20px;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  h1 {
    font-weight: 600;
  }
  span {
    font-style: italic;
    font-size: 0.8em;
  }
  &:hover {
    background-color: ${(p) => p.theme.color.logo};
    color: ${(p) => p.theme.color.bg};
  }
`;
export const DeleteModal = styled(ModalCont)`
  article {
    margin-bottom: 10px;
  }
  h1 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  p {
    color: ${(p) => p.theme.color.logo};
    text-align: center;
    font-size: 0.9em;
  }
  &:hover {
    background-color: ${(p) => p.theme.color.logo};
    color: ${(p) => p.theme.color.bg};
    p {
      color: ${(p) => p.theme.color.bg};
    }
  }
`;
