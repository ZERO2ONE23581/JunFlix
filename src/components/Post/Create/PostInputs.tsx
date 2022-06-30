import {
  FieldError,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormWatch,
} from 'react-hook-form';
import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';
import { Input } from '../../Style/Input';
import { Author } from '../../../../Author';
import { ErrorMsg } from '../../Style/ErrMsg';
import { IPostForm } from '../../../types/post';
import useUser from '../../../libs/client/useUser';
import { TextArea } from '../../Style/Input/TextArea';
import { Dispatch, SetStateAction, useState } from 'react';

interface IPostInputs {
  preview: string;
  register: UseFormRegister<IPostForm>;
  ERRORS_TITLE?: FieldError;
  ERRORS_CONTENT?: FieldError;
  watch: UseFormWatch<IPostForm>;
  setError: UseFormSetError<IPostForm>;
  clearErrors: UseFormClearErrors<IPostForm>;
  setSaveCreate: Dispatch<SetStateAction<boolean>>;
}
export const PostInputs = ({
  preview,
  register,
  ERRORS_TITLE,
  ERRORS_CONTENT,
  watch,
  setError,
  clearErrors,
  setSaveCreate,
}: IPostInputs) => {
  const { loggedInUser } = useUser();
  const REQ_TITLE = '포스트 제목을 입력해 주세요.';
  const [isFocus, setIsFocus] = useState(false);
  const [maxTitle] = useState(20);
  const [maxContent] = useState(700);
  const TitleLength = watch('title')?.replace(/(\s*)/g, '').length;
  const ContentLength = watch('content')?.replace(/(\s*)/g, '').length;

  const clickSave = () => {
    if (TitleLength! > maxTitle) {
      return setError('title', {
        message: `포스트 제목은 ${maxTitle}자 이내여야 합니다.`,
      });
    } else {
      clearErrors('title');
    }
    if (ContentLength! > maxContent) {
      return setError('content', {
        message: `포스트 내용은 ${maxContent}자 이내여야 합니다.`,
      });
    } else {
      clearErrors('content');
    }
    if (ERRORS_TITLE?.message || ERRORS_CONTENT?.message) return;
    setSaveCreate(true);
  };
  return (
    <>
      <Info isPreview={Boolean(preview)}>
        <Title>
          <label htmlFor="title" className="label-title">
            Title
          </label>
          <Input
            {...register('title', {
              required: REQ_TITLE,
            })}
            id="title"
            name="title"
            type="text"
            max={maxTitle}
            placeholder={REQ_TITLE}
          />
        </Title>
        {ERRORS_TITLE && <ErrorMsg error={ERRORS_TITLE.message} />}

        <Content isFocus={isFocus}>
          <Author
            CREATOR_AVATAR={loggedInUser?.avatar!}
            CREATOR_USERNAME={loggedInUser?.username!}
          />
          <label htmlFor="content" />
          <TextArea
            {...register('content', {
              validate: {
                MaxContent: (value) =>
                  Number(value?.replace(/(\s*)/g, '').length) < maxContent,
              },
            })}
            rows={9}
            id="content"
            name="content"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder="포스트의 내용을 적어주세요."
          />
        </Content>
        {ERRORS_CONTENT && <ErrorMsg error={ERRORS_CONTENT.message} />}
        <Btn
          type="button"
          name="SAVE"
          onClick={clickSave}
          CLASSNAME="create-post-btn"
        />
      </Info>
    </>
  );
};
const Info = styled.article<{ isPreview: boolean }>`
  width: 25vw;
  height: 60vh;
  gap: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  border-left: ${(p) => !p.isPreview && p.theme.border.thin};
  .error-msg {
    font-size: 1rem;
  }
  .create-post-btn {
    display: flex;
    align-items: center;
    justify-content: end;
  }
`;
const Title = styled.div`
  position: relative;
  width: 100%;
  label {
    display: block;
    position: absolute;
    top: -10px;
    left: 10px;
    font-size: 1rem;
    padding: 0 10px;
    background-color: ${(p) => p.theme.color.bg};
  }
  input {
    padding: 15px;
    border: ${(p) => p.theme.border.thin};
    ::placeholder {
      font-style: italic;
    }
  }
`;
const Content = styled.div<{ isFocus: boolean }>`
  width: 100%;
  position: relative;
  padding: 10px 20px;
  border-radius: 8px;
  border: ${(p) =>
    p.isFocus ? `2px solid ${p.theme.color.logo}` : p.theme.border.thin};
  .author {
    font-size: 1rem;
    margin-bottom: 10px;
  }
  textarea {
    width: 100%;
    border: none;
    outline: none;
    box-shadow: none;
    padding: 0;
    :focus {
      border: none;
      outline: none;
    }
  }
`;
