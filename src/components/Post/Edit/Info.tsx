import { Layer } from './Layer';
import styled from '@emotion/styled';
import { ErrorMsg } from '../../Style/ErrMsg';
import { IUseform } from '../../../types/global';
import useUser from '../../../libs/client/useUser';
import { TitleInput } from '../../Style/Input/Title';
import { IconBtn } from '../../Style/Button/IconBtn';
import { TextAreaWrap } from '../../Style/Input/TextArea';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Length } from '../../Tools';

interface IInfo extends IUseform {
  title: string;
  content: string;
  dataError: string;
  postAvatar: string;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
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
    if (Length(watch!('title'))! === 0)
      return setError!('title', { message: '제목을 입력해주세요.' });
    if (Length(watch!('title'))! > maxTitle)
      return setError!('title', {
        message: `포스트 제목의 길이는 ${maxTitle}자 이하입니다.`,
      });
    if (Length(watch!('content'))! > maxContent)
      return setError!('content', {
        message: `포스트 길이는 ${maxContent}자 이하입니다.`,
      });
    setUpdate(true);
  };

  useEffect(() => {
    if (Length(watch!('title'))! !== 0) clearErrors!('title');
    if (Length(watch!('title'))! < maxTitle) clearErrors!('MaxTitle');
    if (Length(watch!('content'))! < maxContent) clearErrors!('content');
  }, [Length, clearErrors, watch!('title'), watch!('content')]);

  return (
    <Cont className="edit-post-info">
      <Layer setEdit={setEdit} />
      <Main>
        <Flex>
          <TitleInput
            id="title"
            type="text"
            placeholder={'포스트 제목을 입력해 주세요.'}
            register={register!('title', {
              required: '포스트 제목을 입력해 주세요.',
            })}
          />
          <IconBtn
            size="2.6rem"
            type="button"
            svgType="save"
            onClick={clickSave}
          />
        </Flex>
        <TextAreaWrap
          id="content"
          height={height}
          user={loggedInUser}
          register={register!('content')}
          placeholder="포스트의 내용을 적어주세요."
        />
      </Main>
      <>
        {dataError && <ErrorMsg error={dataError} />}
        {errors.title && <ErrorMsg error={errors.title.message} />}
        {errors.content && <ErrorMsg error={errors.content.message} />}
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
  gap: 40px;
  display: flex;
  padding: 0 20px;
  margin-bottom: 20px;
  align-items: center;
  input {
    text-align: center;
    padding: 5px 0;
  }
`;
