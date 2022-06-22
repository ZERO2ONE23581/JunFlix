import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import { EmptyImage } from '../../Style/Svg/EmptyImage';
import { ThumnailAvatar } from './Thumnail';

interface ICreatePostAvatar {
  avatar: string | null;
  preview: string | null;
  disabled: boolean;
  register?: UseFormRegisterReturn;
  size: {
    width?: number;
    height?: number;
  };
}
export const Avatar = ({
  avatar,
  preview,
  register,
  disabled,
  size,
}: ICreatePostAvatar) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  return (
    <Label htmlFor="avatar">
      <input
        disabled={disabled}
        {...register}
        id="avatar"
        name="avatar"
        type="file"
        accept="image/*"
      />
      <ThumNail height={size.height!} isAvatar={Boolean(avatar || preview)}>
        {avatar && !preview && (
          <img src={`${`${base}/${avatar}/${variant}`}`} alt="이미지" />
        )}
        {Boolean(preview) && <img src={preview!} alt="프리뷰 이미지" />}
        {!avatar && !preview && <EmptyImage />}
      </ThumNail>
    </Label>
  );
};
const Label = styled.label`
  cursor: pointer;
  border-radius: 3px;
  input {
    display: none;
  }
`;
const ThumNail = styled.div<{ isAvatar: boolean; height: number }>`
  height: 330px;
  height: ${(p) => p.height && `${p.height}px`};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  img {
    width: ${(p) => (p.isAvatar ? '100%' : '50px')};
    height: ${(p) => (p.isAvatar ? '100%' : '50px')};
  }
`;
