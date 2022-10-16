import { useRouter } from 'next/router';
import { LoadingModal } from './loading_modal';
import { MessageModal } from '../msg_modal';
import { useEffect, useState } from 'react';
import { ITheme } from '../../../styles/theme';
import { IBoardType } from '../../types/board';
import { AnimatePresence } from 'framer-motion';
import { Overlay } from '../../../styles/global';
import useMutation from '../../libs/client/useMutation';
import { DeleteBoard } from '../../components/board/delete';
import { UpdateBoard } from '../../components/board/update';
import { IRes } from '../../types/global';
import { opacityVar } from '../../../styles/variants';

interface IModalBox extends ITheme {
  type: string;
  modal: boolean;
  ogData: IBoardType;
  closeModal: () => void;
}
export const ModalSchema = ({
  type,
  modal,
  theme,
  ogData,
  closeModal,
}: IModalBox) => {
  const router = useRouter();
  const [api, setApi] = useState('');
  const [message, setMessage] = useState('');
  const [Loading, setLoading] = useState(false);
  const [post, { data, loading }] = useMutation<IRes>(api && api);

  useEffect(() => {
    if (type && ogData) {
      if (type === 'update-board') setApi(`/api/board/${ogData.id}/update`);
      if (type === 'delete-board') setApi(`/api/board/${ogData.id}/delete`);
    }
  }, [setApi, type, ogData]);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) return setMessage(data.error);
        if (data.ok) {
          closeModal();
          if (type === 'update-board') {
            setMessage('업데이트 완료 (Update Completed)');
            setTimeout(() => {
              return router.reload();
            }, 1000);
          }
          if (type === 'delete-board') {
            setMessage('삭제완료 (Delete Completed)');
            setTimeout(() => {
              return router.replace(`/board/all`);
            }, 1000);
          }
        }
      }, 1000);
    }
  }, [type, data, setLoading, setTimeout, router, setMessage, closeModal]);
  //
  return (
    <AnimatePresence>
      {modal && (
        <>
          {!Loading && (
            <>
              {type === 'update-board' && (
                <UpdateBoard
                  post={post}
                  theme={theme}
                  ogData={ogData}
                  loading={loading}
                  closeModal={closeModal}
                  setLoading={setLoading}
                />
              )}
              {type === 'delete-board' && (
                <DeleteBoard
                  post={post}
                  theme={theme}
                  ogData={ogData}
                  loading={loading}
                  closeModal={closeModal}
                  setLoading={setLoading}
                />
              )}
              <MessageModal
                theme={theme}
                message={message}
                setMessage={setMessage}
              />
            </>
          )}
          {Loading && <LoadingModal theme={theme} />}
          <Overlay
            exit="exit"
            initial="initial"
            animate="animate"
            onClick={closeModal}
            variants={opacityVar}
          />
        </>
      )}
    </AnimatePresence>
  );
};
