import styled from '@emotion/styled';
import { Btn } from '../../Tools/Button';
import { useForm } from 'react-hook-form';
import { IBoardForm } from '../../types/board';
import { Box, Flex, Form } from '../../../styles/global';
import { BoxTitle } from '../../Tools/box_title';
import { InputWrap } from '../../Tools/Input';
import { TextAreaWrap } from '../../Tools/Input/TextArea';
import { SelectWrap } from '../../Tools/Input/Select';
import { Dispatch, SetStateAction } from 'react';
import { variants } from '../../../styles/variants';
import { useUser } from '../../libs/client/useUser';
import { useTextLimit } from '../../libs/client/useTools';

interface ICreateBox {
  _data: {
    open: boolean;
    theme: boolean;
    loading: boolean;
    layoutId: string;
    post: ({}) => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
}
export const CreateBox = ({ _data }: ICreateBox) => {
  const post = _data?.post!;
  const open = _data?.open!;
  const theme = _data?.theme!;
  const loading = _data?.loading!;
  const layoutId = _data?.layoutId!;
  const setLoading = _data?.setLoading!;
  //
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
        max: [50, 700],
        texts: [title, description!],
        types: ['title', 'description'],
      },
    });
    if (!ok) return;
    setLoading(true);
    return post({ title, description, genre, user_id: loggedInUser?.id });
  };
  return (
    <>
      {open && (
        <Cont
          exit="exit"
          className="box"
          initial="initial"
          animate="animate"
          custom={theme}
          layoutId={layoutId}
          variants={variants}
        >
          <BoxTitle
            theme={theme}
            type="create-board"
            max={{ board: { title: 50, desc: 700 } }}
          />
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
                min: 150,
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
      )}
    </>
  );
};
const Cont = styled(Box)`
  gap: 10px;
  min-height: 60vh;
  align-items: flex-start;
  .form {
    gap: 25px;
    .wrap {
      gap: 15px;
      align-items: flex-end;
      .select-wrap {
        width: fit-content;
      }
      button {
        width: fit-content;
        padding: 11px 30px;
      }
    }
    .textarea-wrap {
      textarea {
        font-size: 1.2rem;
        max-height: 50vh;
      }
    }
  }
`;
