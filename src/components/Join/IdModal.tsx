import styled from '@emotion/styled';

export const IdModal = ({ toggleClick }: any) => {
  return (
    <>
      <ModalCont>
        <button onClick={toggleClick}>❌</button>
        <h1>메시지</h1>
        <div>
          <button>확인</button>
        </div>
      </ModalCont>
      <ModalClose onClick={toggleClick} />
    </>
  );
};
export const ModalCont = styled.article`
  position: absolute;
  top: 0;
  left: 0;
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
