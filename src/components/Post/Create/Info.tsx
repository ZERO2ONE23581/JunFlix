import styled from '@emotion/styled';
import { Btn } from '../../../Tools/Button';
import { InputWrap } from '../../../Tools/Input';
import { IUseform } from '../../../types/global';
import useUser from '../../../libs/client/useUser';
import { TextAreaWrap } from '../../../Tools/Input/TextArea';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLength } from '../../../libs/client/useTools';

interface IInfo extends IUseform {
  setSave: Dispatch<SetStateAction<boolean>>;
}
export const Info = ({
  watch,
  setSave,
  register,
  setError,
  clearErrors,
}: IInfo) => {
  const [maxTitle] = useState(30);
  const { loggedInUser } = useUser();
  const [maxContent] = useState(1500);
  const [height, setHeight] = useState(40);

  useEffect(() => {
    const content = watch!('content');
    setHeight(content?.length!);
  }, [setHeight, watch!('content')]);
  const TitleLen = useLength(watch!('title'))!;
  const ContentLen = useLength(watch!('content'))!;

  useEffect(() => {
    if (TitleLen !== 0 && TitleLen < maxTitle) clearErrors!('title');
    if (ContentLen <= maxContent) clearErrors!('content');
  }, [TitleLen, ContentLen, clearErrors]);

  const clickSave = () => {
    if (!TitleLen)
      return setError!('title', { message: '제목을 입력해주세요.' });
    if (TitleLen > maxTitle)
      return setError!('MaxTitle', {
        message: `포스트 제목의 길이는 ${maxTitle}자 이하입니다.`,
      });
    if (ContentLen > maxContent)
      return setError!('content', {
        message: `포스트 길이는 ${maxContent}자 이하입니다.`,
      });
    setSave(true);
  };

  return (
    <Cont className="create-post-info">
      <div className="flex">
        <InputWrap
          isAlt
          id="title"
          type="text"
          watch={watch!('title')}
          register={register!('title')}
          placeholder="포스트 제목을 입력해 주세요."
        />
        <Btn
          type="button"
          onClick={clickSave}
          isBoolean={{ theme }}
          isString={{ btnName: 'Delete' }}
        />
      </div>
      <TextAreaWrap
        theme={theme}
        id="content"
        startHeight={200}
        register={register!('content')}
        placeholder="포스트의 내용을 적어주세요."
      />
    </Cont>
  );
};
const Cont = styled.article`
  overflow-y: auto;
  padding: 10px 20px;
  .flex {
    gap: 20px;
    display: flex;
    padding: 0 10px;
    margin: 5px 0 20px;
    align-items: center;
    justify-content: space-between;
    button {
      width: 100px;
      height: 38px;
      font-weight: 00;
    }
  }
  .content {
    min-height: 330px;
    max-height: 420px;
    border-radius: 5px;
    textarea {
      outline: none;
      font-size: 1.1rem;
      min-height: 100px;
    }
  }
`;
