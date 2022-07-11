import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';
import { Input } from '../../Style/Input';
import { useForm } from 'react-hook-form';
import { ErrorMsg } from '../../Style/ErrMsg';
import { TextArea } from '../../Style/Input/TextArea';
import { MutationRes } from '../../../types/mutation';
import { SelectWrap } from '../../Style/Input/SelectWrap';
import { IBoard, IBoardForm } from '../../../types/board';
import useMutation from '../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IEditInfo extends IBoard {
  setEdit: Dispatch<SetStateAction<boolean>>;
}
export const EditInfo = ({ board, setEdit }: IEditInfo) => {
  const {
    watch,
    setValue,
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onSubmit' });
  useEffect(() => {
    if (board) {
      if (board.title) setValue('title', board.title.toUpperCase());
      if (board.genre) setValue('genre', board.genre);
      if (board.intro) setValue('intro', board.intro);
    }
  }, [board, setValue]);
  const [EditBoard, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${board?.UserID}/board/${board?.id}/edit`
  );
  const [MaxTitle] = useState(30);
  const [MaxIntro] = useState(200);
  const TitleLength = watch('title')?.toString().replace(/\s/gi, '')?.length;
  const IntroLength = watch('intro')?.toString().replace(/\s/gi, '')?.length;
  const onValid = async ({ title, genre, intro }: IBoardForm) => {
    if (loading) return;
    if (TitleLength > MaxTitle)
      return setError('title', {
        message: `제목의 길이는 ${MaxTitle}이하여야 합니다.`,
      });
    if (IntroLength > MaxIntro)
      return setError('intro', {
        message: `소개글의 길이는 ${MaxIntro}이하여야 합니다.`,
      });
    return EditBoard({ title, genre, intro });
  };
  useEffect(() => {
    if (data?.ok) {
      alert(`보드를 수정했습니다.`);
      setEdit(false);
    }
  }, [data, setEdit]);
  //
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Cont>
        <Title>
          <h1>
            <Input type="text" {...register('title')} />
          </h1>
          <SelectWrap
            id="genre"
            genre={watch('genre')}
            register={register('genre')}
          />
        </Title>
        <TextArea rows={5} {...register('intro')} />
        {errors.title && <ErrorMsg error={errors.title.message} />}
        {errors.intro && <ErrorMsg error={errors.intro.message} />}
        <Btn type="submit" name="SAVE" />
      </Cont>
    </form>
  );
};
const Cont = styled.article`
  max-width: 800px;
  gap: 15px;
  display: flex;
  flex-direction: column;
  input,
  textarea,
  .select-wrap {
    word-wrap: normal;
    border-radius: 3px;
    border: 1px solid ${(p) => p.theme.color.logo};
  }
  .select-wrap {
    padding: 0 10px;
  }
  textarea {
    font-size: 1.1rem;
    :focus {
      border: 2px solid ${(p) => p.theme.color.logo};
    }
  }
`;
const Title = styled.div`
  gap: 1rem;
  display: flex;
  align-items: center;
  h1 {
    input {
      font-size: 2rem;
      padding: 5px 10px;
    }
  }
  select {
    padding: 0px;
    height: 50px;
  }
`;
const Intro = styled.p<{ isIntro: boolean }>``;
