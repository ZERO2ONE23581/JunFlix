import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from '../../../../Style/Button/IconBtn';

interface IEditBoardBGBtns {
  isWatch: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setOpenDelModal: Dispatch<SetStateAction<boolean>>;
}
export const BtnWrap = ({
  isWatch,
  setOpenModal,
  setOpenDelModal,
}: IEditBoardBGBtns) => {
  return (
    <>
      {isWatch && (
        <IconBtn
          size="2rem"
          type="button"
          svgType="save"
          onClick={() => setOpenModal(true)}
        />
      )}
      <IconBtn
        type="button"
        size="2.2rem"
        svgType="eraser"
        onClick={() => setOpenDelModal(true)}
      />
    </>
  );
};
