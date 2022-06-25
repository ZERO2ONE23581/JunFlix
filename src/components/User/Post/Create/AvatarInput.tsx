import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Svg } from '../../../Style/Svg/Svg';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IAvatarInputProps {
  disabled: boolean;
  avatar?: string | null;
  preview?: string | null;
  register?: UseFormRegisterReturn;
}
const variant = 'public';
const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
const AvatarURL = (avatar: string) => `${base}/${avatar}/${variant}`;

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
    <>
      <Cont URL={URL}>
        <Label htmlFor="avatar" isDisable={disabled}>
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
    </>
  );
};
const Default = styled.article`
  overflow: hidden;
  position: relative;
  background-color: black;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
`;
export const WithAvatar = styled(Default)<{ avatar?: string | null }>`
  background: ${(p) =>
    p.avatar && `url(${AvatarURL(p.avatar)}) center / cover  no-repeat`};
`;
const Cont = styled(Default)<{ URL?: string | null }>`
  height: 100%;
  display: flex;
  min-width: 45vw;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.URL && `URL(${p.URL}) center / cover  no-repeat`};
  input {
    display: none;
  }
`;
const Label = styled.label<{ isDisable: boolean }>`
  cursor: ${(p) => !p.isDisable && 'pointer'};
  width: 100px;
  height: 100px;
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
