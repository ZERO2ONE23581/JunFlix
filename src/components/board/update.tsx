import styled from '@emotion/styled';
import { Svg } from '../../Tools/Svg';
import { Btn } from '../../Tools/Button';
import { useForm } from 'react-hook-form';
import { IForm } from '../../types/global';
import { Avatar } from '../../Tools/Avatar';
import { InputWrap } from '../../Tools/Input';
import { IBoardType } from '../../types/board';
import { AnimatePresence } from 'framer-motion';
import { OverlayBg } from '../../Tools/overlay';
import { scaleVar } from '../../../styles/variants';
import { useUser } from '../../libs/client/useUser';
import { SelectWrap } from '../../Tools/Input/Select';
import { TextAreaWrap } from '../../Tools/Input/TextArea';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Flex, Form, Modal, SetPrivate } from '../../../styles/global';
import { useCapLetters, useTextLimit } from '../../libs/client/useTools';

export interface ITypeModal {
  _data: {
    open: boolean;
    theme: boolean;
    loading: boolean;
    layoutId: string;
    original: IBoardType;
    post: ({}) => void;
    closeModal: () => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
}
export const UpdateBoard = ({ _data }: ITypeModal) => {
  const post = _data?.post!;
  const open = _data?.open!;
  const theme = _data?.theme!;
  const loading = _data?.loading!;
  const original = _data?.original!;
  const closeModal = _data?.closeModal!;
  const layoutId = _data?.layoutId!;
  const setLoading = _data?.setLoading!;
  //
  const { loggedInUser } = useUser();
  const {
    watch,
    setValue,
    setError,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({ mode: 'onSubmit' });

  //set value
  useEffect(() => {
    if (original) {
      if (original.genre) setValue('genre', original.genre);
      if (original.onPrivate) setValue('onPrivate', original.onPrivate);
      if (original.title) setValue('title', useCapLetters(original.title));
      if (original.description) setValue('description', original.description);
    }
  }, [original, setValue]);

  const onValid = async ({ title, genre, onPrivate, description }: IForm) => {
    const user_id = loggedInUser?.id;
    const { ok } = useTextLimit({
      _data: {
        setError,
        max: [50, 700],
        texts: [title, description!],
        types: ['title', 'description'],
      },
    });
    if (!ok) return;
    setLoading(true);
    if (loading) return;
    return post({ title, genre, onPrivate, description, user_id });
  };
  //
  return (
    <AnimatePresence>
      {open && (
        <>
          <Container
            variants={scaleVar}
            layoutId={layoutId}
            custom={{ theme, duration: 0.6 }}
            exit="exit"
            initial="initial"
            animate="animate"
            className="board-modal"
          >
            <Svg
              type="close"
              theme={theme}
              onClick={closeModal}
              item={{ size: '2rem' }}
            />
            <h1>Edit Board</h1>
            <Form onSubmit={handleSubmit(onValid)}>
              <Flex className="flex">
                <InputWrap
                  _data={{
                    theme,
                    clearErrors,
                    id: 'title',
                    type: 'text',
                    label: 'Title',
                    text: watch('title'),
                    error: errors.title?.message!,
                    register: register('title', {
                      required: '제목을 입력하세요.',
                    }),
                  }}
                />
                <Btn type="submit" item={{ theme, name: 'Save' }} />
              </Flex>
              <Flex>
                <SelectWrap
                  _data={{
                    theme,
                    id: 'genre',
                    text: watch('genre'),
                    register: register('genre'),
                    error: errors.genre?.message!,
                  }}
                />
              </Flex>
              <TextAreaWrap
                _data={{
                  theme,
                  min: 120,
                  max: 700,
                  clearErrors,
                  id: 'description',
                  label: 'Description',
                  text: watch('description'),
                  register: register('description'),
                  error: errors.description?.message,
                }}
              />
              <SetPrivate className="set-private">
                <label htmlFor="private-mode">
                  <span>비공개 보드로 전환</span>
                  <span>(On private mode)</span>
                </label>
                <input
                  type="checkbox"
                  id="private-mode"
                  {...register('onPrivate')}
                />
              </SetPrivate>
              <Host>
                <Avatar
                  _data={{ theme, size: '3.3rem', host_id: original.host_id }}
                />

                <span>Board Host:</span>
                <span>@{original.host.userId}</span>
              </Host>
            </Form>
          </Container>
          <OverlayBg closeModal={closeModal} />
        </>
      )}
    </AnimatePresence>
  );
};

export const Container = styled(Modal)`
  z-index: 100;
  height: 85vh;
  min-width: 520px;
  width: fit-content;
  margin: 3rem auto;
  padding: 3rem 2.5rem;
  h1 {
    font-size: 2rem;
  }
  form {
    width: 100%;
    height: 100%;
    gap: 1.2rem;
    margin-top: 1rem;
    max-height: 70vh;
    justify-content: flex-start;
    .set-private {
      font-size: 1.1rem;
      //border: 2px solid yellow;
      justify-content: space-between;
    }
    .flex {
      align-items: flex-end;
      gap: 1rem;
      button {
        width: 100px;
        padding: 10px;
        border-radius: 10px;
      }
    }
  }
`;
const Host = styled(Flex)`
  gap: 10px;
  opacity: 0.8;
  font-style: italic;
  justify-content: flex-start;
`;
