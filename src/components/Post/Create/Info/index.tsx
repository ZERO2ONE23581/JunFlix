import styled from '@emotion/styled';
import { Length } from '../../../Tools';
import { IUseform } from '../../../../types/global';
import useUser from '../../../../libs/client/useUser';
import { TitleInput } from '../../../Style/Input/Title';
import { IconBtn } from '../../../Style/Button/IconBtn';
import { TextAreaWrap } from '../../../Style/Input/TextArea';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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
  const TitleLen = Length(watch!('title'))!;
  const ContentLen = Length(watch!('content'))!;

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
      <Flex>
        <TitleInput
          id="title"
          type="text"
          watch={watch!('title')}
          register={register!('title')}
          placeholder="포스트 제목을 입력해 주세요."
        />
        <IconBtn
          size="2.4rem"
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
    </Cont>
  );
};
const Cont = styled.article`
  overflow-y: auto;
  padding: 10px 20px;
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
const Flex = styled.div`
  gap: 50px;
  display: flex;
  padding: 0 20px;
  align-items: center;
  margin-bottom: 20px;
  .save {
    margin-top: 5px;
  }
`;
