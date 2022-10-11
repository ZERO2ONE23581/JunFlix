import styled from '@emotion/styled';
import { Svg } from '../../Svg';
import { Dispatch, SetStateAction } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IBoardForm } from '../../../types/board';
import { ITheme } from '../../../../styles/theme';

interface ICreateBoardAvatar extends ITheme {
  isPreview: boolean;
  register: UseFormRegister<IBoardForm>;
  setPreview: Dispatch<SetStateAction<string>>;
}
export const CreateBoardAvatar = ({
  theme,
  isPreview,
  register,
  setPreview,
}: ICreateBoardAvatar) => {
  return (
    <Cont className="create-board-bg">
      <label htmlFor="avatar">
        <Svg theme={theme} type="landscape" size="3rem" />
        <input
          {...register('avatar')}
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
        />
      </label>
      {isPreview && (
        <Svg
          size="2rem"
          type="undo"
          theme={theme}
          onClick={() => setPreview('')}
        />
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
