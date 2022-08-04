import styled from '@emotion/styled';
import { InputWrap } from '../Tools/Input';
import { ConfirmModal } from '../Tools/Modal';
import { IUseform } from '../../types/global';
import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from '../Tools/Button/Icon';
import { SelectWrap } from '../Tools/Input/Select';

interface IInputs extends IUseform {
  isEdit?: boolean;
  loading?: boolean;
  delAvatar?: boolean;
  clickSave: () => void;
  setDelAvatar?: Dispatch<SetStateAction<boolean>>;
}
export const Inputs = ({
  watch,
  isEdit,
  register,
  clickSave,
  loading,
  delAvatar,
  setDelAvatar,
}: IInputs) => {
  return (
    <>
      <Cont>
        <InputWrap
          id="title"
          type="text"
          label="Review Title"
          watch={watch!('title')}
          register={register!('title')}
        />
        <InputWrap
          type="text"
          id="movieTitle"
          label="Movie Title"
          watch={watch!('movieTitle')}
          register={register!('movieTitle')}
        />
        <SelectWrap
          id="genre"
          watch={watch!('genre')}
          register={register!('genre')}
        />
        {isEdit && (
          <IconBtn
            size="2.5rem"
            type="button"
            svgType="eraser"
            onClick={() => setDelAvatar!((p) => !p)}
          />
        )}
        <IconBtn
          size="2.5rem"
          type="button"
          svgType="save"
          onClick={clickSave}
        />
      </Cont>
      {delAvatar && (
        <ConfirmModal
          loading={loading}
          closeModal={setDelAvatar}
          type="delete-review-avatar"
        />
      )}
    </>
  );
};
const Cont = styled.article`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  label {
    padding: 10px;
  }
  input {
    padding: 11px 20px;
  }
`;
