import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Modal } from '../../../../../../styles/global';
import { cmtModalVar, color } from '../../../../../../styles/variants';
import { TheComment, useCmtRes } from '../../../../../libs/client/useComment';
import useMutation from '../../../../../libs/client/useMutation';
import { useCapLetter, useLength } from '../../../../../libs/client/useTools';
import { useUser } from '../../../../../libs/client/useUser';
import { LoadingModal } from '../../../../../Tools/Modal/Loading';
import { OverlayBg } from '../../../../../Tools/OverlayBg';
import { ICmtForm } from '../../../../../types/comments';
import { IRes } from '../../../../../types/global';
import { Inputs } from '../../../Create/Modal/Inputs';
import { Layer } from './Layer';

interface IReplyModal {
  _data: {
    theme: boolean;
    modal: boolean;
    comment: TheComment;
    closeModal: () => void;
    setPost: Dispatch<SetStateAction<string>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const ReplyModal = ({ _data }: IReplyModal) => {
  const router = useRouter();
  const { user_id: host_id, isLoggedIn } = useUser();
  const { theme, setPost, modal, closeModal, setCmtModal, comment } = _data;
  const { id, og_id, reply_id, post_id, host } = comment;
  const userId = useCapLetter(host.userId);
  const [reply, { loading, data }] = useMutation<IRes>(`/api/comment/reply`);
  const {
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<ICmtForm>({ mode: 'onSubmit' });

  const onValid = ({ text }: ICmtForm) => {
    if (loading) return;
    if (!isLoggedIn) return router.push('/login');
    if (useLength(text) > 700)
      return setError('text', { message: 'overmax_comment' });
    setLoading(true);
    const isOriginal = Boolean(og_id === 0 && reply_id === 0);
    if (isOriginal) return reply({ text, post_id, og_id: id, reply_id: id });
    else return reply({ text, post_id, og_id: comment.og_id, reply_id: id });
  };
  const { Loading, setLoading } = useCmtRes({
    _data: { closeModal, setPost, setCmtModal, data },
  });
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
            variants={cmtModalVar}
          >
            <Form onSubmit={handleSubmit(onValid)}>
              <Layer _data={{ theme, userId, closeModal }} />
              <Inputs
                _data={{ theme, host_id, setPost }}
                _useform={{
                  watch,
                  register,
                  clearErrors,
                  error: errors.text?.message!,
                }}
              />
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
  min-width: 500px;
  height: fit-content;
  background-color: inherit;
  form {
    width: 100%;
    gap: 1.2rem;
    h1 {
      font-size: 1.5rem;
      span {
        :first-of-type {
          margin-right: 0.5rem;
        }
      }
      .userId {
        color: #3498db;
        font-weight: 500;
      }
    }
  }
`;
