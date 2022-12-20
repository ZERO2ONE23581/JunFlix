import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { IRes } from '../../src/types/global';
import { variants } from '../../styles/variants';
import { IBoardForm } from '../../src/types/board';
import { Head_ } from '../../src/Tools/Title/Head';
import { MsgModal } from '../../src/Tools/Modal/Message';
import { useUser } from '../../src/libs/client/useUser';
import { Box, FlexPage, Form } from '../../styles/global';
import { useLogin } from '../../src/libs/client/useLogin';
import { useLength } from '../../src/libs/client/useTools';
import useMutation from '../../src/libs/client/useMutation';
import { Wrap } from '../../src/components/Board/Create/Wrap';
import { TextAreaWrap } from '../../src/Tools/Input/TextArea';
import { Title } from '../../src/components/Board/Create/Title';
import { LoadingModal } from '../../src/Tools/Modal/Loading';

const CreateBoard: NextPage<{ theme: boolean }> = ({ theme }) => {
  useLogin();
  const router = useRouter();
  const layoutId = 'create-board';
  const { user_id } = useUser();
  const [msg, setMsg] = useState('');
  const [Loading, setLoading] = useState(false);
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
      <Head_ title="보드생성" />
      <FlexPage>
        <MsgModal _data={{ msg, theme, layoutId }} />
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
              <Wrap _data={{ error, theme, watch, register, clearErrors }} />
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
        {Loading && <LoadingModal theme={theme} />}
      </FlexPage>
    </>
  );
};
export default CreateBoard;

const Cont = styled(Box)`
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
