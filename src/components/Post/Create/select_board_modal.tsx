import { useEffect, useState } from 'react';
import useUser from '../../../libs/client/useUser';
import { variants } from '../../../../styles/variants';
import useMutation from '../../../libs/client/useMutation';
import { MsgModal } from '../../../Tools/msg_modal';
import { OverlayBg } from '../../../Tools/overlay';
import { IRes } from '../../../types/global';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';
import { Btn } from '../../../Tools/Button';
import { SelectModal } from '../../../../styles/post';
import { Layer } from '../select_board_modal_layer';
import { BoardMap } from '../update/select_board_modal_map';
import { BtnWrap } from '../../../../styles/global';
import { AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

interface ISelectBoard {
  theme: boolean;
  modal: boolean;
  post_id: number;
  closeModal: () => void;
}
export const SelectBoardModal = ({
  modal,
  theme,
  post_id,
  closeModal,
}: ISelectBoard) => {
  const [msg, setMsg] = useState('');
  const { loggedInUser } = useUser();
  const [Loading, setLoading] = useState(false);

  const onSubmit = (board_id: number) => {
    if (loading) return;
    setLoading(true);
    if (!board_id) {
      setTimeout(() => {
        setMsg('create_done');
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }, 1000);
    }
    if (board_id) return post({ board_id });
  };
  const [post, { data, loading }] = useMutation<IRes>(
    `/api/post/${post_id}/select_board`
  );
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (!data.ok && data.error) setMsg(data.error);
        if (data.ok) setMsg('create_done');
      }, 1000);
    }
  }, [data, setLoading, setMsg]);

  return (
    <AnimatePresence>
      {modal && (
        <>
          {!Loading && (
            <Modal
              exit="exit"
              animate="animate"
              initial="initial"
              custom={!theme}
              variants={variants}
            >
              <Layer
                theme={theme}
                title={'select board'}
                closeModal={closeModal}
                clickSkip={(id: number) => onSubmit(0)}
              />
              <BoardMap
                theme={theme}
                host_id={loggedInUser?.id!}
                clickBoard={(id: number) => onSubmit(id)}
                clickQuickSave={(id: number) => onSubmit(0)}
              />
            </Modal>
          )}
          {Loading && !msg && <LoadingModal theme={theme} />}
          <OverlayBg dark={0.7} />
          <MsgModal msg={msg} theme={theme} closeModal={() => setMsg('')} />
        </>
      )}
    </AnimatePresence>
  );
};
const Modal = styled(SelectModal)`
  min-width: 40vw;
`;
