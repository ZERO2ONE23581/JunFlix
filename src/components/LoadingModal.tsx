import styled from '@emotion/styled';
import { Svg } from './Style/Svg/Svg';
import { DimBackground, AnswerModal } from '../../styles/global';

interface ILoadingModalProps {
  text: {
    kor: string;
    eng: string;
  };
}
export const LoadingModal = ({ text }: ILoadingModalProps) => {
  return (
    <>
      <Cont>
        <ul>
          <li>
            <span>{text.kor}</span>
            <span>{text.eng}</span>
          </li>
        </ul>
        <Svg type="loading" size="2rem" />
      </Cont>
      <DimBackground zIndex={99} />
    </>
  );
};
const Cont = styled(AnswerModal)``;
