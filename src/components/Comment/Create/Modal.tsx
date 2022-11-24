import styled from '@emotion/styled';
import { ISetPost } from '..';
import { useEffect, useState } from 'react';
import { Svg } from '../../../Tools/Svg';
import { IRes } from '../../../types/global';
import { Avatar } from '../../../Tools/Avatar';
import { useUser } from '../../../libs/client/useUser';
import { Flex, Form, Modal } from '../../../../styles/global';
import { OverlayBg } from '../../../Tools/overlay';
import { AnimatePresence } from 'framer-motion';
import { color } from '../../../../styles/variants';
import { TextAreaWrap } from '../../../Tools/Input/TextArea';
import { useForm } from 'react-hook-form';
import { ICmtForm } from '../../../types/comments';
import useMutation from '../../../libs/client/useMutation';
import { useCapLetter, useLength } from '../../../libs/client/useTools';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';

interface ICreateModal extends ISetPost {
  _data: {
    modal: boolean;
    post_id: number;
    closeModal: () => void;
  };
  _reply?: {
    og_id: number;
    rep_userId: string;
    reply_id?: number;
  };
}
export const CreateModal = ({
  theme,
  _data,
  _reply,
  setPost,
}: ICreateModal) => {
  const og_id = _reply?.og_id!;
  const reply_id = _reply?.reply_id!;
  const userId = _reply?.rep_userId!;
  const { modal, closeModal, post_id } = _data;
  const [post, { loading, data }] = useMutation<IRes>(`/api/comment/create`);
  const [reply, { loading: rep_loading, data: rep_data }] = useMutation<IRes>(
    `/api/comment/reply/${og_id}`
  );
  const { user_id: host_id } = useUser();
  const {
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<ICmtForm>({ mode: 'onSubmit' });

  const onValid = ({ text }: ICmtForm) => {
    if (loading || rep_loading) return;
    if (useLength(text) > 700)
      return setError('text', { message: 'overmax_comment' });
    setLoading(true);
    if (og_id) {
      if (reply_id) return reply({ text, post_id, og_id, reply_id });
      else return reply({ text, post_id, og_id, reply_id: og_id });
    }
    return post({ text, post_id });
  };

  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    if (data) {
      setLoading(false);
      if (data.ok) {
        closeModal();
        setPost('');
        setTimeout(() => {
          setPost('read');
        }, 500);
      }
    }
  }, [data, closeModal, setPost]);

  useEffect(() => {
    if (rep_data) {
      setLoading(false);
      if (rep_data.ok) {
        closeModal();
        setPost('');
        setTimeout(() => {
          setPost('read');
        }, 500);
      }
    }
  }, [rep_data, closeModal, setPost]);
  return (
    <AnimatePresence>
      {Loading && <LoadingModal theme={theme} />}
      {modal && !Loading && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            className="modal"
            custom={theme}
            variants={vars}
          >
            <Form onSubmit={handleSubmit(onValid)}>
              <Layer>
                <div>
                  <Svg type="close_" theme={theme} onClick={closeModal} />
                </div>
                <div>
                  <h1>
                    {og_id ? `Add Reply ` : 'Add Comment'}
                    {og_id && (
                      <span className="userId">@{useCapLetter(userId!)}</span>
                    )}
                  </h1>
                </div>
                <div>
                  <button type="submit">
                    <Svg type="reply" theme={theme} />
                  </button>
                </div>
              </Layer>

              <Inputs>
                <Avatar
                  _data={{ size: '4rem', isRound: true, theme, host_id }}
                />
                <TextAreaWrap
                  _data={{
                    theme,
                    min: 150,
                    max: 700,
                    id: 'text',
                    clearErrors,
                    text: watch('text'),
                    error: errors.text?.message,
                    placeholder: 'Leave comments on this post...',
                    register: register('text', { required: 'need_comment' }),
                  }}
                />
              </Inputs>
            </Form>
          </Cont>
          <OverlayBg closeModal={closeModal} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  top: 33vh;
  width: 33vw;
  z-index: 100;
  color: inherit;
  height: fit-content;
  background-color: inherit;
  form {
    width: 100%;
    gap: 1.2rem;
    h1 {
      font-size: 1.5rem;
      .userId {
        color: #3498db;
        font-weight: 500;
      }
    }
  }
`;

const Layer = styled(Flex)`
  justify-content: space-between;
  button {
    background-color: inherit;
    border: none;
    outline: none;
  }
`;
const Inputs = styled(Flex)`
  gap: 1rem;
  width: 100%;
  padding-left: 0.2rem;
  align-items: flex-start;
  justify-content: flex-start;
  .textarea-wrap {
    min-width: 350px;
    width: fit-content;
  }
`;
const vars = {
  initial: (theme: boolean) => ({
    y: 999,
    opacity: 0,
    color: color(theme),
    backgroundColor: color(!theme),
  }),
  animate: (theme: boolean) => ({
    y: 0,
    opacity: 1,
    color: color(theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.5 },
  }),
  exit: (theme: boolean) => ({
    y: 999,
    opacity: 0,
    color: color(theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.5 },
  }),
};
