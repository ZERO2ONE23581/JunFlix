import { Svg } from '../../Tools/Svg';
import { Btn } from '../../Tools/Button';
import styled from '@emotion/styled';
import { InputWrap } from '../../Tools/Input';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { IForm } from '../../types/global';
import { SelectWrap } from '../../Tools/Input/Select';
import { ITheme } from '../../../styles/theme';
import { IBoardType } from '../../types/board';
import useUser from '../../libs/client/useUser';
import { TextAreaWrap } from '../../Tools/Input/TextArea';
import { Flex, Form, Modal, Setting } from '../../../styles/global';
import { Dispatch, SetStateAction, useEffect } from 'react';
import {
  isOverMax,
  useCapLetters,
  useError,
  useLength,
  useMaxLength,
} from '../../libs/client/useTools';
import { Avatar } from '../../Tools/Avatar';
import { variants } from '../../../styles/variants';

export interface ITypeModal extends ITheme {
  original: IBoardType;
  loading: boolean;
  post: ({}) => void;
  closeModal: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export const UpdateBoard = ({
  post,
  theme,
  original,
  loading,
  setLoading,
  closeModal,
}: ITypeModal) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const {
    watch,
    setValue,
    setError,
    register,
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

  const { max } = useMaxLength(40, 700);
  const IsOverMax = (text: string) => {
    const Max = Boolean(text === 'title') ? max.title : max.desc;
    const Type = Boolean(text === 'title') ? 'title' : 'description';
    return isOverMax(useLength(String(watch(Type))), Max);
  };
  const onValid = async ({ title, genre, onPrivate, description }: IForm) => {
    const user_id = loggedInUser?.id;
    useError({
      title,
      setError,
      desc: description,
      max: { title: 50, desc: 700 },
    });
    setLoading(true);
    if (loading) return;
    return post({ title, genre, onPrivate, description, user_id });
  };
  //
  return (
    <ModalCont
      exit="exit"
      initial="initial"
      animate="animate"
      custom={theme}
      variants={variants}
      className={'board-modal'}
    >
      <Svg
        type="close"
        theme={theme}
        onClick={closeModal}
        item={{ size: '2rem' }}
      />
      <h1>Edit Board</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <Flex className="inputs-flex">
          <InputWrap
            theme={theme}
            data={{
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
          <SelectWrap
            theme={theme}
            data={{
              id: 'genre',
              text: watch('genre'),
              register: register('genre'),
              error: errors.genre?.message!,
            }}
          />
          <TextAreaWrap
            theme={theme}
            data={{
              min: 120,
              max: 700,
              id: 'description',
              label: 'Description',
              text: watch('description'),
              register: register('description'),
              error: errors.description?.message,
            }}
          />
        </Flex>
        <Flex className="host-text-wrap">
          <Host>
            <Avatar
              theme={theme}
              size="3.3rem"
              data={{
                preview: null,
                host_id: original?.host_id,
                avatar: original?.host?.avatar!,
              }}
            />
            <span>@{original.host.userId}</span>
          </Host>
        </Flex>
        <Flex>
          <Setting className="setting">
            <label htmlFor="private-mode">
              <span>비공개 보드로 전환</span>
              <span>(On private mode)</span>
            </label>
            <input
              type="checkbox"
              id="private-mode"
              {...register('onPrivate')}
            />
          </Setting>
          <Btn type="submit" item={{ theme, name: 'Edit' }} />
        </Flex>
      </Form>
    </ModalCont>
  );
};

export const ModalCont = styled(Modal)`
  gap: 30px;
  height: 90vh;
  min-width: 480px;
  min-height: 500px;
  width: fit-content;
  justify-content: flex-start;
  padding-top: 50px;
  h1 {
    font-size: 2.5rem;
    //padding-bottom: 20px;
  }
  form {
    gap: 10px;
    height: 100%;
    //border: 10px solid blueviolet;
    button {
      padding: 8px 20px;
      width: fit-content;
    }
    .inputs-flex {
      //border: 2px solid yellow;
      gap: 20px;
      height: 100%;
      flex-direction: column;
      justify-content: flex-start;
      .input-wrap {
        gap: 20px;
      }
      textarea {
        max-height: 450px;
      }
    }
  }
  .host-text-wrap {
    margin-top: 15px;

    //border: 2px solid yellow;
    justify-content: flex-start;
  }
`;
const Host = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  align-items: center;
  span {
    opacity: 0.8;
    font-style: italic;
    margin-right: 10px;
    display: inline-block;
  }
`;
