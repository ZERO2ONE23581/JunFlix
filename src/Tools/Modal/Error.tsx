import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { OverlayBg } from '../OverlayBg';
import { AnimatePresence } from 'framer-motion';
import { UseFormClearErrors } from 'react-hook-form';
import { UseMsg } from '../../libs/client/useMsg';
import { modalVar } from '../../../styles/variants';
import { Modal, Text } from '../../../styles/global';

interface IErrMsg {
  _data: {
    id?: string;
    theme: boolean;
    error?: string;
    clearErrors?: UseFormClearErrors<any>;
  };
}
export const ErrModal = ({ _data }: IErrMsg) => {
  const { id, theme, error, clearErrors } = _data;
  const { txt } = UseMsg({ error });
  const closeModal = () => clearErrors!(id);
  return (
    <AnimatePresence>
      {error && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            variants={modalVar}
            custom={{ theme, isRed: true }}
          >
            <Svg type="close" theme={theme} />
            <Text className="txt">
              {txt.kor && <span className="kor">{txt.kor}</span>}
              {txt.eng && <span>{txt.eng}</span>}
            </Text>
          </Cont>
          <OverlayBg dark={0.8} zIndex={221} closeModal={closeModal} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  z-index: 222;
  padding: 1rem;
  min-height: 30vh;
  .txt {
    > span {
      font-size: 1.6rem;
    }
    .kor {
      font-size: 1.5rem;
    }
  }
`;
