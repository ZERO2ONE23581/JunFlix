import styled from '@emotion/styled';
import { Svg } from '../Style/Svg/Svg';
import { useEffect, useState } from 'react';
import { AVATAR_URL } from '../../../styles/global';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IAvatar {
  id: string;
  avatar: string;
  preview?: string;
  disabled?: boolean;
  avatarWatch?: FileList;
  register?: UseFormRegisterReturn;
  size?: { width: string; height: string };
}
export const Avatar = ({
  id,
  size,
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
  const isImage = Boolean(avatar || preview);
  const noImage = Boolean(!isImage && !avatar && !preview);

  return (
    <Cont className={id}>
      <label htmlFor={id}>
        {isImage && (
          <>
            {avatar && !preview && (
              <Img
                alt="이미지"
                className="isImageCont"
                src={AVATAR_URL(avatar)}
                size={{ width: size?.width!, height: size?.height! }}
              />
            )}
            {preview && (
              <Img
                size={{ width: size?.width!, height: size?.height! }}
                src={preview}
                alt="프리뷰 이미지"
              />
            )}
          </>
        )}
        {noImage && (
          <NoImage
            className="noImageCont"
            size={{ width: size?.width!, height: size?.height! }}
            disabled={disabled!}
          >
            {disabled && <Svg type="eye-slash" size="2rem" />}
            {!disabled && <Svg type="landscape" size="2rem" />}
          </NoImage>
        )}
        <input
          {...register}
          id={id}
          name={id}
          type="file"
          accept="image/*"
          disabled={disabled}
        />
      </label>
    </Cont>
  );
};

const Cont = styled.div`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.color.bg};
  label {
    cursor: pointer;
  }
  input {
    display: none;
  }
`;
const Img = styled.img<{ size: { width: string; height: string } }>`
  width: ${(p) => p.size.width && p.size.width};
  height: ${(p) => p.size.height && p.size.height};
`;
const NoImage = styled.article<{
  disabled: boolean;
  size: { width: string; height: string };
}>`
  display: flex;
  align-items: center;
  pointer-events: none;
  justify-content: center;
  border: ${(p) => p.theme.border.thin};
  width: ${(p) => p.size.width && p.size.width};
  height: ${(p) => p.size.height && p.size.height};
  :hover {
    svg {
      fill: ${(p) => p.theme.color.logo};
    }
  }
`;
