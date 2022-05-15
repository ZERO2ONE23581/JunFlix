import styled from '@emotion/styled';
import { Form, PageContainer } from './global-style';

export const ProEditPgCont = styled(PageContainer)`
  form {
    width: 500px;
    height: 380px;
  }
  .form-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    width: 240px;
  }
`;
export const InputsWrap = styled(InputWrap)`
  input,
  select {
    width: 160px;
  }
`;
