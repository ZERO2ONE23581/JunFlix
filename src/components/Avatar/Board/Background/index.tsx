import styled from '@emotion/styled';

interface IAvatarProps {
  url?: string | null | boolean;
  preview?: string;
}
export const BoardBackground = ({ url, preview }: IAvatarProps) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  return (
    <>
      {url && !preview && <Background bg={`${`${base}/${url}/${variant}`}`} />}
      {preview && <Background bg={preview} />}
      {!url && !preview && <Background bg={''} />}
    </>
  );
};

const Background = styled.section<{ bg: string }>`
  z-index: -1;
  opacity: 0.9;
  width: 100%;
  height: 100vh;
  background: ${(p) =>
    p.bg ? `url(${p.bg})  no-repeat center / cover` : 'none'};
`;
