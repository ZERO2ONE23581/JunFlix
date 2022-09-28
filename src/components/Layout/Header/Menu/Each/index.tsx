import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { useCapLetter } from '../../../../../libs/client/useTools';
import { Modal } from './Modal';

interface IEach {
  type: string;
  select: string;
  setSelect: Dispatch<SetStateAction<string>>;
}
export const Each = ({ select, setSelect, type }: IEach) => {
  return (
    <Cont>
      <Item onClick={() => setSelect(type)}>{useCapLetter(type)}</Item>
      {select === type && (
        <Modal type={type} setSelect={setSelect} text={useCapLetter(type)} />
      )}
    </Cont>
  );
};
const Cont = styled.div`
  position: relative;
`;
const Item = styled.span`
  cursor: pointer;
  &:hover {
    color: ${(p) => p.theme.color.logo};
  }
`;
