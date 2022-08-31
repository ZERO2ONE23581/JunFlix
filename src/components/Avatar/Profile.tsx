import styled from '@emotion/styled';
import { Svg } from '../Tools/Svg';

interface IProfile {
  size?: string;
  preview?: string;
  avatar?: string | null;
  onClick?: () => void;
}
export const ProfileAvatar = ({ size, avatar, preview, onClick }: IProfile) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  return (
    <>
      <Cont
        size={size!}
        onClick={onClick}
        className="profile-avatar"
        isAvatar={Boolean(avatar)}
      >
        {preview && <img src={preview} alt="프로필 이미지" />}
        {avatar && !preview && (
          <img src={`${`${base}/${avatar}/${variant}`}`} alt="프로필 이미지" />
        )}
        {!avatar && !preview && <Svg size={size!} type="profile" />}
      </Cont>
    </>
  );
};
const Cont = styled.div<{ size: string; isAvatar: boolean }>`
  display: flex;
  overflow: hidden;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  border: ${(p) => p.theme.border.thin};
  width: ${(p) => p.size && `${p.size}`};
  height: ${(p) => p.size && `${p.size}`};
  img {
    width: 100%;
    height: 100%;
  }
  .profile {
    pointer-events: none;
  }
`;
export const Label = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    display: none;
  }
`;
