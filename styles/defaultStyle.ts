import styled from '@emotion/styled';

export const Article = styled.article`
  background-color: ${(p) => p.theme.color.bg};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border};
  justify-content: center;
  align-content: center;
  border-radius: 8px;
  display: flex;
`;

export const PageContainer = styled.section`
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  padding: 100px 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 1.2rem;
`;
export const LoginPageCont = styled(PageContainer)`
  form {
    height: 250px;
  }
`;
export const ProEditPgCont = styled(PageContainer)`
  .form-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
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

export const ErrMsg = styled.span`
  background-color: inherit;
  text-align: center;
  color: red;
  font-style: italic;
`;
export const OkMsg = styled(ErrMsg)`
  color: #2ecc71;
`;
