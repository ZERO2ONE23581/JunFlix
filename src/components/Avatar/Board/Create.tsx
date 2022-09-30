import styled from '@emotion/styled';
import { Svg } from '../../Tools/Svg';
import { Dispatch, SetStateAction } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IBoardForm } from '../../../types/board';

interface ICreateBoardAvatar {
  isPreview: boolean;
  register: UseFormRegister<IBoardForm>;
  setPreview: Dispatch<SetStateAction<string>>;
}
export const CreateAvatar = ({
  isPreview,
  register,
  setPreview,
}: ICreateBoardAvatar) => {
  return (
    <Cont>
      <label htmlFor="avatar">
        <Svg type="landscape" size="3rem" />
        <input
          {...register('avatar')}
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
        />
      </label>
      {isPreview && (
        <Svg size="2rem" type="undo" onClick={() => setPreview('')} />
      )}
    </Cont>
  );
};
const Cont = styled.article`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      :hover {
        fill: ${(p) => p.theme.color.logo};
      }
    }
    input {
      display: none;
    }
  }
`;
