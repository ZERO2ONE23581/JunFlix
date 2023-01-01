import { Layer } from './Layer';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import { Inputs } from '../../../Create/Modal/Inputs';
import { OverlayBg } from '../../../../../Tools/OverlayBg';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { ICmtForm, IRes } from '../../../../../types/global';
import { useUser } from '../../../../../libs/client/useUser';
import { Form, Modal } from '../../../../../../styles/global';
import { cmtModalVar } from '../../../../../../styles/variants';
import { UseLength, useResponsive } from '../../../../../libs/client/useTools';
import useMutation from '../../../../../libs/client/useMutation';
import { LoadingModal } from '../../../../../Tools/Modal/Loading';
import { TheComment, useCmtRes } from '../../../../../libs/client/useComment';
import { MobModal } from '../../../../../../styles/mobile';

interface IUpdateModal {
  _data: {
    theme: boolean;
    modal: boolean;
    comment: TheComment;
    closeModal: () => void;
    setPost: Dispatch<SetStateAction<string>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const UpdateModal = ({ _data }: IUpdateModal) => {
  const { setCmtModal, theme, modal, closeModal, comment, setPost } = _data;
  const { id: cmt_id, post_id } = comment;
  const [post, { loading, data }] = useMutation<IRes>(`/api/comment/update`);
  const { user_id: host_id } = useUser();
  const {
    watch,
    setValue,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<ICmtForm>({ mode: 'onSubmit' });

  useEffect(() => {
    if (comment.text) setValue('text', comment.text);
  }, [setValue, comment]);

  const onValid = ({ text }: ICmtForm) => {
    if (loading) return;
    if (UseLength(text) > 700)
      return setError('text', { message: 'overmax_comment' });
    setLoading(true);
    return post({ text, post_id, cmt_id });
  };
  const { Loading, setLoading } = useCmtRes({
    _data: { closeModal, setPost, setCmtModal, data },
  });
  const { isDesk } = useResponsive();
  const error = errors.text?.message!;
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
            layoutId="option"
            custom={theme}
            variants={cmtModalVar}
          >
            <Form onSubmit={handleSubmit(onValid)}>
              <Layer _data={{ theme, closeModal }} />
              <Inputs
                _data={{ theme, host_id, setPost, isDesk }}
                _useform={{ watch, error, register, clearErrors }}
              />
            </Form>
          </Modal>
          <OverlayBg closeModal={closeModal} />
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(MobModal)`
  .modal {
    top: 33vh;
    z-index: 100;
    height: ${(p) => (p.isDesk ? 'fit-content' : '70%')};
  }
`;
