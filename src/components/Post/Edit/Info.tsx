import { Layer } from './Layer';
import styled from '@emotion/styled';
import { ComputeLength } from '../../Tools';
import { ErrorMsg } from '../../Style/ErrMsg';
import { IUseform } from '../../../types/global';
import useUser from '../../../libs/client/useUser';
import { TitleInput } from '../../Style/Input/Title';
import { IconBtn } from '../../Style/Button/IconBtn';
import { TextAreaWrap } from '../../Style/Input/TextArea';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IInfo extends IUseform {
  title: string;
  content: string;
  postAvatar: string;
  DataError: string;
  TitleError: string;
  ContentError: string;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  setEditPost: Dispatch<SetStateAction<boolean>>;
}
export const Info = ({
  title,
  content,
  setUpdate,
  setEditPost,
  DataError,
  TitleError,
  ContentError,
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
    if (ComputeLength({ watch: watch, type: 'title' }) === 0)
      return setError!('title', { message: '제목을 입력해주세요.' });
    if (ComputeLength({ watch: watch, type: 'title' }) > maxTitle)
      return setError!('MaxTitle', {
        message: `포스트 제목의 길이는 ${maxTitle}자 이하입니다.`,
      });
    if (ComputeLength({ watch: watch, type: 'content' }) > maxContent)
      return setError!('content', {
        message: `포스트 길이는 ${maxContent}자 이하입니다.`,
      });
    setUpdate(true);
  };

  useEffect(() => {
    if (ComputeLength({ watch: watch, type: 'title' }) !== 0)
      clearErrors!('title');
    if (ComputeLength({ watch: watch, type: 'title' }) < maxTitle)
      clearErrors!('MaxTitle');
    if (ComputeLength({ watch: watch, type: 'content' }) < maxContent)
      clearErrors!('content');
  }, [ComputeLength, clearErrors, watch!('title'), watch!('content')]);

  return (
    <Cont className="edit-post-info">
      <Layer setEditPost={setEditPost} />
      <Main>
        <div className="flex">
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
        </div>
        <TextAreaWrap
          id="content"
          height={height}
          user={loggedInUser}
          register={register!('content')}
          placeholder="포스트의 내용을 적어주세요."
        />
      </Main>
      <>
        {DataError && <ErrorMsg error={DataError} />}
        {TitleError && <ErrorMsg error={TitleError} />}
        {ContentError && <ErrorMsg error={ContentError} />}
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
  .flex {
    margin-bottom: 20px;
    gap: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      input {
        font-size: 2rem;
        ::placeholder {
          font-size: 1.3rem;
        }
      }
    }
  }
  .content {
    min-height: 350px;
    max-height: 420px;
    border-radius: 5px;
    textarea {
      outline: none;
      font-size: 1.1rem;
      min-height: 100px;
    }
  }
`;
