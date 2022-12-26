import { DeleteBoard } from '../../Delete';
import { UpdateBoard } from '../../Update';
import { IRes } from '../../../../types/global';
import { IBoardType } from '../../../../types/board';
import { Dispatch, SetStateAction, useState } from 'react';
import { MsgModal } from '../../../../Tools/Modal/Message';
import useMutation from '../../../../libs/client/useMutation';
import { LoadingModal } from '../../../../Tools/Modal/Loading';
import { useBoardApi, useBoardResult } from '../../../../libs/client/useBoards';

interface IBoardSet {
  _data: {
    type: string;
    theme: boolean;
    board: IBoardType;
    setType: Dispatch<SetStateAction<string>>;
  };
}

export const BoardModals = ({ _data }: IBoardSet) => {
  const [api, setApi] = useState('');
  const [msg, setMsg] = useState('');
  const [layoutId, setLayoutId] = useState('');
  const [Loading, setLoading] = useState(false);
  const { type, theme, board, setType } = _data;
  const [POST, { data, loading }] = useMutation<IRes>(api && api);
  const closeModal = () => setType('');
  const __data = { theme, layoutId, POST, board };
  const __modal = { type, Loading, loading, setLoading, closeModal };
  useBoardApi({ _data: { type, original: board, setLayoutId, setApi } });
  useBoardResult({ _data: { data, type, closeModal, setMsg, setLoading } });
  return (
    <>
      <MsgModal _data={{ msg, theme, layoutId }} />
      <UpdateBoard _modal={{ ...__modal }} _data={__data} />
      <DeleteBoard _modal={{ ...__modal }} _data={__data} />
      {Loading && <LoadingModal theme={theme} layoutId={layoutId} />}
    </>
  );
};
export interface IBoardSetting {
  _modal: {
    type: string;
    Loading: boolean;
    loading: boolean;
    closeModal: () => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
  _data: {
    theme: boolean;
    layoutId: string;
    POST: ({}) => void;
    board: IBoardType;
  };
}
