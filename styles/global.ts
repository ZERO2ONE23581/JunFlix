import styled from '@emotion/styled';

export const PageContainer = styled.section`
  height: 95vh;
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  padding: 0 12%;
  //
  display: flex;
  flex-direction: column;
  align-content: center;
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
export const Error = styled.span`
  color: red;
  font-style: italic;
  background-color: bisque;
  text-align: center;
`;
export const Form = styled.form`
  margin: 0 auto;
  padding: 20px;
  border: 5px solid black;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const AccountEditForm = styled(Form)``;
export const UserInfoEditForm = styled(Form)`
  .input-wrap {
    width: 100%;
    display: flex;
  }
`;
