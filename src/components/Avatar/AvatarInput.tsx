import styled from '@emotion/styled';
import { Svg } from '../Style/Svg/Svg';
import { useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IAvatarInputProps {
  disabled: boolean;
  avatar?: string | null;
  preview?: string | null;
  register?: UseFormRegisterReturn;
}
const variant = 'public';
const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
export const AvatarURL = (avatar: string) => `${base}/${avatar}/${variant}`;

export const AvatarInput = ({
  avatar,
  preview,
  register,
  disabled,
}: IAvatarInputProps) => {
  const noimage = Boolean(!avatar && !preview);
  const [URL, setURL] = useState('');
  useEffect(() => {
    if (avatar || preview) setURL(preview!);
    if (avatar && !preview) setURL(AvatarURL(avatar));
  }, [setURL, preview, avatar]);
  return (
    <Cont URL={URL} className="avatar-cont">
      <Label htmlFor="avatar" isDisable={disabled} className="avatar-label">
        {noimage && <Svg type="no-image" />}
      </Label>
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
  border: ${(p) => !p.URL && p.theme.border.bold};
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
