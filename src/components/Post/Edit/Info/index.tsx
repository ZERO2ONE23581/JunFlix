import { Layer } from './Layer';
import styled from '@emotion/styled';
import { ErrorMsg } from '../../../../Tools/Errors';
import { IUseform } from '../../../../types/global';
import useUser from '../../../../libs/client/useUser';
import { TextAreaWrap } from '../../../../Tools/Input/TextArea';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { InputWrap } from '../../../../Tools/Input';
import { Btn } from '../../../../Tools/Button';
import { useLength } from '../../../../libs/client/useTools';

interface IInfo extends IUseform {
  title: string;
  content: string;
  dataError: string;
  postAvatar: string;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setEdit: Dispatch<SetStateAction<{ update: boolean; delete: boolean }>>;
}
export const Info = ({
  title,
  errors,
  content,
  dataError,
  setUpdate,
  setEdit,
  watch,
  setValue,
  register,
  setError,
  clearErrors,
}: IInfo) => {
  const { loggedInUser } = useUser();
  const [maxTitle] = useState(30);
  const [maxContent] = useState(1600);
  const [height, setHeight] = useState(40);
  useEffect(() => {
    const content = watch!('content');
    setHeight(content?.length!);
  }, [setHeight, watch!('content')]);

  useEffect(() => {
    if (title && content) {
      if (title) setValue!('title', title.toUpperCase());
      if (content) setValue!('content', content);
    }
  }, [setValue, title, content]);

  const clickSave = () => {
    if (useLength(watch!('title'))! === 0)
      return setError!('title', { message: '제목을 입력해주세요.' });
    if (useLength(watch!('title'))! > maxTitle)
      return setError!('title', {
        message: `포스트 제목의 길이는 ${maxTitle}자 이하입니다.`,
      });
    if (useLength(watch!('content'))! > maxContent)
      return setError!('content', {
        message: `포스트 길이는 ${maxContent}자 이하입니다.`,
      });
    setUpdate(true);
  };

  useEffect(() => {
    if (useLength(watch!('title'))! !== 0) clearErrors!('title');
    if (useLength(watch!('title'))! < maxTitle) clearErrors!('MaxTitle');
    if (useLength(watch!('content'))! < maxContent) clearErrors!('content');
  }, [useLength, clearErrors, watch!('title'), watch!('content')]);

  return (
    <Cont className="edit-post-info">
      <Layer setEdit={setEdit} />
      <Main>
        <Flex>
          <InputWrap
            isAlt
            id="title"
            type="text"
            placeholder={'포스트 제목을 입력해 주세요.'}
            register={register!('title', {
              required: '포스트 제목을 입력해 주세요.',
            })}
          />
          <Btn
            isBoolean={{ theme }}
            isString={{ btnName: 'Edit' }}
            type="button"
            onClick={clickSave}
          />
        </Flex>
        <TextAreaWrap
          id="content"
          startHeight={200}
          register={register!('content')}
          placeholder="포스트의 내용을 적어주세요."
        />
      </Main>
      <>
        {dataError && <ErrorMsg error={dataError} />}
        {errors?.title && <ErrorMsg error={errors.title.message} />}
        {errors?.content && <ErrorMsg error={errors.content.message} />}
      </>
    </Cont>
  );
};
const Cont = styled.article`
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Main = styled.article`
  padding: 20px 25px;
  .content {
    min-height: 350px;
    max-height: 400px;
    border-radius: 5px;
    textarea {
      outline: none;
      font-size: 1.1rem;
      min-height: 100px;
    }
  }
`;
const Flex = styled.div`
  gap: 20px;
  display: flex;
  padding: 0 10px;
  margin: 5px 0 13px;
  align-items: center;
  justify-content: space-between;
  button {
    width: 100px;
    height: 38px;
    font-weight: 00;
  }
`;
