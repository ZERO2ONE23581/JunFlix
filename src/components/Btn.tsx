import styled from '@emotion/styled';

export const Btn = ({ onClick, btnName, type }: any) => {
  //
  return (
    <>
      {type === 'button' && (
        <Cont type="button" onClick={onClick}>
          {btnName}
        </Cont>
      )}
      {type === 'toggle' && (
        <Toggle type="button" onClick={onClick}>
          {btnName}
        </Toggle>
      )}
      {type === 'submit' && <Cont type="submit">{btnName}</Cont>}
    </>
  );
};

export const Cont = styled.button`
  margin: 10px auto;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 0;
  width: 100%;
  background-color: inherit;
  outline: none;
`;
const Back = styled(Cont)`
  /* width: none; */
`;
const Toggle = styled(Cont)`
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
