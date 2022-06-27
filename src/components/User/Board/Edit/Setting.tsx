import { BtnWrap } from './BtnWrap';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from '../../../Style/Button/IconBtn';
import { ModalClose } from '../../../../../styles/global';

interface IBoardSettingProps {
  onEdit: boolean;
  onSetting: boolean;
  setOnEdit: Dispatch<SetStateAction<boolean>>;
  setCancelEdit: Dispatch<SetStateAction<boolean>>;
  setOnDelete: Dispatch<SetStateAction<boolean>>;
  setOnCreate: Dispatch<SetStateAction<boolean>>;
  setOnSetting: Dispatch<SetStateAction<boolean>>;
}
export const Setting = ({
  onEdit,
  onSetting,
  setOnEdit,
  setCancelEdit,
  setOnDelete,
  setOnCreate,
  setOnSetting,
}: IBoardSettingProps) => {
  return (
    <>
      <Cont>
        {!onEdit ? (
          <IconBtn
            type="button"
            svgType="setting"
            isClicked={onSetting}
            onClick={() => setOnSetting((p) => !p)}
          />
        ) : (
          <>
            <IconBtn
              type="button"
              svgType="edit-thin"
              isClicked={onEdit}
              onClick={() => setCancelEdit(true)}
            />
          </>
        )}
        {onSetting && (
          <BtnWrap
            setOnEdit={setOnEdit}
            setOnDelete={setOnDelete}
            setOnCreate={setOnCreate}
            setOnSetting={setOnSetting}
          />
        )}
      </Cont>
      {onSetting && (
        <ModalClose zIndex={100} onClick={() => setOnSetting(false)} />
      )}
    </>
  );
};
const Cont = styled.article`
  z-index: 200;
  position: relative;
  svg {
    fill: white;
  }
`;
