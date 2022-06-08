import styled from '@emotion/styled';

export const AvatarLogo = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;
export const ThumNail = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  margin: 20px auto;
  height: 350px;
  overflow: hidden;
  border-radius: 8px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  .noimage {
    width: 50px;
    height: 50px;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
