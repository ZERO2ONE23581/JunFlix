import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { IconBtn } from '../../Style/Button/IconBtn';

interface ITitle {
  setEditPost: Dispatch<SetStateAction<boolean>>;
}
export const Layer = ({ setEditPost }: ITitle) => {
  return (
    <Cont>
      <div />
      <h1>게시물 수정하기</h1>
      <IconBtn
        size="1.5rem"
        type="button"
        svgType="close"
        onClick={() => setEditPost(false)}
      />
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
  button {
    svg {
      fill: ${(p) => p.theme.color.bg};
    }
  }
`;
