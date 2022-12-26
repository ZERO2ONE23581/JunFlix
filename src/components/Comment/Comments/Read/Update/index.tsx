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
import { useLength } from '../../../../../libs/client/useTools';
import useMutation from '../../../../../libs/client/useMutation';
import { LoadingModal } from '../../../../../Tools/Modal/Loading';
import { TheComment, useCmtRes } from '../../../../../libs/client/useComment';

interface IUpdateModal {
  _data: {
    theme: boolean;
    modal: boolean;
    comment: TheComment;
    closeModal: () => void;
    setPost: Dispatch<SetStateAction<boolean>>;
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
    if (useLength(text) > 700)
      return setError('text', { message: 'overmax_comment' });
    setLoading(true);
    return post({ text, post_id, cmt_id });
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
            layoutId="option"
            custom={theme}
            variants={cmtModalVar}
          >
            <Form onSubmit={handleSubmit(onValid)}>
              <Layer _data={{ theme, closeModal }} />
              <Inputs
                _data={{ theme, host_id, setPost }}
                _useform={{
                  watch,
                  register,
                  clearErrors,
                  error: errors.text?.message!,
                }}
              />
              {/* <Inputs>
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
              </Inputs> */}
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
