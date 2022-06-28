import styled from '@emotion/styled';
import { Svg } from '../../Style/Svg/Svg';
import { Modal, ModalClose } from '../../../../styles/global';

interface ISaveBoardUpdateProps {
  loading: boolean | null;
}
export const UpdateBG = ({}: ISaveBoardUpdateProps) => {
  return (
    <>
      <Cont>
        <h1>업데이트 저장중...</h1>
        <h2>Loading to save update...</h2>
        <Svg type="loading" />
      </Cont>
      <ModalClose zIndex={203} />
    </>
  );
};
const Cont = styled(Modal)`
  z-index: 204;
`;
