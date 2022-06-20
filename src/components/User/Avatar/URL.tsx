export const AvatarURL = (url: string | undefined | null) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  if (url) return `${`${base}/${url}/${variant}`}`;
};
