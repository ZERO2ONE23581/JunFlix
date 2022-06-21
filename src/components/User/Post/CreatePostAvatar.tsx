import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AvatarLabel } from '../Avatar/Profile';
import { ThumnailAvatar } from '../Avatar/Thumnail';

interface ICreatePostAvatar {
  disabled?: boolean;
  preview?: string;
  register: UseFormRegisterReturn;
}
export const PostAvatar = ({
  preview,
  register,
  disabled,
}: ICreatePostAvatar) => {
  return (
    <Cont isPreview={Boolean(preview)} isDisable={disabled}>
      <AvatarLabel htmlFor="avatar">
        <ThumnailAvatar preview={preview} />
        <input
          {...register}
          disabled={disabled}
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
        />
      </AvatarLabel>
    </Cont>
  );
};
const Cont = styled.article<{ isPreview?: boolean; isDisable?: boolean }>`
  cursor: ${(p) => !p.isDisable && 'pointer'};
  border-radius: 3px;
  border: ${(p) => !p.isPreview && '1px solid #2d3436'};
  .thum-avatar {
    height: 400px;
    overflow: hidden;
    min-width: 500px;
    max-width: 600px;
    border-radius: 3px;
  }
`;
