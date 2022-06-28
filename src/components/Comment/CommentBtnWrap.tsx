import styled from '@emotion/styled';
import useUser from '../../../libs/client/useUser';

export const CommentBtnWrap = ({
  id,
  ownerId,
  saveId,
  setSaveId,
  setOpenReply,
  setOpenEdit,
  setOpenDelModal,
}: any) => {
  const { loggedInUser } = useUser();
  //
  const handleClick = (id: number, type: string) => {
    setSaveId(id);
    if (type === 'reply') {
      setOpenReply((p: boolean) => !p);
    }
    if (type === 'edit') {
      setOpenEdit((p: boolean) => !p);
    }
    if (type === 'delete') {
      setOpenDelModal((p: boolean) => !p);
    }
    if (type === 'cancel') {
      setSaveId(0);
      setOpenReply(false);
      setOpenEdit(false);
      setOpenDelModal(false);
    }
  };
  //
  return (
    <Cont>
      <Button disabled={saveId !== 0} onClick={() => handleClick(id, 'reply')}>
        Reply
      </Button>
      <Button disabled={saveId === 0} onClick={() => handleClick(id, 'cancel')}>
        Back
      </Button>
      {ownerId === loggedInUser?.id && (
        <>
          <Button
            disabled={saveId !== 0}
            onClick={() => handleClick(id, 'edit')}
          >
            Edit
          </Button>
          <Button
            disabled={saveId !== 0}
            onClick={() => handleClick(id, 'delete')}
          >
            Delete
          </Button>
        </>
      )}
    </Cont>
  );
};
const Cont = styled.article`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Button = styled.button<{ disabled: boolean }>`
  font-size: 0.9rem;
  width: 65px;
  height: 30px;
  color: ${(p) => (p.disabled ? '#909196' : p.theme.color.font)};
  background-color: ${(p) => (p.disabled ? '#F2F2F2' : '#2ecc71')};
`;
