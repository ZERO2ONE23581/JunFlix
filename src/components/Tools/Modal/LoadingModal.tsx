import styled from '@emotion/styled';
import { Svg } from '../Svg';
import { DimBackground, AnswerModal } from '../../../../styles/global';

interface ILoadingModalProps {
  zIndex: number;
  text: {
    kor: string;
    eng: string;
  };
}
export const LoadingModal = ({ text, zIndex }: ILoadingModalProps) => {
  return (
    <>
      <Cont zIndex={zIndex}>
        <span>{text.kor}</span>
        <span>{text.eng}</span>
        <Svg type="loading" size="2rem" />
      </Cont>
      <DimBackground zIndex={99} />
    </>
  );
};
const Cont = styled(AnswerModal)<{ zIndex?: number }>`
  gap: 10px;
  min-width: 300px;
  align-items: center;
  z-index: ${(p) => p.zIndex && p.zIndex};
`;
