import styled from '@emotion/styled';
import { Btn } from '../../../../../styles/btn';

export const ReplyBtn = ({ id, saveId, setSaveId }: any) => {
  //
  return (
    <Cont>
      <ReplyButton disabled={saveId !== 0} onClick={() => setSaveId(id)}>
        Reply
      </ReplyButton>
      <ReplyButton disabled={saveId === 0} onClick={() => setSaveId(0)}>
        Back
      </ReplyButton>
    </Cont>
  );
};
const Cont = styled.article`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const ReplyButton = styled(Btn)<{ disabled: boolean }>`
  font-size: 0.9rem;
  padding: 8px 20px;
  color: ${(p) => (p.disabled ? '#909196' : p.theme.color.font)};
  background-color: ${(p) => (p.disabled ? '#F2F2F2' : '#2ecc71')};
`;
