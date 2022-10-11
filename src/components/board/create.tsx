import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { IBoardForm } from '../../types/board';
import { Btn } from '../../Tools/Button';
import useUser from '../../libs/client/useUser';
import { TextLength } from '../../Tools/TextLength';
import { TextAreaWrap } from '../../Tools/Input/TextArea';
import { useLength } from '../../libs/client/useTools';
import { Box } from '../../../styles/global';
import { ITheme } from '../../../styles/theme';
import { BoxTitle } from '../../Tools/Title';
import { InputWrap } from '../../Tools/Input';
import { SelectWrap } from '../../Tools/Input/Select';
import { joinBoxVar } from '../../../styles/variants';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ICreateBoard extends ITheme {
  loading: boolean;
  post: ({}) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const CreateBoard = ({
  theme,
  post,
  loading,
  setLoading,
}: ICreateBoard) => {
  const { loggedInUser } = useUser();
  const {
    watch,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onBlur' });
  //
  const [maxTitle] = useState(30);
  const [maxDesc] = useState(700);
  const [height, setHeight] = useState('40vh');
  const textLength = useLength(watch!('description'));
  const isOver = Boolean(textLength && textLength > maxDesc);
  useEffect(() => {
    const description = watch!('description');
    setHeight(`${description?.length! * 0.2}px`);
  }, [setHeight, watch!('description')]);
  //
  const onValid = async ({ title, genre, description }: IBoardForm) => {
    if (!loggedInUser) return alert('must login.');
    if (loading) return;
    if (useLength(watch!('title'))! > maxTitle)
      return setError!('title', {
        message: `제목의 길이는 ${maxTitle}자 이하입니다.`,
      });
    if (isOver)
      return setError!('description', {
        message: `길이는 ${maxDesc}자 이하입니다.`,
      });
    setLoading(true);
    post({ title, description, genre, user_id: loggedInUser.id });
  };
  //
  return (
    <Cont
      exit="exit"
      initial="initial"
      animate="animate"
      custom={theme}
      variants={joinBoxVar}
      className="create-box"
    >
      <BoxTitle
        theme={theme}
        type="create-board"
        boardMax={{ title: maxTitle, intro: maxDesc }}
      />
      <Form onSubmit={handleSubmit(onValid)} className="create-board-form">
        <div className="right-flex">
          <SelectWrap
            id="genre"
            theme={theme}
            error={errors.genre?.message}
            register={register('genre')}
            watch={Boolean(watch('genre'))}
          />
        </div>
        <InputWrap
          id="title"
          type="text"
          label="Title"
          theme={theme}
          error={errors.title?.message}
          watch={Boolean(watch('title'))}
          register={register('title', {
            required: '보드의 제목을 입력하세요.',
          })}
        />
        <TextAreaWrap
          id="description"
          theme={theme}
          height={height}
          error={errors.description?.message}
          register={register('description')}
          watch={Boolean(watch('description'))}
          placeholder="이 보드의 소개글을 작성해주세요."
        />
        <TextLength
          theme={theme}
          text={watch('description')!}
          num={{ text: textLength!, max: maxDesc }}
        />
        <Btn name="Save" type="submit" theme={theme} />
      </Form>
    </Cont>
  );
};
const Cont = styled(Box)`
  gap: 20px;
  .box-title {
    width: 500px;
    min-width: 500px;
    h1 {
      font-size: 2.4rem;
    }
  }
  .create-board-form {
    gap: 20px;
    height: fit-content;
    align-items: flex-end;
    justify-content: flex-end;
  }
`;
const Form = styled(motion.form)`
  .right-flex {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    .select-wrap {
      padding: 5px;
      width: fit-content;
    }
  }
  .input-wrap,
  .textarea-wrap {
    gap: 20px;
  }
  .textarea-wrap {
    max-height: 300px;
    textarea {
      font-size: 1.3rem;
    }
  }
  button {
    font-size: 1.3rem;
    padding: 10px 40px;
  }
  .create-board-bg {
    top: 1.3em;
    right: 1.3em;
    position: absolute;
  }
`;
