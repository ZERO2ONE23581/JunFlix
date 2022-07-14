import styled from '@emotion/styled';
import { Svg } from '../Style/Svg/Svg';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AVATAR_URL } from '../../../styles/global';

interface IAvatar {
  id: string;
  avatar: string;
  preview?: string;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  size: { width: string; height: string };
}
export const Avatar = ({
  id,
  size,
  avatar,
  preview,
  disabled,
  register,
}: IAvatar) => {
  const isImage = Boolean(avatar || preview);
  const noImage = Boolean(!isImage && !avatar && !preview);
  console.log(size);
  console.log(preview);
  return (
    <>
      <Cont className={id}>
        <label htmlFor={id}>
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
          {noImage && (
            <NoImage
              size={{ width: size.width, height: size.height }}
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
    </>
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
  /* min-width: 600px;
  min-height: 600px; */
  width: ${(p) => p.size.width && p.size.width};
  height: ${(p) => p.size.height && p.size.height};
`;
const NoImage = styled.article<{
  disabled: boolean;
  size: { width: string; height: string };
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => p.size.width && p.size.width};
  height: ${(p) => p.size.height && p.size.height};
  :hover {
    svg {
      fill: ${(p) => p.theme.color.logo};
    }
  }
`;
