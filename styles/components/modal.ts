import styled from '@emotion/styled';

export const ModalCont = styled.article`
  background-color: ${(p) => p.theme.color.bg};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border};
  border-radius: 10px;
  width: 700px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const UserIdCheckModalCont = styled(ModalCont)`
  width: 520px;
  height: 250px;
`;
export const JoinConfirmModalCont = styled(ModalCont)`
  width: 520px;
  height: 200px;
`;
export const FindConfirmModalCont = styled(ModalCont)`
  width: 500px;
  height: 200px;
`;
export const ModalClose = styled.article`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
`;
export const NavModalClose = styled(ModalClose)`
  background-color: rgba(0, 0, 0, 0);
`;
