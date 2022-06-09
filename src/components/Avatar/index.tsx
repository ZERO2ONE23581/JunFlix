import styled from '@emotion/styled';
import useAvatar from '../../libs/client/useAvatar';

interface IAvatarProps {
  isAvatar: boolean;
  url?: string | null;
  size: number;
}

export const Avatar = ({ isAvatar, url, size }: IAvatarProps) => {
  return (
    <>
      <Logo size={size}>
        {isAvatar ? (
          <img src={`${useAvatar(url)}`} alt="프로필 이미지" />
        ) : (
          <img src="/img/profile.svg" alt="프로필 이미지" />
        )}
      </Logo>
    </>
  );
};
const Logo = styled.div<{ size: number }>`
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
