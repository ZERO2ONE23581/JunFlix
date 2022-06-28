import styled from '@emotion/styled';
import useUser from '../../libs/client/useUser';

interface IAvatarProps {
  url?: string | null;
  preview?: string;
  size?: number;
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
const Cont = styled.article<{ size: number | undefined }>`
  position: relative;
  overflow: hidden;
  border: ${(p) => p.theme.border};
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
export const HostIcon = ({ size }: IHostIconProps) => {
  const { loggedInUser } = useUser();
  return (
    <Host>
      <ProfileAvatar url={loggedInUser?.avatar} size={size} />
      <span>{loggedInUser?.username}</span>
    </Host>
  );
};
const Host = styled.span`
  gap: 12px;
  display: flex;
  align-items: center;
`;
