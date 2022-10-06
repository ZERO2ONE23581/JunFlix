import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Svg } from '../../../../Tools/Svg';

interface ITitle {
  setEdit: Dispatch<SetStateAction<boolean>>;
}
export const Layer = ({ setEdit }: ITitle) => {
  return (
    <Cont>
      <div />
      <h1>포스트 수정</h1>
      <Svg size="1.5rem" type="close" onClick={() => setEdit(false)} />
    </Cont>
  );
};
const Cont = styled.div`
  display: flex;
  font-weight: 500;
  padding: 8px 20px;
  align-items: center;
  justify-content: space-between;
  color: ${(p) => p.theme.color.bg};
  background-color: ${(p) => p.theme.color.font};
  h1 {
    margin-left: 30px;
  }
  button {
    svg {
      fill: ${(p) => p.theme.color.bg};
    }
  }
`;
