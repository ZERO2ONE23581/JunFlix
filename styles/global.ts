import styled from '@emotion/styled';

export const Default = styled.section`
  font-size: 1.3rem;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
export const Page = styled.section`
  padding: 10px 200px;
  height: 100%;
  .flex-row {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .flex-column {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .form-wrap {
    width: 420px;
  }
`;

export const FormCont = styled.section`
  padding: 20px 25px;
  border-radius: 8px;
  background-color: inherit;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  .btn-flex {
    display: flex;
    align-items: center;
    justify-content: end;
  }
`;
export const Form = styled.form`
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  label {
    display: none;
  }
  .info {
    width: 100%;
    font-size: 0.9;
    padding: 0 20px;
    text-align: left;
    font-size: 0.9rem;
    font-style: italic;
    color: ${(p) => p.theme.color.logo};
  }
  .flex {
    gap: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    input {
      width: 80%;
    }
  }
`;
export const Input = styled.input`
  color: black;
  font-size: 1rem;
  padding: 12px 20px;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  &::placeholder {
    font-size: 1rem;
    color: black;
    font-style: italic;
  }
  &:focus {
    outline: 2px solid ${(p) => p.theme.color.logo};
  }
`;
export const Select = styled.select`
  color: black;
  font-size: 1rem;
  padding: 12px 20px;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  &::placeholder {
    font-size: 1rem;
    color: black;
    font-style: italic;
  }
  &:focus {
    outline: 2px solid ${(p) => p.theme.color.logo};
  }
`;
export const Errors = styled.div`
  color: red;
  font-size: 1rem;
  font-weight: 600;
  font-style: italic;
  text-align: center;
  background-color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
  span {
    display: block;
    margin-bottom: 5px;
  }
`;
export const H1 = styled.h1`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 12px;
  margin: 20px auto;
`;
export const H2 = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 12px;
`;
export const H3 = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 12px;
`;
export const Modal = styled.article`
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  //
  width: 300px;
  height: 150px;
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  //
  border-radius: 10px;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
`;
export const ModalClose = styled.article`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  width: 100%;
  height: 130vh;
  top: 0;
  left: 0;
  z-index: 2;
`;
