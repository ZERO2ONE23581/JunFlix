import styled from '@emotion/styled';

export const Form = styled.form`
  background-color: ${(p) => p.theme.color.bg};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 25px;
  width: 330px;
  height: 380px;
`;
export const EditForm = styled(Form)``;
export const DataResult = styled.div`
  background-color: inherit;
  text-align: center;
  margin-bottom: 10px;
`;
