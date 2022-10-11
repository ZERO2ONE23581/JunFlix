import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IAvatar {
  id: string;
  avatar?: string;
  disabled?: boolean;
  avatarWatch?: FileList;
  register?: UseFormRegisterReturn;
}
export const Avatar = ({
  id,
  avatar,
  register,
  disabled,
  avatarWatch,
}: IAvatar) => {
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (avatarWatch && avatarWatch.length > 0) {
      const file = avatarWatch[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [avatarWatch, setPreview]);
  const noImage = Boolean(!avatar && !preview);

  return (
    <Cont className={id}>
      <label htmlFor={id}>
        <input
          {...register}
          id={id}
          name={id}
          type="file"
          accept="image/*"
          disabled={disabled}
        />
        {preview && (
          <img src={preview} className="isPreivewTag" alt="프리뷰 이미지" />
        )}
        {avatar && !preview && (
          <img alt="이미지" className="isImageTag" src={AVATAR_URL(avatar)} />
        )}
        {noImage && (
          <NoImage className="noImageDiv" disabled={disabled!}>
            {disabled && <Svg type="eye-slash" size="2rem" />}
            {!disabled && <Svg type="landscape" size="2rem" />}
          </NoImage>
        )}
      </label>
    </Cont>
  );
};

const Cont = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.color.bg};
  label {
    display: block;
    cursor: pointer;
  }
  input {
    display: none;
  }
`;
const NoImage = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(p) => p.theme.boxShadow.input};
  pointer-events: ${(p) => p.disabled && 'none'};
  :hover {
    svg {
      fill: ${(p) => p.theme.color.logo};
    }
  }
`;
const variant = 'public';
const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg';
export const AVATAR_URL = (avatar: string) => `${base}/${avatar}/${variant}`;

export const AVATAR_BG = styled.article<{ avatar?: string; preview?: string }>`
  border: none;
  overflow: hidden;
  min-height: 440px;
  position: relative;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.font};
  background: ${(p) =>
    p.avatar && `url(${AVATAR_URL(p.avatar)}) center / cover no-repeat `};
  background: ${(p) =>
    p.preview && `url(${p.preview}) center / cover no-repeat`};
`;
