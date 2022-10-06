import styled from '@emotion/styled';
import { CreateAvatar } from '../../Avatar/Board/Create';
import { InputWrap } from '../../../Tools/Input';
import { IUseform } from '../../../types/global';
import { Dispatch, SetStateAction } from 'react';
import { SelectWrap } from '../../../Tools/Input/Select';
import { Svg } from '../../../Tools/Svg';

interface IInputs extends IUseform {
  isPreview: boolean;
  setPreview: Dispatch<SetStateAction<string>>;
}
export const Inputs = ({ watch, register, isPreview, setPreview }: IInputs) => {
  return (
    <Cont>
      <InputWrap
        id="title"
        type="text"
        label="Title"
        watch={watch!('title')}
        register={register!('title', {
          required: '보드의 제목을 입력하세요.',
        })}
      />
      <SelectWrap
        id="genre"
        watch={watch!('genre')}
        register={register!('genre')}
      />
      <CreateAvatar
        register={register!}
        isPreview={isPreview}
        setPreview={setPreview}
      />
      <Svg type="save" size="2.6rem" />
    </Cont>
  );
};
const Cont = styled.div`
  gap: 20px;
  width: 100%;
  display: flex;
  max-width: 70%;
  align-items: center;
`;
