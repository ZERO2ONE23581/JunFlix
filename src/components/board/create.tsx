import styled from '@emotion/styled';
import { Btn } from '../../Tools/Button';
import { useForm } from 'react-hook-form';
import { IBoardForm } from '../../types/board';
import useUser from '../../libs/client/useUser';
import { TextLength } from '../../Tools/TextLength';
import { Box, Flex, Form } from '../../../styles/global';
import { ITheme } from '../../../styles/theme';
import { BoxTitle } from '../../Tools/box_title';
import { InputWrap } from '../../Tools/Input';
import { TextAreaWrap } from '../../Tools/Input/TextArea';
import { isOverMax, useLength, useMaxLength } from '../../libs/client/useTools';
import { SelectWrap } from '../../Tools/Input/Select';
import { joinBoxVar } from '../../../styles/variants';
import { Dispatch, SetStateAction, useState } from 'react';

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
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onBlur' });

  const { max } = useMaxLength(40, 700);
  const IsOverMax = (text: string) => {
    const Max = Boolean(text === 'title') ? max.title : max.desc;
    const Type = Boolean(text === 'title') ? 'title' : 'description';
    return isOverMax(useLength(String(watch(Type))), Max);
  };
  const onValid = async ({ title, genre, description }: IBoardForm) => {
    if (IsOverMax('title'))
      return setError!('title', {
        message: `보드제목은 ${max.title}자 미만입니다.`,
      });
    if (IsOverMax('description'))
      return setError!('description', {
        message: `보드 소개글은 ${max.desc}자 미만입니다.`,
      });
    setLoading(true);
    if (loading) return;
    post({ title, description, genre, user_id: loggedInUser?.id });
  };

  return (
    <Cont
      className="box"
      exit="exit"
      initial="initial"
      animate="animate"
      custom={theme}
      variants={joinBoxVar}
    >
      <BoxTitle
        theme={theme}
        type="create-board"
        max={{ board: { title: max.title, desc: max.desc } }}
      />
      <Form onSubmit={handleSubmit(onValid)} className="form">
        <Flex className="wrap">
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
          <SelectWrap
            id="genre"
            theme={theme}
            error={errors.genre?.message}
            register={register('genre')}
            watch={Boolean(watch('genre'))}
          />
          <Btn name="Save" type="submit" theme={theme} />
        </Flex>

        <TextAreaWrap
          id="description"
          theme={theme}
          register={register('description')}
          error={errors.description?.message}
          watch={watch('description')}
          placeholder="이 보드의 소개글을 작성해주세요."
        />
        <TextLength
          theme={theme}
          number={{
            max: max.desc,
            typed: useLength(String(watch('description'))),
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
