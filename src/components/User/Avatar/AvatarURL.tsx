import styled from '@emotion/styled';

export const AvatarUrl = (avatar: string) => {
  const variant = 'public';
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  return `${base}/${avatar}/${variant}`;
};
