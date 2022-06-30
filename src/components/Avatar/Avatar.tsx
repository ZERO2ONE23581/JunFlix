import styled from '@emotion/styled';
import { Svg } from '../Style/Svg/Svg';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IAvatarProps {
  url?: string | null | boolean;
  preview?: string;
  disabled: boolean;
  register?: UseFormRegisterReturn;
  size: { width: string; height: string };
}
export const Avatar = ({
  url,
  preview,
  disabled,
  register,
  size,
}: IAvatarProps) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  const isImage = Boolean(url || preview);
  return (
    <>
      <label htmlFor="avatar">
        <Cont className="thumnail-avatar" isImage={isImage}>
          {isImage && (
            <>
              {url && !preview && (
                <Img
                  size={{ width: size?.width, height: size?.height }}
                  src={`${`${base}/${url}/${variant}`}`}
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
          {!isImage && !url && !preview && (
            <NoImageCont
              size={{ width: size.width, height: size.height }}
              disabled={disabled}
            >
              <Svg type="no-image" />
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
  :hover {
    svg {
      fill: ${(p) => !p.disabled && p.theme.color.logo};
      :hover {
        fill: ${(p) => p.theme.color.font};
      }
    }
  }
`;
