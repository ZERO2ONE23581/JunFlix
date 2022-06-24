import styled from '@emotion/styled';

export const AvatarUrl = (avatar: string) => {
  const variant = 'public';
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  return `${base}/${avatar}/${variant}`;
};
export const Background = styled.article<{
  avatar?: string | null;
  preview?: string | null;
}>`
  overflow: hidden;
  position: relative;
  background-color: black;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border-right: ${(p) => !(p.avatar || p.preview) && p.theme.border.thin};
  border-bottom: ${(p) => !(p.avatar || p.preview) && p.theme.border.thin};
  background: ${(p) =>
    p.preview && `url(${p.preview}) center / cover  no-repeat`};
  background: ${(p) =>
    p.avatar && `url(${AvatarUrl(p.avatar)}) center / cover  no-repeat`};
`;
