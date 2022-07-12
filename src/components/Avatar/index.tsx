import styled from '@emotion/styled';
import { Svg } from '../Style/Svg/Svg';
import { UseFormRegisterReturn } from 'react-hook-form';

const variant = 'public';
const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
export const AVATAR_URL = (avatar: string) => `${base}/${avatar}/${variant}`;

export const AVATAR_BG = styled.article<{ avatar: string }>`
  overflow: hidden;
  position: relative;
  background-color: black;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background: ${(p) =>
    p.avatar && `url(${AVATAR_URL(p.avatar)}) center / cover  no-repeat`};
`;

interface IAvatar {
  avatar: string;
  preview?: string;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  size: { width: string; height: string };
}
export const Avatar = ({
  avatar,
  preview,
  disabled,
  register,
  size,
}: IAvatar) => {
  const isImage = Boolean(avatar || preview);
  return (
    <>
      <label htmlFor="avatar">
        <Cont className="thumnail-avatar" isImage={isImage}>
          {isImage && (
            <>
              {avatar && !preview && (
                <Img
                  size={{ width: size?.width, height: size?.height }}
                  src={AVATAR_URL(avatar)}
                  alt="이미지"
                />
              )}
              {preview && (
                <Img
                  size={{ width: size?.width, height: size?.height }}
                  src={preview}
                  alt="프리뷰 이미지"
                />
              )}
            </>
          )}
          {!isImage && !avatar && !preview && (
            <NoImageCont
              size={{ width: size.width, height: size.height }}
              disabled={disabled!}
            >
              <Svg type="no-image" size="2rem" />
            </NoImageCont>
          )}
          <input
            {...register}
            id="avatar"
            name="avatar"
            type="file"
            accept="image/*"
            disabled={disabled}
          />
        </Cont>
      </label>
    </>
  );
};

const Cont = styled.div<{ isImage: boolean }>`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  input {
    display: none;
  }
`;
const Img = styled.img<{ size: { width: string; height: string } }>`
  width: ${(p) => (p.size.width ? p.size.width : 'auto')};
  height: ${(p) => (p.size.height ? p.size.height : 'auto')};
`;
const NoImageCont = styled.article<{
  size: { width: string; height: string };
  disabled: boolean;
}>`
  width: ${(p) => (p.size.width ? p.size.width : 'auto')};
  height: ${(p) => (p.size.height ? p.size.height : 'auto')};
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${(p) => p.theme.border.thin};
  :hover {
    svg {
      fill: ${(p) => !p.disabled && p.theme.color.logo};
      :hover {
        fill: ${(p) => p.theme.color.font};
      }
    }
  }
`;
