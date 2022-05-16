import styled from '@emotion/styled';
import { Form, PageContainer } from './globalStyle';

export const ProEditPgCont = styled(PageContainer)`
  .form-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    form {
      background-color: red;
      height: 380px;
    }
  }
`;
