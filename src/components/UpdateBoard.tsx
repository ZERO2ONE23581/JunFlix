import { Svg } from '../Tools/Svg';
import styled from '@emotion/styled';
import { Btn } from '../Tools/Button';
import { IForm } from '../types/global';
import { useForm } from 'react-hook-form';
import { IBoardType } from '../types/board';
import { OverlayBg } from '../Tools/OverlayBg';
import { mobVars } from '../../styles/variants';
import { AnimatePresence } from 'framer-motion';
import { Private } from './Private';
import { UpdateForm } from './UpdateForm';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Layer_, Mob, Modal, Flex } from '../../styles/global';
import { UseCapLetters, useResponsive } from '../libs/client/useTools';

export const UpdateBoard = ({ _data, _modal }: IUpdateBoard) => {
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
      if (title) setValue('title', UseCapLetters(title));
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
  const { isDesk } = useResponsive();
  const size = isDesk ? '2rem' : '4rem';

  return (
    <AnimatePresence>
      {modal && (
        <>
          <Cont isDesk={isDesk}>
            <Modal
              exit="exit"
              animate="animate"
              className="modal"
              initial="initial"
              variants={mobVars}
              layoutId={layoutId}
              custom={{ theme, isDesk }}
            >
              <Layer_ isDesk={isDesk} className="layer">
                <Svg
                  type="close_"
                  theme={theme}
                  item={{ size }}
                  onClick={onClose}
                />
                <h1>Edit Board</h1>
                <Flex />
              </Layer_>
              <UpdateForm
                _useform={__useform}
                _data={{ theme, loading, POST, setLoading }}
              />
              <Private register={register} isDesk={isDesk} />
              <Btn type="submit" item={{ theme, name: 'Save' }} />
            </Modal>
          </Cont>
          <OverlayBg closeModal={onClose} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Mob)`
  .modal {
    padding: 2rem;
    justify-content: flex-start;
    top: ${(p) => (p.isDesk ? '8vh' : '0vh')};
    width: ${(p) => (p.isDesk ? 'fit-content' : '100%')};
    height: ${(p) => (p.isDesk ? 'fit-content' : '100%')};
    h1 {
      font-size: ${(p) => (p.isDesk ? '1.8rem' : '3.8rem')};
    }
    .layer {
      padding: 0;
      > div {
        width: fit-content;
      }
    }
    form {
      gap: 2rem;
      padding: 0.2rem;
    }
    .private_mode {
      font-size: ${(p) => (p.isDesk ? '1.3rem' : '2.5rem')};
      input {
        width: ${(p) => (p.isDesk ? '1.8rem' : '3rem')};
        height: ${(p) => (p.isDesk ? '1.8rem' : '3rem')};
      }
    }
    button {
      margin: 2rem auto;
      width: fit-content;
      padding: 0.8rem 1rem;
      width: ${(p) => (p.isDesk ? 'fit-content' : '100%')};
      font-size: ${(p) => (p.isDesk ? '1.1rem' : '2.5rem')};
    }
  }
`;
interface IUpdateBoard {
  _data: {
    POST: ({}) => void;
    theme: boolean;
    layoutId: string;
    board: IBoardType;
  };
  _modal: {
    type: string;
    loading: boolean;
    Loading: boolean;
    closeModal: () => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
}
