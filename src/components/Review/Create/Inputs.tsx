import styled from '@emotion/styled';
import { InputWrap } from '../../Style/Input';
import { IUseform } from '../../../types/global';
import { IconBtn } from '../../Style/Button/IconBtn';
import { SelectWrap } from '../../Style/Input/SelectWrap';
import { MutationRes } from '../../../types/mutation';
import { DeleteBG } from '../Delete/Background';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IInputs extends IUseform {
  isEdit?: boolean;
  clickSave: () => void;
  delData?: MutationRes;
  setRemoveBG?: Dispatch<SetStateAction<boolean>>;
}
export const Inputs = ({
  watch,
  register,
  isEdit,
  delData,
  clickSave,
  setRemoveBG,
}: IInputs) => {
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (delData?.data) setModal(false);
    if (delData?.data?.ok) alert('사진을 삭제했습니다.');
  }, [delData?.data]);

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
            onClick={() => setModal((p) => !p)}
          />
        )}
        <IconBtn
          size="2.5rem"
          type="button"
          svgType="save"
          onClick={clickSave}
        />
      </Cont>
      {modal && (
        <DeleteBG
          delData={delData}
          setModal={setModal}
          setRemoveBG={setRemoveBG}
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
