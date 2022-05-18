import styled from '@emotion/styled';

export const Form = styled.form`
  background-color: ${(p) => p.theme.color.bg};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.font};
  border: ${(p) => p.theme.border};
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  padding: 10px 25px;
  display: flex;
  width: 330px;
`;
export const EditForm = styled(Form)``;
export const DataResult = styled.div`
  background-color: inherit;
  text-align: center;
  margin-bottom: 10px;
`;
