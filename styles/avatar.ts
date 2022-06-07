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
export const CmtAvatarLogo = styled(AvatarLogo)`
  position: absolute;
  top: 45px;
  left: 5px;
`;
