import styled from '@emotion/styled';
import { Btn } from '../../Tools/Button';
import { InputWrap } from '../../Tools/Input';
import { useForm } from 'react-hook-form';
import { IData } from '../../../types/global';
import { LoadingModal } from '../../Tools/Modal/Loading';
import { IBoardForm } from '../../../types/board';
import { TextAreaWrap } from '../../Tools/Input/TextArea';
import { SelectWrap } from '../../Tools/Input/Select';
import useMutation from '../../../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Errors } from '../../Tools/Errors';
import { useCapLetters, useLength } from '../../../libs/client/useTools';
import { useRouter } from 'next/router';

interface IEditInfo {
  title: string;
  genre: string;
  intro: string;
  setEdit: Dispatch<SetStateAction<boolean>>;
}
export const EditInfo = ({ title, genre, intro, setEdit }: IEditInfo) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const {
    watch,
    setValue,
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBoardForm>({ mode: 'onSubmit' });

  useEffect(() => {
    if (title) setValue('title', useCapLetters(title));
    if (genre) setValue('genre', genre);
    if (intro) setValue('intro', intro);
  }, [title, genre, intro, setValue]);
  const [EditBoard, { data, loading }] = useMutation<IData>(
    `/api/user/${user_id}/board/${board_id}/edit`
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
    if (useLength(watch!('title'))! === 0)
      return setError!('title', { message: '제목을 입력해주세요.' });
    if (useLength(watch!('title'))! > maxTitle)
      return setError!('title', {
        message: `포스트 제목의 길이는 ${maxTitle}자 이하입니다.`,
      });
    if (useLength(watch!('intro'))! > maxIntro)
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
              <InputWrap
                isAlt
                id="title"
                type="text"
                register={register('title')}
              />
              <SelectWrap
                id="genre"
                watch={watch('genre')}
                register={register('genre')}
              />
              <Btn type="submit" name="SAVE" />
            </Flex>
            <TextAreaWrap
              id="intro"
              height={height}
              register={register!('intro')}
              placeholder="포스트의 내용을 적어주세요."
            />
          </Cont>
          <Errors errors={errors} />
        </form>
      )}
      {loading && <LoadingModal zIndex={100} type="update-board" />}
    </>
  );
};
const Cont = styled.article`
  gap: 15px;
  z-index: 3;
  display: flex;
  width: 800px;
  min-width: 800px;
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
  .title {
    width: 400px;
    input {
      font-size: 2.2rem;
    }
  }
  button {
    width: 20%;
  }
`;
