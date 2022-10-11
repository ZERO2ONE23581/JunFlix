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
import { modalVar } from '../../../styles/variants';
import { Flex, Modal } from '../../../styles/global';
import { UserAvatar } from '../../Tools/Avatar';
import { Dispatch, SetStateAction, useEffect } from 'react';
import {
  useCapLetters,
  useHeight,
  useLength,
} from '../../libs/client/useTools';
import { TextLength } from '../../Tools/TextLength';

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
      if (ogData.isPrivate) setValue('isPrivate', ogData.isPrivate);
      if (ogData.title) setValue('title', useCapLetters(ogData.title));
      if (ogData.description) setValue('description', ogData.description);
    }
  }, [ogData, setValue]);

  //input
  const Desc = useLength(watch('description'));
  const maxLength = (length: number) => length;
  const { height } = useHeight(watch('description')!);
  const onValid = async ({ title, genre, isPrivate, description }: IForm) => {
    const Title = useLength(watch('title'));
    if (Title! > maxLength(50))
      return setError('title', {
        message: `제목은 ${maxLength(50)}을 초과할 수 없습니다.`,
      });
    if (Desc! > maxLength(700))
      return setError('description', {
        message: `보드 소개글은 ${maxLength(700)}을 초과할 수 없습니다.`,
      });
    setLoading(true);
    if (loading) return;
    return post({
      title,
      genre,
      description,
      isPrivate,
      user_id: loggedInUser?.id,
    });
  };
  //
  return (
    <ModalCont
      exit="exit"
      initial="initial"
      animate="animate"
      custom={theme}
      variants={modalVar}
      className={'board-modal'}
    >
      <Svg type="close" size="2rem" theme={theme} onClick={closeModal} />
      <h1>Edit your Board</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <Flex className="flex-col">
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
            height={height}
            id="description"
            register={register('description')}
            error={errors.description?.message}
            watch={Boolean(watch('description'))}
          />
          <TextLength
            theme={theme}
            text={watch('description')!}
            num={{ text: Desc!, max: maxLength(700) }}
          />
          <Host>
            <UserAvatar
              theme={theme}
              info={{ size: '3.3em', avatar: ogData.user.avatar }}
              onClick={() =>
                router.push(
                  `/user/${ogData.UserID}/${ogData.user.username}/dash`
                )
              }
            />
            <span>@{ogData.user.userId}</span>
          </Host>
          <Setting className="setting">
            <label htmlFor="private-mode">
              <span>비공개 보드로 전환</span>
              <span>(On private mode)</span>
            </label>
            <input
              type="checkbox"
              id="private-mode"
              {...register('isPrivate')}
            />
          </Setting>
        </Flex>
        <Btn type="submit" name="Done" theme={theme} />
      </form>
    </ModalCont>
  );
};

export const ModalCont = styled(Modal)`
  gap: 35px;
  width: 30vw;
  min-height: 80vh;
  justify-content: flex-start;
  h1 {
    font-size: 2.5rem;
  }
  form {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    font-size: 1.1em;
    .flex-col {
      gap: 20px;
      flex-direction: column;
      select {
        padding: 5px;
      }
      .textarea-wrap {
        gap: 20px;
        textarea {
          min-height: 20vh;
          max-height: 40vh;
          font-size: 1.1rem;
        }
      }
    }
    button {
      padding: 8px 20px;
      margin-top: 20px;
    }
  }
  .text-length {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    span {
      margin-right: 5px;
    }
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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
