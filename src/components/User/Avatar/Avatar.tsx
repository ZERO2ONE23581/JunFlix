import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Svg } from '../../Style/Svg/Svg';
import { WithAvatar } from '../Post/Create/AvatarInput';

interface ICreatePostAvatar {
  disabled?: boolean;
  avatar?: string | null;
  preview?: string | null;
  register?: UseFormRegisterReturn;
}
export const Avatar = ({
  avatar,
  preview,
  register,
  disabled,
}: ICreatePostAvatar) => {
  const noImage = !Boolean(avatar || preview);
  return (
    <Cont className="avatar-input" preview={preview!} avatar={avatar!}>
      <label htmlFor="avatar">{noImage && <Svg type="no-image" />}</label>
      <input
        {...register}
        id="avatar"
        name="avatar"
        type="file"
        accept="image/*"
        disabled={disabled}
      />
    </Cont>
  );
};
const Cont = styled(WithAvatar)`
  input {
    display: none;
  }
  label {
    cursor: pointer;
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
`;
