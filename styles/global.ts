import styled from '@emotion/styled';

export const Container = styled.section`
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  height: 95vh;
  padding: 0 12%;
  //
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  font-size: 1.2rem;
`;

export const BodyBg = styled.div`
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  position: absolute;
  top: 0;
  left: 0;
  z-index: -999;
  width: 100vw;
  height: 100vh;
`;
