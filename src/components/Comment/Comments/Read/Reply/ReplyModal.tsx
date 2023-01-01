import { Layer } from './Layer';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { Inputs } from '../../../Create/Modal/Inputs';
import { OverlayBg } from '../../../../../Tools/OverlayBg';
import { useUser } from '../../../../../libs/client/useUser';
import { ICmtForm, IRes } from '../../../../../types/global';
import { Modal } from '../../../../../../styles/global';
import { cmtModalVar } from '../../../../../../styles/variants';
import useMutation from '../../../../../libs/client/useMutation';
import { LoadingModal } from '../../../../../Tools/Modal/Loading';
import { TheComment, useCmtRes } from '../../../../../libs/client/useComment';
import {
  UseCapLetter,
  UseLength,
  useResponsive,
} from '../../../../../libs/client/useTools';
import { MobModal } from '../../../../../../styles/mobile';

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
  const userId = UseCapLetter(host.userId);
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
    if (UseLength(text) > 700)
      return setError('text', { message: 'overmax_comment' });
    setLoading(true);
    const isOriginal = Boolean(og_id === 0 && reply_id === 0);
    if (isOriginal) return reply({ text, post_id, og_id: id, reply_id: id });
    else return reply({ text, post_id, og_id: comment.og_id, reply_id: id });
  };
  const { Loading, setLoading } = useCmtRes({
    _data: { closeModal, setPost, setCmtModal, data },
  });
  const { isDesk } = useResponsive();
  return (
    <AnimatePresence>
      {Loading && <LoadingModal theme={theme} />}
      {modal && !Loading && (
        <Cont isDesk={isDesk}>
          <Modal
            exit="exit"
            initial="initial"
            animate="animate"
            className="modal"
            custom={theme}
            variants={cmtModalVar}
          >
            <form onSubmit={handleSubmit(onValid)}>
              <Layer _data={{ theme, userId, closeModal }} />
              <Inputs
                _data={{ theme, host_id, setPost, isDesk }}
                _useform={{
                  watch,
                  register,
                  clearErrors,
                  error: errors.text?.message!,
                }}
              />
            </form>
          </Modal>
          <OverlayBg closeModal={closeModal} />
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(MobModal)`
  .modal {
    .userId {
      color: #3498db;
      font-weight: 500;
      margin-left: 1rem;
    }
  }
`;
