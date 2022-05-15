import styled from '@emotion/styled';

export const ModalCont = styled.article`
  border: 5px solid ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  width: 700px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
`;

export const ModalClose = styled.article`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
`;
export const NavModalClose = styled(ModalClose)`
  background-color: rgba(0, 0, 0, 0);
`;
