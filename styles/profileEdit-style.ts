import styled from '@emotion/styled';
import { Form } from './global-style';

export const AccountEditForm = styled(Form)``;
export const UserInfoEditForm = styled(Form)`
  .input-wrap {
    input {
      width: 240px;
    }
    border: 1px solid red;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .second-layer {
    input {
      width: 100%;
    }
    gap: 10px;
  }
`;
