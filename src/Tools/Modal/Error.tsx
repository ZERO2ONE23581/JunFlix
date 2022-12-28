import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { OverlayBg } from '../OverlayBg';
import { AnimatePresence } from 'framer-motion';
import { MobModal } from '../../../styles/mobile';
import { UseMsg } from '../../libs/client/useMsg';
import { modalVar } from '../../../styles/variants';
import { Modal, Text } from '../../../styles/global';
import { UseFormClearErrors } from 'react-hook-form';
import { useResponsive } from '../../libs/client/useTools';

interface IErrMsg {
  _data: {
    id?: string;
    theme: boolean;
    error?: string;
    clearErrors?: UseFormClearErrors<any>;
  };
}
export const ErrModal = ({ _data }: IErrMsg) => {
  const { isDesk } = useResponsive();
  const closeModal = () => clearErrors!(id);
  const { id, theme, error, clearErrors } = _data;
  const { txt } = UseMsg({ error });
  return (
    <AnimatePresence>
      {error && (
        <Cont isDesk={isDesk}>
          <Modal
            exit="exit"
            initial="initial"
            animate="animate"
            variants={modalVar}
            className="err_modal"
            custom={{ theme, isRed: true }}
          >
            <Svg type="close" theme={theme} />
            <Text className="txt">
              {txt.kor && <span className="kor">{txt.kor}</span>}
              {txt.eng && <span>{txt.eng}</span>}
            </Text>
          </Modal>
          <OverlayBg dark={0.8} zIndex={221} closeModal={closeModal} />
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(MobModal)`
  .err_modal {
    z-index: 222;
    padding: 1rem;
    min-height: 30vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .txt {
      > span {
        font-size: 1.6rem;
        font-size: ${(p) => (p.isDesk ? '1.6rem' : '2.4rem')};
      }
      .kor {
        font-size: 1.5rem;
        font-size: ${(p) => (p.isDesk ? '1.5rem' : '2.2rem')};
      }
    }
  }
`;
