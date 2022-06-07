import styled from '@emotion/styled';

export const ReplyBtn = ({ id, saveId, setSaveId }: any) => {
  //
  return (
    <Cont>
      <button disabled={saveId !== 0} onClick={() => setSaveId(id)}>
        Reply
      </button>
      <button onClick={() => setSaveId(0)}>Cancel</button>
    </Cont>
  );
};
const Cont = styled.article`
  display: flex;
  align-items: center;
  gap: 5px;
`;
