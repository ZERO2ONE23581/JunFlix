import styled from '@emotion/styled';

interface IAvatarProps {
  url?: string | null;
  size?: number;
}

export const ProfileAvatar = ({ url, size }: IAvatarProps) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  return (
    <>
      <Logo size={size}>
        {Boolean(url) ? (
          <img src={`${`${base}/${url}/${variant}`}`} alt="프로필 이미지" />
        ) : (
          <img src="/img/profile.svg" alt="프로필 이미지" />
        )}
      </Logo>
    </>
  );
};
const Logo = styled.div<{ size: number | undefined }>`
  position: relative;
  overflow: hidden;
  border-radius: 100%;
  width: ${(p) => (p.size ? `${p.size}px` : '60px')};
  height: ${(p) => (p.size ? `${p.size}px` : '60px')};
  img {
    width: 100%;
    height: 100%;
  }
`;
