import styled from '@emotion/styled';

interface IAvatarProps {
  url?: string | null;
  preview?: string;
  children?: any;
  bg?: boolean;
}
export const Avatar = ({ url, bg, children, preview }: IAvatarProps) => {
  const base = 'https://imagedelivery.net/akzZnR6sxZ1bwXZp9XYgsg/';
  const variant = 'public';
  const isPreview = Boolean(preview);
  const isAvatar = Boolean(url) && !bg;
  const isAvatarBg = Boolean(url) && bg;
  const isNoImage = Boolean(!preview && !url);
  return (
    <>
      {isAvatar && (
        <Cont>
          <img src={`${`${base}/${url}/${variant}`}`} alt="프로필 이미지" />
        </Cont>
      )}
      {isAvatarBg && (
        <Background bg={`${base}/${url}/${variant}`}>{children}</Background>
      )}
      {isPreview && (
        <Cont>
          <img src={`${preview}`} alt="파일 업로드" />
        </Cont>
      )}
      {isNoImage && (
        <NoImageCont>
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
  height: 400px;
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
const NoImageCont = styled(Cont)`
  img {
    width: 50px;
    height: 50px;
  }
`;
