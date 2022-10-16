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
import { Flex, Form, Modal } from '../../../styles/global';
import { Dispatch, SetStateAction, useEffect } from 'react';
import {
  isOverMax,
  useCapLetters,
  useLength,
  useMaxLength,
} from '../../libs/client/useTools';
import { variants } from '../../../styles/variants';
import { Avatar } from '../../Tools/Avatar';

export interface ITypeModal extends ITheme {
  ogData: IBoardType;
  loading: boolean;
  post: ({}) => void;
  closeModal: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export const UpdateBoard = ({
  post,
  theme,
  ogData,
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
    if (ogData) {
      if (ogData.genre) setValue('genre', ogData.genre);
      if (ogData.onPrivate) setValue('onPrivate', ogData.onPrivate);
      if (ogData.title) setValue('title', useCapLetters(ogData.title));
      if (ogData.description) setValue('description', ogData.description);
    }
  }, [ogData, setValue]);

  const { max } = useMaxLength(40, 700);
  const IsOverMax = (text: string) => {
    const Max = Boolean(text === 'title') ? max.title : max.desc;
    const Type = Boolean(text === 'title') ? 'title' : 'description';
    return isOverMax(useLength(String(watch(Type))), Max);
  };
  const onValid = async ({ title, genre, onPrivate, description }: IForm) => {
    const user_id = loggedInUser?.id;
    if (IsOverMax('title'))
      return setError!('title', {
        message: `보드제목은 ${max.title}자 미만입니다.`,
      });
    if (IsOverMax('description'))
      return setError!('description', {
        message: `보드 소개글은 ${max.desc}자 미만입니다.`,
      });
    //
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
      <h1>Edit Movie Board</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <Flex className="inputs-flex">
          <InputWrap
            id="title"
            type="text"
            label="Title"
            theme={theme}
            error={errors.title?.message}
            watch={Boolean(watch('title'))}
            register={register('title', {
              required: '제목을 입력해주세요.',
            })}
          />
          <SelectWrap
            id="genre"
            theme={theme}
            register={register('genre')}
            error={errors.genre?.message}
            watch={Boolean(watch('genre'))}
          />
          <TextAreaWrap
            theme={theme}
            id="description"
            startHeight={250}
            watch={watch('description')}
            register={register('description')}
            error={errors.description?.message}
            length={{ max: max.desc, typed: watch('description')?.toString()! }}
          />
        </Flex>
        <Flex className="host-text-wrap">
          <Host>
            <Avatar
              item={{
                theme,
                size: '3.3em',
                preview: null,
                avatar: ogData.host.avatar,
              }}
              onClick={() =>
                router.push(
                  `/user/${ogData.host_id}/${ogData.host.username}/dash`
                )
              }
            />
            <span>@{ogData.host.userId}</span>
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
const Setting = styled.div`
  font-style: italic;
  width: 100%;
  gap: 12px;
  display: flex;
  align-items: center;
  label {
    gap: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  input {
    width: 1.4rem;
    height: 1.4rem;
  }
`;
