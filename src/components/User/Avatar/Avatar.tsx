import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Svg } from '../../Style/Svg/Svg';

interface ICreatePostAvatar {
  size?: {
    width?: string;
    height?: string;
  };
  disabled?: boolean;
  avatar?: string | null;
  preview?: string | null;
  register?: UseFormRegisterReturn;
}
const AvatarUrl = (avatar: string) => {
  const variant = 'public';
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  return `${base}/${avatar}/${variant}`;
};
export const Background = styled.article<{ avatar: string | null }>`
  overflow: hidden;
  position: relative;
  background-color: black;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border-right: ${(p) => !p.avatar && p.theme.border};
  border-bottom: ${(p) => !p.avatar && p.theme.border};
  background: ${(p) =>
    p.avatar && `url(${AvatarUrl(p.avatar)}) center / cover  no-repeat`};
`;

export const Avatar = ({
  size,
  avatar,
  preview,
  register,
  disabled,
}: ICreatePostAvatar) => {
  const noImage = !Boolean(avatar || preview);
  return (
    <Cont size={{ height: size?.height }} noImage={noImage}>
      <label htmlFor="avatar">
        {noImage && <Svg type="no-image" />}
        {preview && <img src={preview} alt="프리뷰 이미지" />}
        {!preview && avatar && (
          <img src={`${AvatarUrl(avatar)}`} alt="이미지" />
        )}
      </label>
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
const Cont = styled.article<{
  noImage: boolean;
  size: { width?: string; height?: string };
}>`
  border-radius: 3px;
  background-color: #151414;
  input {
    display: none;
  }
  label {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid blueviolet;
  }
`;
