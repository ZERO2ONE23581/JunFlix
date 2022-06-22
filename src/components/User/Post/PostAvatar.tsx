import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AvatarLabel } from '../Avatar/Profile';
import { ThumnailAvatar } from '../Avatar/Thumnail';

interface ICreatePostAvatar {
  avatarUrl?: string | null;
  disabled?: boolean;
  preview?: string;
  register?: UseFormRegisterReturn;
}
export const PostAvatar = ({
  avatarUrl,
  preview,
  register,
  disabled,
}: ICreatePostAvatar) => {
  return (
    <Cont isPreview={Boolean(preview)} isDisable={disabled}>
      <AvatarLabel htmlFor="avatar">
        <ThumnailAvatar preview={preview} url={avatarUrl} />
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
  border: 10px solid blue;
  border-radius: 3px;
  cursor: ${(p) => !p.isDisable && 'pointer'};
  border: ${(p) => !p.isPreview && '1px solid #2d3436'};
`;
