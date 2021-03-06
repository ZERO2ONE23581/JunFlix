import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from '../../../Tools/Button/IconBtn';

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
    setChosenId(chosen_Id);
    if (type === 'edit') return setEdit(true);
    if (type === 'reply') return setReply(true);
    if (type === 'delete') return setDelete(true);
    if (type === 'cancel') {
      setChosenId(0);
      setEdit(false);
      setReply(false);
      setDelete(false);
    }
  };
  const isChosen = Boolean(chosenId !== 0);
  return (
    <Cont>
      <div className="btns">
        <IconBtn
          size="1.1rem"
          type="button"
          svgType="reply"
          isDisable={isChosen}
          onClick={() => handleClick(comment_id, 'reply')}
        />
        <IconBtn
          size="1.1rem"
          type="button"
          svgType="close"
          isDisable={!isChosen}
          onClick={() => handleClick(comment_id, 'cancel')}
        />
        {isMyComment && (
          <>
            <IconBtn
              size="1.1rem"
              svgType="pen"
              type="button"
              isDisable={isChosen}
              onClick={() => handleClick(comment_id, 'edit')}
            />
            <IconBtn
              size="1.1rem"
              type="button"
              svgType="trash"
              isDisable={isChosen}
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
