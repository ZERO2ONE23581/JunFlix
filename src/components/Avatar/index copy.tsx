import styled from '@emotion/styled';

interface IAvatarProps {
  isBg?: boolean;
  url?: string | null;
  bgUrl?: string | null;
  preview?: string;
  boardBgPreview?: string;
  children?: any;
}
export const Avatar = ({
  isBg,
  url,
  bgUrl,
  preview,
  boardBgPreview,
  children,
}: IAvatarProps) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  const isNoImage = Boolean(!url && !bgUrl && !preview && !boardBgPreview);
  return (
    <>
      {url && (
        <Cont>
          <img src={`${`${base}/${url}/${variant}`}`} alt="프로필 이미지" />
        </Cont>
      )}
      {boardBgPreview && (
        <Background bg={`${boardBgPreview}`}>{children}</Background>
      )}
      {bgUrl && (
        <Background bg={`${base}/${bgUrl}/${variant}`}>{children}</Background>
      )}
      {preview && (
        <Cont>
          <img src={`${preview}`} alt="파일 업로드" />
        </Cont>
      )}
      {isNoImage && isBg && (
        <NoImageCont isBg={isBg}>
          <img src="/img/noimage.svg" alt="포스트 이미지" />
        </NoImageCont>
      )}
    </>
  );
};

const Background = styled.section<{ bg: string }>`
  z-index: -1;
  opacity: 0.9;
  width: 100%;
  height: 100vh;
  position: relative;
  background: ${(p) => `url(${p.bg})  no-repeat center / cover`};
`;
const Cont = styled.div`
  margin: 20px auto;
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
    width: 100%;
    height: 100%;
  }
`;
const NoImageCont = styled(Cont)<{ isBg: boolean }>`
  height: ${(p) => p.isBg && '100vh'};
  img {
    width: 50px;
    height: 50px;
  }
`;
