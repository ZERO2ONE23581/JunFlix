import styled from '@emotion/styled';
import { Page } from '../../../../styles/global';

export const CreateAvatarURL = (url: string | undefined | null) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  if (url) return `${`${base}/${url}/${variant}`}`;
};

export const Background = styled(Page)<{
  bg?: string | boolean | null;
}>`
  height: 90vh;
  background-color: black;
  background: ${(p) => p.bg && `url(${p.bg})   center / cover no-repeat`};
`;
