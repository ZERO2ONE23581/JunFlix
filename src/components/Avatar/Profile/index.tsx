import styled from '@emotion/styled';

interface IAvatarProps {
  url?: string | null;
  preview?: string;
  size?: number;
}

export const ProfileAvatar = ({ url, preview, size }: IAvatarProps) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  return (
    <Cont size={size}>
      {Boolean(url) ? (
        <img src={`${`${base}/${url}/${variant}`}`} alt="프로필 이미지" />
      ) : Boolean(preview) ? (
        <img src={preview} alt="프로필 이미지" />
      ) : (
        <img src="/img/profile.svg" alt="프로필 이미지" />
      )}
    </Cont>
  );
};
const Cont = styled.article<{ size: number | undefined }>`
  position: relative;
  overflow: hidden;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => (p.size ? `${p.size}px` : '60px')};
  height: ${(p) => (p.size ? `${p.size}px` : '60px')};
  img {
    width: 100%;
    height: 100%;
  }
`;