import styled from '@emotion/styled';
import { Svg } from '../Style/Svg/Svg';

interface IAvatarProps {
  url?: string | null | boolean;
  preview?: string;
}
export const ThumnailAvatar = ({ url, preview }: IAvatarProps) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  return (
    <Cont className="thumnail-avatar" isImage={Boolean(url || preview)}>
      {url && !preview && (
        <img src={`${`${base}/${url}/${variant}`}`} alt="이미지" />
      )}
      {Boolean(preview) && <img src={preview} alt="프리뷰 이미지" />}
      {!url && !preview && <Svg type="no-image" size="2rem" />}
    </Cont>
  );
};

const Cont = styled.div<{ isImage: boolean }>`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  img {
    width: ${(p) => (p.isImage ? '100%' : '50px')};
    height: ${(p) => (p.isImage ? '100%' : '50px')};
  }
`;
