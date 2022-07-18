import { Each } from './Each';
import { useState } from 'react';
import styled from '@emotion/styled';
import { DimBackground } from '../../../../../styles/global';

export const Menu = () => {
  const [select, setSelect] = useState('');
  const isClicked = Boolean(select);
  return (
    <>
      <Cont>
        <Each select={select} setSelect={setSelect} type={'board'} />
        <Each select={select} setSelect={setSelect} type={'post'} />
        <Each select={select} setSelect={setSelect} type={'review'} />
        <Each select={select} setSelect={setSelect} type={'movie'} />
      </Cont>
      {isClicked && <DimBackground zIndex={1} onClick={() => setSelect('')} />}
    </>
  );
};
const Cont = styled.article`
  gap: 4rem;
  display: flex;
  align-content: center;
  justify-content: center;
`;
