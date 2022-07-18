import { Modal } from './Modal';
import styled from '@emotion/styled';
import { CapFirstLetter } from '../../../Tools';
import { Dispatch, SetStateAction } from 'react';

interface IEach {
  type: string;
  select: string;
  setSelect: Dispatch<SetStateAction<string>>;
}
export const Each = ({ select, setSelect, type }: IEach) => {
  return (
    <Cont>
      <Item onClick={() => setSelect(type)}>{CapFirstLetter(type)}</Item>
      {select === type && (
        <Modal type={type} setSelect={setSelect} text={CapFirstLetter(type)} />
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
