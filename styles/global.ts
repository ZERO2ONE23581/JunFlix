import styled from '@emotion/styled';

export const Page = styled.section`
  margin: 0 auto;
  height: 100vh;
  padding: 20% 10%;
  font-size: 1.3rem;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
export const FormCont = styled.section`
  padding: 20px 25px;
  border-radius: 8px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  h1 {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 10px;
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
export const Errors = styled.div`
  color: red;
  font-size: 1rem;
  font-weight: 600;
  font-style: italic;
  background-color: inherit;
`;
