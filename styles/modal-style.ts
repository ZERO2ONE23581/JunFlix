import styled from '@emotion/styled';

export const ModalCont = styled.article`
  position: absolute;
  top: 0;
  left: 0;
  //
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //
  background-color: whitesmoke;
  z-index: 999;
  width: 700px;
  height: 300px;
`;
export const ModalClose = styled.article`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
`;
