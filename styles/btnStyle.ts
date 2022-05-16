import styled from '@emotion/styled';

export const Cont = styled.button`
  background-color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.input};
  color: ${(p) => p.theme.color.bg};
  border: none;
  &:hover {
    background-color: ${(p) => p.theme.color.logo};
    color: ${(p) => p.theme.color.bg};
  }
  border-radius: 5px;
  margin: 10px auto;
  padding: 10px 0;
  outline: none;
  width: 100%;
  cursor: pointer;
`;
export const Delete = styled(Cont)`
  background-color: ${(p) => p.theme.color.font};
  color: ${(p) => p.theme.color.bg};
  width: 150px;
  padding: 10px;
  &:hover {
    background-color: red;
    color: white;
  }
`;
export const Logout = styled(Cont)`
  color: ${(p) => p.theme.color.font};
  border: none;
  box-shadow: none;
  background-color: inherit;
  &:hover {
    background-color: ${(p) => p.theme.color.font};
    color: ${(p) => p.theme.color.bg};
  }
`;

export const Toggle = styled(Cont)`
  position: absolute;
  top: 30px;
  right: 40px;
  width: 20px;
  height: 20px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Theme = styled(Toggle)`
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  border: 1px solid ${(p) => p.theme.color.font};
  border-radius: 5px;
  padding: 10px 30px;
`;
