import styled from '@emotion/styled';
import { Svg } from '../../Style/Svg/Svg';
import { Dispatch, SetStateAction } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IBoardForm } from '../../../types/board';
import { IconBtn } from '../../Style/Button/IconBtn';

interface IBoardAvatar {
  isPreivew: boolean;
  register: UseFormRegister<IBoardForm>;
  setPreview: Dispatch<SetStateAction<string>>;
}
export const BoardAvatar = ({
  isPreivew,
  register,
  setPreview,
}: IBoardAvatar) => {
  return (
    <Cont>
      <label htmlFor="avatar">
        <Svg type="landscape" size="50px" />
        <input
          {...register('avatar')}
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
        />
      </label>
      {isPreivew && (
        <IconBtn
          size="33px"
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
