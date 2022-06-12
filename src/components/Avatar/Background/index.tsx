import styled from '@emotion/styled';

interface IAvatarProps {
  url?: string | null | boolean;
  preview?: string;
  isAllReivew?: boolean;
}
export const BackGroundAvatar = ({ url, preview }: IAvatarProps) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  return (
    <>
      {preview && <Background bg={preview} />}
      {!preview && !url && <Background bg={'none'} />}
      {url && <Background bg={`${`${base}/${url}/${variant}`}`} />}
    </>
  );
};
export const CF_BASE = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
export const CF_VAR = 'public';

const Background = styled.section<{ bg: string }>`
  z-index: -1;
  opacity: 0.9;
  width: 100%;
  height: 100vh;
  background: ${(p) =>
    p.bg ? `url(${p.bg})   center / cover no-repeat` : 'none'};
`;
