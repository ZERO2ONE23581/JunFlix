import styled from '@emotion/styled';

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
