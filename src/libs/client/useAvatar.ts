export default function useAvatar(avatarId: string | any) {
  const CF_BASEURL = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const CF_VAR = 'public';
  return `${CF_BASEURL}/${avatarId}/${CF_VAR}`;
}
