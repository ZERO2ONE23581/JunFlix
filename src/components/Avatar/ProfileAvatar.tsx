import styled from '@emotion/styled';

interface IAvatarProps {
  avatar?: string | null;
  preview?: string;
  size?: string;
}

export const ProfileAvatar = ({ avatar, preview, size }: IAvatarProps) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  return (
    <Cont size={size} className="profile-avatar">
      {preview && <img src={preview} alt="프로필 이미지" />}
      {avatar && !preview && (
        <img src={`${`${base}/${avatar}/${variant}`}`} alt="프로필 이미지" />
      )}
      {!avatar && !preview && (
        <img src="/img/profile.svg" alt="프로필 이미지" />
      )}
    </Cont>
  );
};
const Cont = styled.div<{ size: string | undefined }>`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  border: ${(p) => p.theme.border.thin};
  width: ${(p) => (p.size ? `${p.size}` : '50px')};
  height: ${(p) => (p.size ? `${p.size}` : '50px')};
  img {
    width: 100%;
    height: 100%;
  }
`;
export const AvatarLabel = styled.label`
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    display: none;
  }
`;
