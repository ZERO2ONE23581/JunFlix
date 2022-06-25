import { Host } from './Host';
import { useState } from 'react';
import styled from '@emotion/styled';
import { InputWrap } from '../../../Style/Input';
import { IPostForm } from '../../../../types/post';
import { IBoardWithAttrs } from '../../../../types/board';
import { TextAreaWrap } from '../../../Style/Input/TextArea';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

interface IPostContentProps {
  disabled: boolean;
  board?: IBoardWithAttrs;
  watch: UseFormWatch<IPostForm>;
  register: UseFormRegister<IPostForm>;

  getValues: UseFormWatch<IPostForm>;
}
export const PostContent = ({
  disabled,
  board,
  watch,
  register,
  getValues,
}: IPostContentProps) => {
  const [maxCnt] = useState(700);
  const [maxTitle] = useState(20);
  return (
    <Cont>
      <InputWrap
        id="title"
        type="text"
        max={maxTitle}
        label="Post Title"
        disabled={disabled}
        watch={watch('title')}
        register={register('title', {
          required: '게시물 제목을 입력해주세요.',
          maxLength: {
            value: maxTitle,
            message: '게시물 제목은 20자 이내여야 합니다.',
          },
        })}
        isValue={getValues && Boolean(getValues('title'))}
      />
      <article className="content-wrap">
        <Host board={board} />
        <TextAreaWrap
          id="content"
          max={maxCnt}
          label="Content"
          disabled={disabled}
          watch={watch('content')}
          placeholder="게시물의 글을 입력해주세요."
          register={register('content', {
            maxLength: {
              value: maxCnt,
              message: '게시물 내용은 1000자 이내여야 합니다.',
            },
          })}
        />
      </article>
    </Cont>
  );
};
const Cont = styled.article`
  padding: 10px 15px;
  width: 25vw;
  height: 100%;
  gap: 25px;
  display: flex;
  flex-direction: column;
  input,
  textarea {
    width: 100%;
    border-radius: 2px;
  }
  input {
    padding: 13px 20px;
  }
  .content-wrap {
    textarea {
      height: 250px;
    }
  }
`;
const Content = styled.article``;
