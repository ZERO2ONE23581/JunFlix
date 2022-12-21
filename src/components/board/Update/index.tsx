import { useEffect } from 'react';
import { UpdateForm } from './Form';
import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { useForm } from 'react-hook-form';
import { IBoardSetting } from '../Read/Modals';
import { IForm } from '../../../types/global';
import { AnimatePresence } from 'framer-motion';
import { Modal } from '../../../../styles/global';
import { OverlayBg } from '../../../Tools/OverlayBg';
import { modalVar } from '../../../../styles/variants';
import { useCapLetters } from '../../../libs/client/useTools';

export const UpdateBoard = ({ _data, _modal }: IBoardSetting) => {
  const { POST, theme, layoutId, board } = _data;
  const { Loading, type, loading, closeModal, setLoading } = _modal;
  const {
    watch,
    reset,
    setValue,
    setError,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({ mode: 'onSubmit' });

  const genre = board?.genre!;
  const title = board?.title!;
  const onPrivate = board?.onPrivate!;
  const description = board?.description!;
  useEffect(() => {
    if (board) {
      if (genre) setValue('genre', genre);
      if (onPrivate) setValue('onPrivate', onPrivate);
      if (title) setValue('title', useCapLetters(title));
      if (description) setValue('description', description);
    }
  }, [genre, onPrivate, title, description, setValue, board]);
  const onClose = () => {
    closeModal();
    reset({ title, genre, onPrivate, description });
  };
  const __useform = {
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    errors: {
      err_desc: errors.title?.message!,
      err_title: errors.description?.message!,
    },
  };
  const modal = !Loading && Boolean(type === 'update-board');
  return (
    <>
      <AnimatePresence>
        {modal && (
          <Cont
            custom={theme}
            variants={modalVar}
            layoutId={layoutId}
            exit="exit"
            initial="initial"
            animate="animate"
          >
            <Svg type="close" theme={theme} onClick={onClose} />
            <h1>Edit Board</h1>
            <UpdateForm
              _useform={__useform}
              _data={{ theme, loading, POST, setLoading }}
            />
          </Cont>
        )}
      </AnimatePresence>
      {modal && <OverlayBg closeModal={onClose} />}
    </>
  );
};
const Cont = styled(Modal)`
  top: 8vh;
  max-height: 85vh;
  form {
    gap: 2rem 1.5rem;
    padding: 0.2rem;
  }
`;
