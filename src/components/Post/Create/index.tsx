import { Modal } from './Modal';
import { SelectModal } from './Select';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MsgModal } from '../../../Tools/Modal/Message';
import { ICreatePostRes } from '../../../types/post';
import useMutation from '../../../libs/client/useMutation';
import { LoadingModal } from '../../../Tools/Modal/Loading';

interface ICreatePost {
  _data: {
    theme: boolean;
    createPost: boolean;
    closeModal: () => void;
  };
}
export const CreatePost = ({ _data }: ICreatePost) => {
  const router = useRouter();
  const { createPost: open, theme, closeModal } = _data;
  const { board_id } = router.query;
  const [msg, setMsg] = useState('');
  const [Loading, setLoading] = useState(false);
  const [listModal, setListModal] = useState(false);
  const [post, { data, loading }] =
    useMutation<ICreatePostRes>(`/api/post/create`);
  //
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) return setMsg(data.error);
        if (data?.ok) {
          if (board_id) return setMsg('created');
          else {
            closeModal();
            return setListModal(data?.ok!);
          }
        }
      }, 1000);
    }
  }, [data, setLoading, setMsg, board_id]);
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
