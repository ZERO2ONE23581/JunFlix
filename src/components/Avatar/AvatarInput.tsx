import styled from '@emotion/styled';
import { Svg } from '../Style/Svg/Svg';
import { useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IAvatarInputProps {
  disabled: boolean;
  url?: string | null | boolean;
  preview?: string;
  register?: UseFormRegisterReturn;
}
const variant = 'public';
const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
export const AvatarURL = (avatar: string) => `${base}/${avatar}/${variant}`;

export const AvatarInput = ({
  url,
  preview,
  register,
  disabled,
}: IAvatarInputProps) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  {
    url && !preview && (
      <img src={`${`${base}/${url}/${variant}`}`} alt="이미지" />
    );
  }
  {
    Boolean(preview) && <img src={preview} alt="프리뷰 이미지" />;
  }
  {
    !url && !preview && <Svg type="no-image" />;
  }
  return (
    <Label htmlFor="avatar" isDisable={disabled} className="avatar-label">
      <Cont URL={URL} className="avatar-cont">
        {noimage && <Svg type="no-image" />}
        <input
          {...register}
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
          disabled={disabled}
        />
      </Cont>
    </Label>
  );
};
const Cont = styled.article<{ URL?: string | null }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 45vw;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: black;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border: ${(p) => !p.URL && p.theme.border.thick};
  background: ${(p) => p.URL && `URL(${p.URL}) center / cover  no-repeat`};
  input {
    display: none;
  }
`;
const Label = styled.label<{ isDisable: boolean }>`
  cursor: ${(p) => !p.isDisable && 'pointer'};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    svg {
      fill: ${(p) => (!p.isDisable ? p.theme.color.logo : p.theme.color.font)};
    }
  }
`;
export const WithAvatar = styled.article<{ avatar?: string | null }>`
  overflow: hidden;
  position: relative;
  background-color: black;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background: ${(p) =>
    p.avatar && `url(${AvatarURL(p.avatar)}) center / cover  no-repeat`};
`;