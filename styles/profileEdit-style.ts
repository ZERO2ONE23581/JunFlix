import styled from '@emotion/styled';
import { Form } from './global-style';

export const AccountEditForm = styled(Form)`
  .input-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    select,
    input {
      width: 240px;
    }
  }
`;
export const UserInfoEditForm = styled(AccountEditForm)`
  /* .second-layer {
    input {
      width: 100%;
    }
    gap: 10px;
  } */
`;
