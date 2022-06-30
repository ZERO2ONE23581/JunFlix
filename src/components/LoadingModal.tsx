import styled from '@emotion/styled';
import { Modal, DimBackground } from '../../styles/global';
import { Svg } from './Style/Svg/Svg';

interface ILoadingModalProps {
  text: {
    kor: string;
    eng: string;
  };
  zIndex?: number;
}

export const LoadingModal = ({ text, zIndex }: ILoadingModalProps) => {
  return (
    <>
      <Cont zIndex={zIndex}>
        <h1>{text.kor}</h1>
        <h2>{text.eng}</h2>
        <Svg type="loading" />
      </Cont>
      <DimBackground zIndex={99} />
    </>
  );
};
const Cont = styled(Modal)<{ zIndex?: number }>`
  z-index: ${(p) => p.zIndex && p.zIndex};
  min-width: 300px;
`;
