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
export const EditBoardBtn = styled(BtnCont)`
  width: 100px;
  height: 35px;
`;
export const CreateBtn = styled(BtnCont)`
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
    color: whitesmoke;
    background-color: ${(p) => p.theme.color.logo};
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

export const BtnAbs = styled.button`
  background-color: ${(p) => p.theme.color.font};
  color: ${(p) => p.theme.color.bg};
  padding: 8px;
  border-radius: 5px;
  position: absolute;
  border: none;
  right: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  display: flex;
  &:hover {
    background-color: ${(p) => p.theme.color.logo};
    color: whitesmoke;
  }
`;

export const EditReviewBtn = styled(BtnAbs)`
  top: 15px;
  right: 25px;
`;

export const Toggle = styled(BtnAbs)`
  background: none;
  height: 10px;
  width: 10px;
  right: 40px;
  top: 30px;
`;
export const Theme = styled(BtnAbs)`
  background-color: ${(p) => p.theme.color.bg};
  border: 2px solid ${(p) => p.theme.color.font};
  color: ${(p) => p.theme.color.font};
  padding: 5px 10px;
  top: 25px;
  right: 10px;
  &:hover {
    background-color: ${(p) => p.theme.color.font};
    color: ${(p) => p.theme.color.bg};
  }
`;
