import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import { Container } from '../../../../styles/global';

interface IDeleteAccountProps {
  setOpenDel: Dispatch<SetStateAction<boolean>>;
}
export const DeleteAccount = ({ setOpenDel }: IDeleteAccountProps) => {
  return (
    <Cont>
      <div className="flex">
        <div>
          <h1>Delete Account</h1>
          <h2>* 계정을 삭제하면 복구가 불가합니다.</h2>
        </div>
        <Btn
          type="button"
          name="Delete"
          onClick={() => setOpenDel((p: boolean) => !p)}
        />
      </div>
    </Cont>
  );
};
const Cont = styled(Container)`
  .flex {
    justify-content: space-between;
    h1 {
      margin-bottom: 10px;
    }
    button {
      width: 100px;
      font-weight: 600;
    }
  }
`;
