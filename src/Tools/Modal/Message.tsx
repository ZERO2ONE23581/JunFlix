import styled from '@emotion/styled';
import { OverlayBg } from '../OverlayBg';
import { UseMsg } from '../../libs/client/useMsg';
import { AnimatePresence } from 'framer-motion';
import { mobVars, variants } from '../../../styles/variants';
import { FlexCol, Mob, Modal } from '../../../styles/global';
import { useResponsive } from '../../libs/client/useTools';

interface IMsgModal {
  _data: {
    msg: string;
    theme: boolean;
    layoutId?: string;
  };
}
export const MsgModal = ({ _data }: IMsgModal) => {
  const { msg, theme, layoutId } = _data;
  const { txt } = UseMsg({ msg });
  const { isDesk } = useResponsive();
  return (
    <AnimatePresence>
      {msg && (
        <Cont isDesk={isDesk}>
          <Modal
            exit="exit"
            initial="initial"
            animate="animate"
            variants={mobVars}
            layoutId={layoutId}
            className="msg_modal"
            custom={{ theme, isDesk }}
          >
            <Text>
              {txt.kor && <span className="kor">{txt.kor}</span>}
              {txt.eng && <span className="eng">{txt.eng}</span>}
            </Text>
          </Modal>
          <OverlayBg zIndex={200} />
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Mob)`
  .msg_modal {
    z-index: 999;
    top: ${(p) => (p.isDesk ? '30vh' : '60vh')};
    padding: ${(p) => (p.isDesk ? '1.5rem' : '2rem')};
    height: ${(p) => (p.isDesk ? 'fit-content' : '60%')};
    font-size: ${(p) => (p.isDesk ? '1.5rem' : '2.8rem')};
  }
`;
const Text = styled(FlexCol)`
  gap: 1rem;
  text-align: center;
  justify-content: center;
`;
