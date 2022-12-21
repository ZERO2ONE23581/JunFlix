import { Layer } from './Layer';
import { Inputs } from './Input';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import { IRes } from '../../../../types/global';
import { IPostType } from '../../../../types/post';
import { IBoardForm } from '../../../../types/board';
import { OverlayBg } from '../../../../Tools/OverlayBg';
import { PostModal } from '../../../../../styles/post';
import { ErrModal } from '../../../../Tools/Modal/Error';
import { MsgModal } from '../../../../Tools/Modal/Message';
import { useUser } from '../../../../libs/client/useUser';
import { modalVar } from '../../../../../styles/variants';
import { useLength } from '../../../../libs/client/useTools';
import useMutation from '../../../../libs/client/useMutation';
import { LoadingModal } from '../../../../Tools/Modal/Loading';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ICreateNewModal {
  _data: {
    modal: string;
    theme: boolean;
    layoutId: string;
    posts: IPostType[];
    setModal: Dispatch<SetStateAction<string>>;
  };
}
export const CreateNewModal = ({ _data }: ICreateNewModal) => {
  const { user_id: host_id } = useUser();
  const { posts, layoutId, modal, theme, setModal } = _data;
  const [Loading, setLoading] = useState(false);
  const [post, { data, loading }] = useMutation<IRes>(`/api/board/create`);
  const {
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onSubmit' });

  const max = 50;
  const onValid = ({ title }: any) => {
    if (loading) return;
    if (useLength(title) > max)
      return setError('title', { message: `max_board_title` });
    setLoading(true);
    return post({ title, user_id: host_id, posts });
  };

  const [msg, setMsg] = useState('');
  useEffect(() => {
    if (data) {
      setModal('');
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
          <MsgModal _data={{ msg, theme, layoutId }} />
          {modal === 'create_new' && (
            <>
              <Cont
                exit="exit"
                animate="animate"
                initial="initial"
                layoutId={layoutId}
                variants={modalVar}
                custom={{ theme, duration: 0.4 }}
              >
                <form onSubmit={handleSubmit(onValid)}>
                  <Layer theme={theme} closeModal={() => setModal('boards')} />
                  <Inputs _data={{ max, theme, watch, register }} />
                </form>
              </Cont>
              <ErrModal
                _data={{
                  theme,
                  id: 'title',
                  clearErrors,
                  error: errors.title?.message,
                }}
              />
              <OverlayBg dark={0.8} zIndex={113} />
            </>
          )}
          {Loading && <LoadingModal theme={theme} layoutId="modal" />}
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
  form {
    width: 100%;
    height: 92%;
    label {
      font-size: 1.4rem;
      text-align: center;
    }
  }
`;
