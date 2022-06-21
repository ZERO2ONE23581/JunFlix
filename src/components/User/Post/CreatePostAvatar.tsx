import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AvatarLabel } from '../Avatar/Profile';
import { ThumnailAvatar } from '../Avatar/Thumnail';

interface ICreatePostAvatar {
  next: boolean;
  preview?: string;
  register: UseFormRegisterReturn;
}
export const CreatePostAvatar = ({
  preview,
  register,
  next,
}: ICreatePostAvatar) => {
  return (
    <Cont isPreview={Boolean(preview)}>
      <AvatarLabel htmlFor="avatar">
        <ThumnailAvatar preview={preview} />
        <input
          {...register}
          disabled={next}
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
        />
      </AvatarLabel>
    </Cont>
  );
};
const Cont = styled.article<{ isPreview?: boolean }>`
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
