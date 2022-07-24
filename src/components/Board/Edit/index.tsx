import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';
import { Input } from '../../Style/Input';
import { useForm } from 'react-hook-form';
import { ErrorMsg } from '../../Style/ErrMsg';
import { TextArea, TextAreaWrap } from '../../Style/Input/TextArea';
import { MutationRes } from '../../../types/mutation';
import { SelectWrap } from '../../Style/Input/SelectWrap';
import { IBoard, IBoardForm } from '../../../types/board';
import useMutation from '../../../libs/client/useMutation';
import { DimBackground } from '../../../../styles/global';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Length } from '../../Tools';
import { LoadingModal } from '../../LoadingModal';

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
      if (board.title) setValue('title', board.title);
      if (board.genre) setValue('genre', board.genre);
      if (board.intro) setValue('intro', board.intro);
    }
  }, [board, setValue]);
  const [EditBoard, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${board?.UserID}/board/${board?.id}/edit`
  );
  const [maxTitle] = useState(30);
  const [maxContent] = useState(300);
  const [height, setHeight] = useState(40);

  useEffect(() => {
    const intro = watch!('intro');
    setHeight(intro?.length!);
  }, [setHeight, watch!('intro')]);

  const onValid = async ({ title, genre, intro }: IBoardForm) => {
    if (loading) return;
    if (Length(watch!('title'))! === 0)
      return setError!('title', { message: '제목을 입력해주세요.' });
    if (Length(watch!('title'))! > maxTitle)
      return setError!('title', {
        message: `포스트 제목의 길이는 ${maxTitle}자 이하입니다.`,
      });
    if (Length(watch!('intro'))! > maxContent)
      return setError!('intro', {
        message: `포스트 길이는 ${maxContent}자 이하입니다.`,
      });
    return EditBoard({ title, genre, intro });
  };
  useEffect(() => {
    if (data?.ok) {
      alert(`보드를 수정했습니다.`);
      setEdit(false);
    }
  }, [data, setEdit]);

  return (
    <>
      {!loading && (
        <form onSubmit={handleSubmit(onValid)}>
          <Cont>
            <Flex>
              <Title>
                <Input type="text" {...register('title')} />
              </Title>
              <SelectWrap
                id="genre"
                watch={watch('genre')}
                register={register('genre')}
              />
            </Flex>
            <TextAreaWrap
              id="intro"
              height={height}
              register={register!('intro')}
              placeholder="포스트의 내용을 적어주세요."
            />
            <Btn type="submit" name="SAVE" />
          </Cont>
        </form>
      )}
      {loading && (
        <LoadingModal
          zIndex={100}
          text={{ kor: '보드 업데이트중...', eng: 'Updating Board...' }}
        />
      )}
      {data?.error && <ErrorMsg error={data?.error} />}
      {errors.title && <ErrorMsg error={errors.title.message} />}
      {errors.intro && <ErrorMsg error={errors.intro.message} />}
    </>
  );
};
const Cont = styled.article`
  gap: 15px;
  z-index: 3;
  display: flex;
  max-width: 500px;
  flex-direction: column;
  .intro {
    textarea {
      border: none;
      font-size: 1.2rem;
      min-height: 100px;
      max-height: 300px;
      :focus {
        outline: none;
      }
    }
  }
`;
const Flex = styled.div`
  gap: 1rem;
  display: flex;
  align-items: center;
  input,
  .select-wrap {
    border: 1px dashed ${(p) => p.theme.color.logo};
  }
  .select-wrap {
    select {
      padding: 0px;
      height: 44px;
    }
  }
`;
const Title = styled.h1`
  input {
    max-width: 250px;
    font-size: 1.7rem;
    padding: 5px 10px;
  }
`;
