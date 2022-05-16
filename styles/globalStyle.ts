import styled from '@emotion/styled';

export const PageContainer = styled.section`
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  padding: 10px 100px;
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 20px;
  font-size: 1.2rem;
`;

export const BodyBg = styled.div`
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  position: absolute;
  top: 0;
  left: 0;
  z-index: -999;
  width: 100vw;
  height: 100vh;
`;
export const ErrMsg = styled.span`
  background-color: inherit;
  text-align: center;
  color: red;
  font-style: italic;
`;
export const OkMsg = styled(ErrMsg)`
  color: #2ecc71;
`;
export const Form = styled.form`
  background-color: ${(p) => p.theme.color.bg};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border};
  border-radius: 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 25px;
  /* width: 500px; */
`;
export const InputCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  label {
    font-size: 1rem;
    margin-bottom: 5px;
  }
  select,
  input {
    background-color: ${(p) => p.theme.color.bg};
    box-shadow: ${(p) => p.theme.boxShadow.input};
    color: ${(p) => p.theme.color.font};
    border: ${(p) => p.theme.border};
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    &:focus {
      outline: 2px solid ${(p) => p.theme.color.font};
    }
  }
`;
export const SelectCont = styled(InputCont)`
  select {
    width: 210px;
  }
`;

export const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  input {
    width: 210px;
  }
`;
