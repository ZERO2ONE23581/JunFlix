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
  margin: 0 auto;
  border: 5px solid black;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 600px;
  padding: 20px 40px;
`;
export const InputCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  select,
  input {
    width: 100%;
    padding: 10px;
    border: none;
    box-shadow: ${(p) => p.theme.boxShadow.nav};
    background-color: white;
    border-radius: 5px;
  }
`;
export const SelectCont = styled(InputCont)`
  select {
    option {
      border: 3px solid blue;
      border-radius: 5px;
    }
  }
`;
