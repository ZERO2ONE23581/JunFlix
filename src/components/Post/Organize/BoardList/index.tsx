import { Layer } from './Layer';
import styled from '@emotion/styled';
import { BoardsList } from './List';
import { AnimatePresence } from 'framer-motion';
import { OverlayBg } from '../../../../Tools/overlay';
import { PostModal } from '../../../../../styles/post';
import { scaleVar } from '../../../../../styles/variants';
import { FlexCol } from '../../../../../styles/global';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NewBtn } from './New_Btn';
import useMutation from '../../../../libs/client/useMutation';
import { MsgModal } from '../../../../Tools/msg_modal';
import { LoadingModal } from '../../../../Tools/Modal/loading_modal';
import { IRes } from '../../../../types/global';
import { Form } from './Form';
import { IPostForm, IPostType } from '../../../../types/post';
import { UseFormHandleSubmit } from 'react-hook-form';

interface IBoardsModal {
  _data: {
    modal: string;
    theme: boolean;
    layoutId: string;
    posts: IPostType[];
    setModal: Dispatch<SetStateAction<string>>;
    handleSubmit?: UseFormHandleSubmit<IPostForm>;
  };
}
export const BoardsModal = ({ _data }: IBoardsModal) => {
  const { theme, modal, layoutId, posts, handleSubmit, setModal } = _data;
  const [boardId, setBoardId] = useState(0);
  const [post, { data, loading }] = useMutation<IRes>(
    `/api/post/update/${boardId}`
  );
  const [Loading, setLoading] = useState(false);
  const onValid = () => {
    if (loading) return;
    setLoading(true);
    return post({ posts });
  };
  //
  const [msg, setMsg] = useState('');
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.ok) setMsg('updated');
        else alert('failed.');
      }, 1000);
    }
  }, [data, setMsg, setLoading]);
  return (
    <>
      <AnimatePresence>
        <>
          {modal === 'boards' && !Loading && (
            <>
              <Cont
                exit="exit"
                initial="initial"
                animate="animate"
                layoutId={layoutId}
                variants={scaleVar}
                custom={{ theme, duration: 0.7 }}
              >
                <Form
                  _data={{
                    theme,
                    onValid,
                    handleSubmit,
                    closeModal: () => setModal('posts'),
                    clickBoard: (id: number) => setBoardId(id),
                    openNewModal: () => setModal('create_new'),
                  }}
                />
              </Cont>
              <OverlayBg dark={0.8} zIndex={113} />
            </>
          )}
          <MsgModal _data={{ msg, theme, layoutId }} />
          {Loading && <LoadingModal theme={theme} />}
        </>
      </AnimatePresence>
    </>
  );
};
const Cont = styled(PostModal)`
  top: 0rem;
  z-index: 114;
  min-height: 85vh;
  width: fit-content;
  align-items: flex-start;
`;