import styled from '@emotion/styled';
import { Btn } from '../../../../styles/btn';

export const CommentBtnWrap = ({
  id,
  saveId,
  setSaveId,
  setOpenReply,
  setOpenEdit,
}: any) => {
  const clickReply = (id: number) => {
    setSaveId(id);
    setOpenReply((p: boolean) => !p);
  };
  const clickCancel = () => {
    setSaveId(0);
    setOpenReply(false);
    setOpenEdit(false);
  };
  const clickEdit = (id: number) => {
    setSaveId(id);
    setOpenEdit((p: boolean) => !p);
  };
  //
  return (
    <Cont>
      <ReplyButton disabled={saveId !== 0} onClick={() => clickReply(id)}>
        Reply
      </ReplyButton>
      <ReplyButton disabled={saveId === 0} onClick={clickCancel}>
        Back
      </ReplyButton>
      <ReplyButton disabled={saveId !== 0} onClick={() => clickEdit(id)}>
        Edit
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
  width: 65px;
  height: 30px;
  color: ${(p) => (p.disabled ? '#909196' : p.theme.color.font)};
  background-color: ${(p) => (p.disabled ? '#F2F2F2' : '#2ecc71')};
`;
