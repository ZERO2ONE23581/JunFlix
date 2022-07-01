import styled from '@emotion/styled';
import useUser from '../../libs/client/useUser';

interface IAvatarProps {
  url?: string | null;
  preview?: string;
  size?: string;
}

export const ProfileAvatar = ({ url, preview, size }: IAvatarProps) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  return (
    <Cont size={size} className="profile-avatar">
      {preview && <img src={preview} alt="프로필 이미지" />}
      {url && !preview && (
        <img src={`${`${base}/${url}/${variant}`}`} alt="프로필 이미지" />
      )}
      {!url && !preview && <img src="/img/profile.svg" alt="프로필 이미지" />}
    </Cont>
  );
};
const Cont = styled.article<{ size: string | undefined }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  border: ${(p) => p.theme.border.thin};
  width: ${(p) => (p.size ? `${p.size}` : '2em')};
  height: ${(p) => (p.size ? `${p.size}` : '2em')};
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
interface IHostIconProps {
  size: number;
}
