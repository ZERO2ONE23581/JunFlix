import styled from '@emotion/styled';

interface IAvatarProps {
  url?: string | null;
  preview?: string;
}
export const Avatar = ({ url, preview }: IAvatarProps) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  return (
    <>
      <Cont isImage={Boolean(url)}>
        {url ? (
          <img src={`${`${base}/${url}/${variant}`}`} alt="보드이미지" />
        ) : (
          <img src="/img/noimage.svg" alt="보드 이미지 없음" />
        )}
      </Cont>
    </>
  );
};

const Cont = styled.div<{ isImage: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  width: 100%;
  height: 300px;
  img {
    width: ${(p) => (p.isImage ? '100%' : '50px')};
    height: ${(p) => (p.isImage ? '100%' : '50px')};
  }
`;
