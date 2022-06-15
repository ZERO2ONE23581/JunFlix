import { Btn } from '../../Button';
import styled from '@emotion/styled';
import { H1, H2 } from '../../../../styles/global';

export const DeleteAccount = ({ setOpenDel }: any) => {
  return (
    <Cont>
      <div className="flex">
        <div>
          <H1>Delete Account</H1>
          <H2>* This action can't be undone after submit.</H2>
        </div>
        <Btn name="계정삭제" type="button" onClick={() => setOpenDel(true)} />
      </div>
    </Cont>
  );
};
const Cont = styled.section`
  width: 80%;
  margin: 30px auto;
  border-radius: 5px;
  padding: 20px 100px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  h1,
  h2 {
    margin: 10px auto;
    color: ${(p) => p.theme.color.logo};
  }
`;
