import { MsgModal } from '../msg_modal';
import { useRouter } from 'next/router';
import { IRes } from '../../types/global';
import { useEffect, useState } from 'react';
import { LoadingModal } from './loading_modal';
import { IBoardType } from '../../types/board';
import useMutation from '../../libs/client/useMutation';
import { DeleteBoard } from '../../components/Board/Delete';
import { UpdateBoard } from '../../components/Board/Update';

interface IBoardSchema {
  _data: {
    type: string;
    modal: boolean;
    theme: boolean;
    board: IBoardType;
    closeBoard: () => void;
  };
}
export const BoardSchema = ({ _data }: IBoardSchema) => {
  const router = useRouter();
  const [api, setApi] = useState('');
  const [msg, setMsg] = useState('');
  const [layoutId, setLayoutId] = useState('');
  const [Loading, setLoading] = useState(false);
  const [post, { data, loading }] = useMutation<IRes>(api && api);
  const { type, modal, theme, board: original, closeBoard } = _data;
  const open = (Type: string) => Boolean(modal && !Loading && type === Type);
  const __data = {
    post,
    theme,
    loading,
    original,
    layoutId,
    setLoading,
    closeModal: closeBoard,
  };

  useEffect(() => {
    if (type && original) {
      setLayoutId(type);
      if (type === 'update-board') setApi(`/api/board/${original.id}/update`);
      if (type === 'delete-board') setApi(`/api/board/${original.id}/delete`);
    }
  }, [setApi, type, original, setLayoutId]);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) {
          setMsg(data.error);
          setTimeout(() => {
            setMsg('');
          }, 2000);
        }
        if (data.ok) {
          closeBoard();
          if (type === 'update-board') {
            setMsg('updated');
            setTimeout(() => {
              return router.reload();
            }, 1000);
          }
          if (type === 'delete-board') {
            setMsg('deleted');
            setTimeout(() => {
              return router.replace(`/all/boards`);
            }, 1000);
          }
        }
      }, 1000);
    }
  }, [type, data, setLoading, setTimeout, router, setMsg, closeBoard]);
  return (
    <>
      <UpdateBoard _data={{ ...__data, open: open('update-board') }} />
      <DeleteBoard _data={{ ...__data, open: open('delete-board') }} />
      <MsgModal _data={{ msg, theme, layoutId }} />
      {Loading && <LoadingModal theme={theme} layoutId={layoutId} />}
    </>
  );
};
