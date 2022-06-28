import styled from '@emotion/styled';
import { Modal, ModalClose, ModalSchema } from '../../styles/global';
import { Svg } from './Style/Svg/Svg';

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
        <h1>{text.kor}</h1>
        <h2>{text.eng}</h2>
        <Svg type="loading" />
      </Cont>
      <ModalClose />
    </>
  );
};
const Cont = styled(Modal)``;
