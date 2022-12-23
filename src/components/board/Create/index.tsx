import { Title } from './Title';
import { Inputs } from './Inputs';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { IRes } from '../../../types/global';
import { IBoardForm } from '../../../types/board';
import { Box, Form } from '../../../../styles/global';
import { variants } from '../../../../styles/variants';
import { useUser } from '../../../libs/client/useUser';
import { useLength } from '../../../libs/client/useTools';
import useMutation from '../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { TextAreaWrap } from '../../../Tools/Input/TextArea';

interface ICreateBox {
  _data: {
    theme: boolean;
    layoutId: string;
    Loading: boolean;
    setMsg: Dispatch<SetStateAction<string>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
}
export const BoardBox = ({ _data }: ICreateBox) => {
  const router = useRouter();
  const { user_id } = useUser();
  const { Loading, layoutId, theme, setMsg, setLoading } = _data;
  const [POST, { loading, data }] = useMutation<IRes>(`/api/board/create`);
  const {
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onSubmit' });

  const error = errors.title?.message!;
  const onValid = async ({ title, genre, description }: IBoardForm) => {
    if (loading) return;
    const title_len = useLength(title);
    const desc_len = useLength(description!);
    if (title_len >= 30)
      return setError('title', { message: 'max_board_title' });
    if (desc_len >= 700)
      return setError('description', { message: 'max_board_desc' });
    setLoading(true);
    return POST({ title, genre, user_id, posts: [], description });
  };
  console.log(data, '??');

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) return setMsg(data.error);
        if (data.ok)
          return router.replace(`/board/${data.board.id}/${data.board.title}`);
      }, 1000);
    }
  }, [data, router, setMsg, setTimeout, setLoading]);

  return (
    <>
      {!Loading && (
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          custom={theme}
          layoutId={layoutId}
          variants={variants}
        >
          <Title />
          <Form onSubmit={handleSubmit(onValid)}>
            <Inputs _data={{ error, theme, watch, register, clearErrors }} />
            <TextAreaWrap
              _data={{
                theme,
                min: 150,
                max: 700,
                clearErrors,
                id: 'description',
                label: 'Description',
                text: watch('description'),
                placeholder: 'Fill this blank...',
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
  max-width: fit-content;
  form {
    gap: 2rem;
    .textarea-wrap {
      textarea {
        font-size: 1.2rem;
        max-height: 50vh;
      }
    }
  }
`;
