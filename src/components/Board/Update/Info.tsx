import { Length } from '../../Tools/Tools';
import styled from '@emotion/styled';
import { Btn } from '../../Tools/Button';
import { Input } from '../../Tools/Input';
import { useForm } from 'react-hook-form';
import { IQuery } from '../../../types/global';
import { LoadingModal } from '../../Tools/Modal/LoadingModal';
import { IBoardForm } from '../../../types/board';
import { Errors } from '../../Tools/Error';
import { MutationRes } from '../../../types/mutation';
import { DimBackground } from '../../../../styles/global';
import { TextAreaWrap } from '../../Tools/Input/TextArea';
import { SelectWrap } from '../../Tools/Input/SelectWrap';
import useMutation from '../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IEditInfo extends IQuery {
  edit: boolean;
  title: string;
  genre: string;
  intro: string;
  setEdit: Dispatch<SetStateAction<boolean>>;
}
export const EditInfo = ({
  edit,
  query,
  title,
  genre,
  intro,
  setEdit,
}: IEditInfo) => {
  const {
    watch,
    setValue,
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onSubmit' });

  useEffect(() => {
    if (title) setValue('title', title);
    if (genre) setValue('genre', genre);
    if (intro) setValue('intro', intro);
  }, [title, genre, intro, setValue]);
  const [EditBoard, { data, loading }] = useMutation<MutationRes>(
    `/api/user/${query.userId}/board/${query.boardId}/edit`
  );
  const [maxTitle] = useState(30);
  const [maxIntro] = useState(1000);
  const [height, setHeight] = useState(40);

  useEffect(() => {
    const intro = watch!('intro');
    setHeight(intro?.length! * 0.3);
  }, [setHeight, watch!('intro')]);

  const onValid = async ({ title, genre, intro }: IBoardForm) => {
    if (loading) return;
    if (Length(watch!('title'))! === 0)
      return setError!('title', { message: '제목을 입력해주세요.' });
    if (Length(watch!('title'))! > maxTitle)
      return setError!('title', {
        message: `포스트 제목의 길이는 ${maxTitle}자 이하입니다.`,
      });
    if (Length(watch!('intro'))! > maxIntro)
      return setError!('intro', {
        message: `포스트 길이는 ${maxIntro}자 이하입니다.`,
      });
    return EditBoard({ title, genre, intro });
  };
  useEffect(() => {
    if (data) {
      if (data.error) alert(data?.error);
      if (data.ok) {
        alert(`보드를 수정했습니다.`);
        setEdit(false);
      }
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
            <Errors errors={errors} />
          </Cont>
        </form>
      )}
      {loading && (
        <LoadingModal
          zIndex={100}
          text={{ kor: '보드 업데이트중...', eng: 'Updating Board...' }}
        />
      )}
    </>
  );
};
const Cont = styled.article`
  z-index: 3;
  gap: 15px;
  display: flex;
  min-width: 980px;
  max-width: 980px;
  flex-direction: column;
  .intro {
    textarea {
      border: none;
      font-size: 1.2rem;
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
