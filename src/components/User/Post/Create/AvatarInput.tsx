import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Svg } from '../../../Style/Svg/Svg';
import { Background } from '../../Avatar/AvatarURL';

interface IAvatarInputProps {
  disabled: boolean;
  avatar?: string | null;
  preview?: string | null;
  register: UseFormRegisterReturn;
}
export const AvatarInput = ({
  disabled,
  preview,
  avatar,
  register,
}: IAvatarInputProps) => {
  return (
    <>
      <Cont preview={preview} disabled={disabled}>
        <label htmlFor="avatar">{!preview && <Svg type="no-image" />}</label>
        <input disabled={disabled} type="file" id="avatar" {...register} />
      </Cont>
    </>
  );
};
const Cont = styled(Background)<{ disabled: boolean }>`
  min-width: 35vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  label {
    cursor: ${(p) => !p.disabled && 'pointer'};
    width: 100px;
    height: 100px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    :hover {
      svg {
        fill: ${(p) => p.theme.color.logo};
      }
    }
  }
  input {
    display: none;
  }
`;
