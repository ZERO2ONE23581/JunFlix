import styled from '@emotion/styled';

interface IAvatarProps {
  url?: string | null | boolean;
  preview?: string;
}
export const Avatar = ({ url, preview }: IAvatarProps) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  //
  return (
    <>
      <Cont isImage={Boolean(url || preview)}>
        {url && !preview && (
          <img src={`${`${base}/${url}/${variant}`}`} alt="이미지" />
        )}
        {Boolean(preview) && <img src={preview} alt="프리뷰 이미지" />}
        {!url && !preview && <img src="/img/noimage.svg" alt="이미지 없음" />}
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
