import styled from '@emotion/styled';

interface IAvatarProps {
  url?: string | null | boolean;
  preview?: string;
}
export const FollowingBoardAvatar = ({ url }: IAvatarProps) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  return (
    <>
      <Cont isImage={Boolean(url)}>
        {url ? (
          <img src={`${`${base}/${url}/${variant}`}`} alt="이미지" />
        ) : (
          <img src="/img/noimage.svg" alt="이미지 없음" />
        )}
      </Cont>
    </>
  );
};

const Cont = styled.div<{ isImage: boolean }>`
  overflow: hidden;
  border-radius: 50%;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: ${(p) => (p.isImage ? '100%' : '20px')};
    height: ${(p) => (p.isImage ? '100%' : '20px')};
  }
`;
