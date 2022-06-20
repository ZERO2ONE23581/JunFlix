import styled from '@emotion/styled';
import { EmptyImage } from '../../Style/Svg/EmptyImage';

interface IAvatarProps {
  url?: string | null | boolean;
  preview?: string;
  isBoard?: boolean;
}
export const ThumnailAvatar = ({ isBoard, url, preview }: IAvatarProps) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  return (
    <Cont isBoard={isBoard} isImage={Boolean(url || preview)}>
      {url && !preview && (
        <img src={`${`${base}/${url}/${variant}`}`} alt="이미지" />
      )}
      {Boolean(preview) && <img src={preview} alt="프리뷰 이미지" />}
      {!url && !preview && <EmptyImage />}
    </Cont>
  );
};

const Cont = styled.div<{ isBoard?: boolean; isImage: boolean }>`
  width: 100%;
  height: 250px;
  border: none;
  background-color: black;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: ${(p) => (p.isImage ? '100%' : '50px')};
    height: ${(p) => (p.isImage ? '100%' : '50px')};
  }
`;
