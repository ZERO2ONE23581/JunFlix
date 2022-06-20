import styled from '@emotion/styled';

export const Page = styled.section`
  padding: 0 15%;
  font-size: 1.2rem;
  padding-bottom: 20px;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
export const FormCont = styled.article`
  padding: 30px 40px;
  border-radius: 8px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  h1 {
    font-weight: 700;
    font-size: 1.8rem;
    margin-bottom: 25px;
  }
`;
export const JoinCont = styled(FormCont)`
  h2,
  h3 {
    opacity: 0.8;
    font-weight: 500;
    font-size: 1.4rem;
    margin-bottom: 20px;
  }
  h3 {
    opacity: 0.6;
    font-size: 1.3rem;
  }
`;
export const FindCont = styled(JoinCont)``;

export const Form = styled.form`
  gap: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  h3 {
    opacity: 0.8;
    font-weight: 400;
    font-size: 1.2rem;
  }
  .flex {
    gap: 12px;
    width: 100%;
    display: flex;
    align-items: center;
    input {
      width: 100%;
    }
  }
`;
export const Info = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  color: ${(p) => p.theme.color.logo};
  span {
    display: block;
    margin-bottom: 5px;
  }
`;

export const Modal = styled.article`
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  //
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  //
  padding: 40px;
  border-radius: 10px;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  h1 {
    font-size: 30px;
    font-weight: 700;
  }
  h2 {
    opacity: 0.8;
    font-size: 20px;
    font-weight: 600;
  }
  .btn-wrap {
    gap: 10px;
    display: flex;
    align-items: center;
    button {
      font-weight: 600;
      width: 80px;
      height: 40px;
    }
  }
`;
export const ModalClose = styled.article`
  top: 0;
  left: 0;
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 130vh;
  background-color: rgba(0, 0, 0, 0.7);
`;
