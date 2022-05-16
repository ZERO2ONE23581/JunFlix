import styled from '@emotion/styled';

interface IBtnProps {
  onClick?: any;
  btnName?: string;
  type?: string;
  loading?: boolean;
}

export const Btn = ({ loading, onClick, btnName, type }: IBtnProps) => {
  //
  return (
    <>
      {type === 'button' && (
        <Cont type="button" onClick={onClick}>
          {btnName}
        </Cont>
      )}
      {type === 'logout' && (
        <Logout type="button" onClick={onClick}>
          {btnName}
        </Logout>
      )}
      {type === 'theme' && (
        <Theme type="button" onClick={onClick}>
          {btnName}
        </Theme>
      )}

      {type === 'delete' && (
        <Delete type="button" onClick={onClick}>
          {btnName}
        </Delete>
      )}
      {type === 'toggle' && (
        <Toggle type="button" onClick={onClick}>
          {btnName}
        </Toggle>
      )}
      {type === 'submit' && (
        <Cont onClick={onClick} type="submit">
          {loading ? 'Loading...' : btnName}
        </Cont>
      )}
    </>
  );
};

export const Cont = styled.button`
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  border: 5px solid ${(p) => p.theme.color.font};
  margin: 10px auto;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 0;
  width: 100%;
  background-color: inherit;
  outline: none;
`;
const Delete = styled(Cont)`
  border: none;
  background-color: ${(p) => p.theme.color.font};
  color: ${(p) => p.theme.color.bg};
  width: 150px;
  padding: 10px;
  &:hover {
    background-color: red;
    color: white;
  }
`;
const Logout = styled(Cont)`
  color: ${(p) => p.theme.color.font};
  border: none;
  box-shadow: none;
  background-color: inherit;
  &:hover {
    background-color: ${(p) => p.theme.color.font};
    color: ${(p) => p.theme.color.bg};
  }
`;
const Back = styled(Cont)`
  /* width: none; */
`;
const Toggle = styled(Cont)`
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
const Theme = styled(Toggle)`
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  border: 1px solid ${(p) => p.theme.color.font};
  border-radius: 5px;
  padding: 10px 30px;
`;
