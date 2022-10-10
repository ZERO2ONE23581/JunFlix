import styled from '@emotion/styled';
import { InputWrap } from '../Input';
import { IData } from '../../types/global';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { SelectWrap } from '../Input/Select';
import { ITheme } from '../../../styles/theme';
import useMutation from '../../libs/client/useMutation';
import { Flex, Modal, Overlay } from '../../../styles/global';
import { IBoardForm, IBoardType } from '../../types/board';
import { modalVar, overlayVar } from '../../../styles/variants';
import {
  useCapLetters,
  useHeight,
  useLength,
} from '../../libs/client/useTools';
import { TextAreaWrap } from '../Input/TextArea';
import { Btn } from '../Button';
import { ErrModal } from '../errorModal';
import { AnimatePresence } from 'framer-motion';
import { LoadingModal } from './Loading';
import { UserAvatar } from '../../components/Avatar';
import { useRouter } from 'next/router';
import useUser from '../../libs/client/useUser';

interface IModalBox extends ITheme {
  type: string;
  modal: boolean;
  ogData: IBoardType;
  onClick: () => void;
}
export const ModalBox = ({
  type,
  modal,
  theme,
  ogData,
  onClick,
}: IModalBox) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  //
  const {
    watch,
    setValue,
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onSubmit' });

  useEffect(() => {
    if (ogData) {
      if (type === 'board') {
        if (ogData.genre) setValue('genre', ogData.genre);
        if (ogData.isPrivate) setValue('isPrivate', ogData.isPrivate);
        if (ogData.title) setValue('title', useCapLetters(ogData.title));
        if (ogData.description) setValue('description', ogData.description);
      }
    }
  }, [type, ogData, setValue]);

  //post api
  const [api, setApi] = useState('');
  useEffect(() => {
    if (ogData) {
      if (type === 'board') setApi(`/api/board/${ogData.id}/update`);
    }
  }, [setApi, type, ogData]);
  const [Loading, setLoading] = useState(false);
  const [update, { data, loading }] = useMutation<IData>(api && api);
  //
  const maxLength = (length: number) => length;
  const Title = useLength(watch('title'));
  const Desc = useLength(watch('description'));
  const { height } = useHeight(watch('description')!);
  //
  const onValid = async ({
    title,
    genre,
    isPrivate,
    description,
  }: IBoardForm) => {
    if (Title! > maxLength(30))
      return setError('title', {
        message: `제목은 ${maxLength(30)}을 초과할 수 없습니다.`,
      });
    if (Desc! > maxLength(700))
      return setError('description', {
        message: `보드 소개글은 ${maxLength(700)}을 초과할 수 없습니다.`,
      });
    setLoading(true);
    if (loading) return;
    return update({
      title,
      genre,
      description,
      isPrivate,
      user_id: loggedInUser?.id,
    });
  };
  //
  const [dataErr, setDataErr] = useState('');
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) return setDataErr(data.error);
        if (data.ok) {
          setDataErr('업데이트 완료 (Update Completed)');
          setTimeout(() => {
            return router.reload();
          }, 2000);
        }
      }, 1000);
    }
  }, [data, setLoading, setTimeout, router, setDataErr]);
  //
  console.log(data);
  return (
    <AnimatePresence>
      {modal && (
        <>
          {!Loading && (
            <>
              <Modal_Box
                exit="exit"
                initial="initial"
                animate="animate"
                custom={theme}
                variants={modalVar}
                className={'edit-board-modal'}
              >
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
              </Modal_Box>
              <Overlay
                exit="exit"
                initial="initial"
                animate="animate"
                onClick={onClick}
                variants={overlayVar}
              />
              {!dataErr && (
                <ErrModal
                  theme={theme}
                  error={dataErr}
                  setDataErr={setDataErr}
                />
              )}
            </>
          )}
          {Loading && <LoadingModal theme={theme} />}
        </>
      )}
    </AnimatePresence>
  );
};

export const Modal_Box = styled(Modal)`
  width: 30vw;
  height: 80vh;
  gap: 35px;
  justify-content: flex-start;
  h1 {
    font-size: 3rem;
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
