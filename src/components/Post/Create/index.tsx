import { Modal } from './Modal';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SelectModal } from './Select_Modal';
import { MsgModal } from '../../../Tools/msg_modal';
import { ICreatePostRes } from '../../../types/post';
import useMutation from '../../../libs/client/useMutation';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';

interface ICreatePost {
  open: boolean;
  theme: boolean;
  closeModal: () => void;
}
export const CreatePost = ({ open, theme, closeModal }: ICreatePost) => {
  const [msg, setMsg] = useState('');
  const [Loading, setLoading] = useState(false);
  const [post, { data, loading }] =
    useMutation<ICreatePostRes>(`/api/post/create`);
  //
  const [listModal, setListModal] = useState(false);
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) return setMsg(data.error);
        else {
          closeModal();
          setListModal(data?.ok!);
        }
      }, 1000);
    }
  }, [data, setLoading, setMsg]);
  //
  const post_id = data?.post_id;
  const layoutId = 'create_post';
  const modal = open && !Loading;
  const _modal = listModal! && !Loading;
  const __data = { theme, setLoading, layoutId, Loading };
  const create_modal = { ...__data, modal, post, loading, closeModal };
  const list_data = { ...__data, _modal, setMsg, post_id, setListModal };
  return (
    <AnimatePresence>
      <>
        <Modal _data={{ ...create_modal }} />
        <SelectModal _data={{ ...list_data }} />
        <MsgModal _data={{ layoutId, msg, theme }} />
        {Loading && <LoadingModal layoutId={layoutId} theme={theme} />}
      </>
    </AnimatePresence>
  );
};
