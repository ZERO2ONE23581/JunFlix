import { Texts } from './Texts';
import { BtnWrap } from '../BtnWrap';
import styled from '@emotion/styled';

export const Intro = () => {
  return (
    <Cont className="intro">
      <Texts />
      <BtnWrap />
    </Cont>
  );
};

const Cont = styled.section``;
