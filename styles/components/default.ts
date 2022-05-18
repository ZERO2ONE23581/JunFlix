import styled from '@emotion/styled';

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

export const PageContainer = styled.section`
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  padding: 100px 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 1.2rem;
  .form-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
`;

export const Article = styled.article`
  background-color: ${(p) => p.theme.color.bg};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border};
  justify-content: center;
  align-content: center;
  border-radius: 8px;
  display: flex;
`;

export const Form = styled.form`
  background-color: ${(p) => p.theme.color.bg};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border};
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px 25px;
  display: flex;
  width: 330px;
`;
export const EditForm = styled(Form)`
  /* width: 330px;
  padding: 20px 100px; */
`;
export const H1 = styled.h1`
  span {
    font-weight: 500;
    font-style: italic;
  }
`;
export const Flex = styled.div`
  display: flex;
  gap: 13px;
  width: 200px;
`;

export const ErrMsg = styled.span`
  background-color: inherit;
  text-align: center;
  color: red;
  font-style: italic;
  font-size: 0.8rem;
  margin: 10px auto;
`;
export const OkMsg = styled(ErrMsg)`
  color: #2ecc71;
`;
export const DataResult = styled.div`
  background-color: inherit;
  text-align: center;
  margin-bottom: 10px;
`;

export const InputCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  label {
    font-size: 0.8em;
    margin-bottom: 5px;
  }
  select,
  input {
    background-color: ${(p) => p.theme.color.bg};
    box-shadow: ${(p) => p.theme.boxShadow.input};
    color: ${(p) => p.theme.color.font};
    border: ${(p) => p.theme.border};
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    &::placeholder {
      color: ${(p) => p.theme.color.font};
      font-style: italic;
    }
    &:focus {
      outline: 2px solid ${(p) => p.theme.color.font};
    }
  }
`;

export const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const Layer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
