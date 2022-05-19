import styled from '@emotion/styled';

export const BtnCont = styled.button`
  background-color: ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.input};
  color: ${(p) => p.theme.color.bg};
  border-radius: 5px;
  font-size: 0.8rem;
  margin: 8px auto;
  cursor: pointer;
  padding: 10px 0;
  border: none;
  width: 100%;
  &:hover {
    background-color: ${(p) => p.theme.color.logo};
    color: ${(p) => p.theme.color.bg};
  }
`;
export const IdCheck = styled(BtnCont)`
  width: 100px;
  height: 35px;
`;
export const YesOrNo = styled(BtnCont)`
  width: 100px;
  height: 35px;
`;
export const LinkBtn = styled.div`
  display: block;
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
  padding: 6px 0;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  width: 100px;
  height: 35px;
`;
export const Delete = styled(BtnCont)`
  width: 150px;
  padding: 10px;
  color: ${(p) => p.theme.color.bg};
  background-color: ${(p) => p.theme.color.font};
  &:hover {
    color: ${(p) => p.theme.color.logo};
    background-color: ${(p) => p.theme.color.bg};
  }
`;
export const Logout = styled(BtnCont)`
  color: ${(p) => p.theme.color.font};
  border: none;
  box-shadow: none;
  background-color: inherit;
  &:hover {
    background-color: ${(p) => p.theme.color.font};
    color: ${(p) => p.theme.color.bg};
  }
`;

export const Toggle = styled.button`
  position: absolute;
  right: 40px;
  top: 30px;
  width: 10px;
  height: 10px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Theme = styled(Toggle)`
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  border: 1px solid ${(p) => p.theme.color.font};
  border-radius: 5px;
  padding: 10px 30px;
`;
