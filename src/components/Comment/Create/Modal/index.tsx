import { Layer } from './Layer';
import { Inputs } from './Inputs';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import { OverlayBg } from '../../../../Tools/OverlayBg';
import { useUser } from '../../../../libs/client/useUser';
import { ICmtForm, IRes } from '../../../../types/global';
import useMutation from '../../../../libs/client/useMutation';
import { LoadingModal } from '../../../../Tools/Modal/Loading';
import { FlexCol_, Modal } from '../../../../../styles/global';
import { color, greyBrdr } from '../../../../../styles/variants';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLength, useResponsive } from '../../../../libs/client/useTools';
import { MobModal } from '../../../../../styles/mobile';

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
  const { isDesk } = useResponsive();
  return (
    <AnimatePresence>
      {Loading && <LoadingModal theme={theme} />}
      {create && !Loading && (
        <Cont isDesk={isDesk}>
          <Modal
            exit="exit"
            variants={vars}
            className="modal"
            initial="initial"
            animate="animate"
            custom={{ theme, isDesk }}
          >
            <form onSubmit={handleSubmit(onValid)}>
              <Layer _data={{ theme, closeCreate }} />
              <Inputs
                _data={{ isDesk, theme, host_id: user_id, setPost }}
                _useform={{
                  watch,
                  register,
                  clearErrors,
                  error: errors.text?.message!,
                }}
              />
            </form>
          </Modal>
          <OverlayBg closeModal={closeCreate} />
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(MobModal)``;
const vars = {
  animate: ({ theme, isDesk }: any) => ({
    y: 0,
    opacity: 1,
    color: color(theme),
    transition: { duration: 0.5 },
    backgroundColor: color(!theme),
    border: !isDesk ? '1px solid transparent' : greyBrdr,
  }),
  initial: () => ({ y: 999, opacity: 0 }),
  exit: () => ({ y: 999, opacity: 0, transition: { duration: 0.5 } }),
};
