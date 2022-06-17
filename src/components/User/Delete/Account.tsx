import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';

export const DeleteAccount = ({ openDel, setOpenDel }: any) => {
  return (
    <>
      <Cont>
        <div className="flex">
          <h1>Delete Account</h1>
          <h2>* 계정을 삭제하면 복구가 불가합니다.</h2>
        </div>
        <Btn
          type="button"
          name="Delete"
          onClick={() => setOpenDel((p: boolean) => !p)}
        />
      </Cont>
    </>
  );
};
const Cont = styled.article`
  width: 700px;
  padding: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  color: ${(p) => p.theme.color.logo};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  .flex {
    gap: 10px;
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 600;
    h2 {
      font-size: 1rem;
      font-weight: 500;
    }
  }
`;
