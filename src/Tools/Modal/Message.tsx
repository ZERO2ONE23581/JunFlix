import styled from '@emotion/styled';
import { OverlayBg } from '../Overlay';
import { UseMsg } from '../../libs/client/useMsg';
import { AnimatePresence } from 'framer-motion';
import { variants } from '../../../styles/variants';
import { FlexCol, Modal } from '../../../styles/global';

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
  return (
    <AnimatePresence>
      {msg && (
        <>
          <Cont
            exit="exit"
            custom={theme}
            initial="initial"
            animate="animate"
            layoutId={layoutId}
            variants={variants}
            className="msg-modal"
          >
            <Text>
              {txt.kor && <span className="kor">{txt.kor}</span>}
              {txt.eng && <span className="eng">{txt.eng}</span>}
            </Text>
          </Cont>
          <OverlayBg zIndex={200} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  z-index: 999;
  top: 30%;
  width: fit-content;
  height: fit-content;
  z-index: 201;
  padding: 40px;
  font-size: 1.5rem;
`;
const Text = styled(FlexCol)`
  gap: 10px;
  align-items: center;
  justify-content: center;
`;
