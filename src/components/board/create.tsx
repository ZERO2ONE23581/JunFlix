import styled from '@emotion/styled';
import { Btn } from '../../Tools/Button';
import { useForm } from 'react-hook-form';
import { IBoardForm } from '../../types/board';

import { Box, Flex, Form } from '../../../styles/global';
import { ITheme } from '../../../styles/theme';
import { BoxTitle } from '../../Tools/box_title';
import { InputWrap } from '../../Tools/Input';
import { TextAreaWrap } from '../../Tools/Input/TextArea';

import { SelectWrap } from '../../Tools/Input/Select';
import { Dispatch, SetStateAction } from 'react';
import { variants } from '../../../styles/variants';
import { useUser } from '../../libs/client/useUser';
import { useTextLimit } from '../../libs/client/useTools';

interface ICreateBoardBox extends ITheme {
  loading: boolean;
  post: ({}) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const CreateBoardBox = ({
  theme,
  post,
  loading,
  setLoading,
}: ICreateBoardBox) => {
  const { loggedInUser } = useUser();
  const {
    watch,
    register,
    clearErrors,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onSubmit' });
  const onValid = async ({ title, genre, description }: IBoardForm) => {
    if (loading) return;
    const { ok } = useTextLimit({
      _data: {
        setError,
        max: [50, 1000],
        types: ['title', 'description'],
        texts: [title, description],
      },
    });
    if (!ok) return;
    setLoading(true);
    return post({ title, description, genre, user_id: loggedInUser?.id });
  };
  return (
    <Cont
      exit="exit"
      initial="initial"
      animate="animate"
      custom={theme}
      variants={variants}
      className="box"
    >
      <BoxTitle theme={theme} type="create-board" />
      <Form onSubmit={handleSubmit(onValid)} className="form">
        <Flex className="wrap">
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
          <SelectWrap
            _data={{
              theme,
              id: 'genre',
              text: watch('genre'),
              register: register('genre'),
              error: errors.genre?.message,
            }}
          />
          <Btn type="submit" item={{ theme, name: 'Save' }} />
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
      </Form>
    </Cont>
  );
};
const Cont = styled(Box)`
  gap: 20px;
  .form {
    gap: 20px;
    align-items: flex-start;
    .wrap {
      gap: 15px;
      align-items: flex-start;
      .input-wrap {
        gap: 20px;
      }
      select {
        width: min-content;
      }
    }
    .textarea-wrap {
      textarea {
        font-size: 1.2rem;
        max-height: 50vh;
      }
    }
    button {
      margin-top: 0;
      width: fit-content;
      padding: 8px 30px;
    }
  }
`;
