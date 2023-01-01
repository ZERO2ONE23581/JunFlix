import { BoardInputs } from './BoardInputs';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { IRes } from '../types/global';
import { IBoardForm } from '../types/board';
import { Box, FlexCol, Form } from '../../styles/global';
import { useUser } from '../libs/client/useUser';
import { UseLength, useResponsive } from '../libs/client/useTools';
import useMutation from '../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { TextAreaWrap } from '../Tools/Input/TextArea';
import { postVar } from '../../styles/post';

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
    const title_len = UseLength(title);
    const desc_len = UseLength(description!);
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

  const { isDesk } = useResponsive();
  return (
    <Cont isDesk={isDesk}>
      {!Loading && (
        <Box
          exit="exit"
          className="box"
          animate="animate"
          initial="initial"
          variants={postVar}
          layoutId={layoutId}
          custom={{ theme, isDesk }}
        >
          <H1>Create Board</H1>
          <Txt>
            <span className="kor">
              * 좋아하는 영화를 위한 보드를 생성해 주세요.
            </span>
            <span>* Create board for your favorite movies.</span>
            <span className="kor">
              * 보드 생성 뒤 포스트를 생성 및 업로드 할 수 있습니다.
            </span>
            <span>* You can create and upload posts after creating board.</span>
          </Txt>
          <Form onSubmit={handleSubmit(onValid)}>
            <BoardInputs
              _data={{ error, theme, watch, register, clearErrors }}
            />
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
        </Box>
      )}
    </Cont>
  );
};
const Cont = styled.article<{ isDesk: boolean }>`
  display: flex;
  margin: 0rem auto;
  margin-top: 2rem;
  justify-content: center;
  .box {
    max-width: fit-content;
    h1 {
      font-size: ${(p) => (p.isDesk ? '2rem' : '3.6rem')};
    }
    font-size: ${(p) => (p.isDesk ? '2rem' : '2.2rem')};
    .kor {
      font-size: ${(p) => (p.isDesk ? '2rem' : '2rem')};
    }
    form {
      gap: 2rem;
      .textarea-wrap {
        textarea {
        }
      }
    }
  }
`;
const H1 = styled.h1``;
const Txt = styled(FlexCol)`
  opacity: 0.8;
  font-style: italic;
  padding-top: 0.5rem;
  align-items: flex-start;
`;
