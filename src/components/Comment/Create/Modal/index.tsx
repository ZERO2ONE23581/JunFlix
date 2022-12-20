import { Layer } from './Layer';
import { Inputs } from './Inputs';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { IRes } from '../../../../types/global';
import { AnimatePresence } from 'framer-motion';
import { OverlayBg } from '../../../../Tools/OverlayBg';
import { ICmtForm } from '../../../../types/comments';
import { color } from '../../../../../styles/variants';
import { useUser } from '../../../../libs/client/useUser';
import { Form, Modal } from '../../../../../styles/global';
import { useLength } from '../../../../libs/client/useTools';
import useMutation from '../../../../libs/client/useMutation';
import { LoadingModal } from '../../../../Tools/Modal/Loading';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ICreateModal {
  _data: {
    theme: boolean;
    post_id: number;
    create: boolean;
    closeCreate: () => void;
    setPost: Dispatch<SetStateAction<string>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const CreateModal = ({ _data }: ICreateModal) => {
  const { user_id } = useUser();
  const [Loading, setLoading] = useState(false);
  const { theme, post_id, create, closeCreate, setPost, setCmtModal } = _data;

  const {
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<ICmtForm>({ mode: 'onSubmit' });
  const [post, { loading, data }] = useMutation<IRes>(`/api/comment/create`);

  const onValid = ({ text }: ICmtForm) => {
    if (loading) return;
    if (useLength(text) > 700)
      return setError('text', { message: 'overmax_comment' });
    setLoading(true);
    return post({ text, post_id });
  };

  useEffect(() => {
    if (data) {
      setLoading(false);
      if (data.ok) {
        setPost('');
        closeCreate();
        setCmtModal(false);
        setTimeout(() => {
          setPost('read');
          setCmtModal(true);
        }, 500);
      }
    }
  }, [data, closeCreate, setPost, setCmtModal]);

  return (
    <AnimatePresence>
      {Loading && <LoadingModal theme={theme} />}
      {create && !Loading && (
        <>
          <Cont
            custom={theme}
            variants={vars}
            exit="exit"
            initial="initial"
            animate="animate"
            className="modal"
          >
            <Form onSubmit={handleSubmit(onValid)}>
              <Layer _data={{ theme, closeCreate }} />
              <Inputs
                _data={{ theme, host_id: user_id, setPost }}
                _useform={{
                  watch,
                  register,
                  clearErrors,
                  error: errors.text?.message!,
                }}
              />
            </Form>
          </Cont>
          <OverlayBg closeModal={closeCreate} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  top: 33vh;
  width: 33vw;
  min-width: 500px;
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
