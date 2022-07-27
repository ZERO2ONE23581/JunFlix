import styled from '@emotion/styled';
import { Svg } from '../../Style/Svg/Svg';
import { Dispatch, SetStateAction } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IBoardForm } from '../../../types/board';
import { IconBtn } from '../../Style/Button/IconBtn';

interface IBoardAvatar {
  isPreview: boolean;
  register: UseFormRegister<IBoardForm>;
  setPreview: Dispatch<SetStateAction<string>>;
}
export const BoardAvatar = ({
  isPreview,
  register,
  setPreview,
}: IBoardAvatar) => {
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
        <IconBtn
          size="2rem"
          type="button"
          svgType="undo"
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
