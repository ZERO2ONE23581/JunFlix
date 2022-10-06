import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Svg } from '../../../../Tools/Svg';

interface IBtnWrap {
  chosenId: number;
  comment_id: number;
  isMyComment: boolean;
  setChosenId: Dispatch<SetStateAction<number>>;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setReply: Dispatch<SetStateAction<boolean>>;
  setDelete: Dispatch<SetStateAction<boolean>>;
}
export const SettingBtns = ({
  chosenId,
  comment_id,
  isMyComment,
  setChosenId,
  setEdit,
  setReply,
  setDelete,
}: IBtnWrap) => {
  const handleClick = (chosen_Id: number, type: string) => {
    const isChosen = Boolean(chosenId !== 0);
    setChosenId(chosen_Id);
    if (type === 'edit') {
      if (isChosen) return;
      setEdit(true);
    }
    if (type === 'reply') {
      if (isChosen) return;
      setReply(true);
    }
    if (type === 'delete') {
      if (isChosen) return;
      setDelete(true);
    }
    if (type === 'cancel') {
      if (!isChosen) return;
      setChosenId(0);
      setEdit(false);
      setReply(false);
      setDelete(false);
    }
  };

  return (
    <Cont>
      <div className="btns">
        <Svg
          size="1.1rem"
          type="reply"
          onClick={() => handleClick(comment_id, 'reply')}
        />
        <Svg
          size="1.1rem"
          type="close"
          onClick={() => handleClick(comment_id, 'cancel')}
        />
        {isMyComment && (
          <>
            <Svg
              size="1.1rem"
              type="pen"
              onClick={() => handleClick(comment_id, 'edit')}
            />
            <Svg
              size="1.1rem"
              type="trash"
              onClick={() => handleClick(comment_id, 'delete')}
            />
          </>
        )}
      </div>
    </Cont>
  );
};
const Cont = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: end;
  /* border: 1px solid red; */
  .btns {
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
