import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { ICreateCommentsForm } from '../../../types/comments';
import { TextArea } from '../../Style/Input/TextArea';

interface IPostTextArea {
  register: UseFormRegister<ICreateCommentsForm>;
}
export const PostTextArea = ({ register }: IPostTextArea) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState<String>();
  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [value]);
  return (
    <Cont>
      <TextArea
        {...register('content', { required: '댓글을 입력해주세요.' })}
        ref={textareaRef}
        onChange={textAreaChange}
        id="content"
        name="content"
        placeholder="댓글 달기..."
      >
        {value}
      </TextArea>
    </Cont>
  );
};
const Cont = styled.div`
  width: 100%;
  textarea {
    min-height: 20px;
    max-height: 100px;
    padding: 10px;
    :focus {
    }
  }
`;
