import {
  UseFormWatch,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';
import styled from '@emotion/styled';
import { InputWrap } from '../../Style/Input';
import { IPostForm } from '../../../types/post';
import { TextAreaWrap } from '../../Style/Input/TextArea';

interface ICreatePostInputsProps {
  maxCnt?: number;
  ErrCnt?: string;
  ErrTitle?: string;
  maxTitle?: number;
  disabled?: boolean;
  register?: UseFormRegister<IPostForm> | any;
  watch?: UseFormWatch<IPostForm> | any;
  getValues?: UseFormGetValues<IPostForm> | any;
}
export const PostInputs = ({
  disabled,
  maxCnt,
  maxTitle,
  ErrCnt,
  ErrTitle,
  watch,
  getValues,
  register,
}: ICreatePostInputsProps) => {
  return (
    <Cont>
      <InputWrap
        disabled={disabled}
        id="title"
        type="text"
        label="Post Title"
        max={maxTitle}
        watch={watch && watch('title')}
        isValue={getValues && Boolean(getValues('title'))}
        inputErrMsg={ErrTitle}
        register={
          register &&
          register('title', {
            required: '게시물 제목을 입력해주세요.',
            maxLength: {
              value: maxTitle!,
              message: '게시물 제목은 20자 이내여야 합니다.',
            },
          })
        }
      />
      <TextAreaWrap
        disabled={disabled}
        id="content"
        type="text"
        label="Content"
        max={maxCnt}
        watch={watch && watch('content')}
        placeholder="포스트 내용을 입력해주세요."
        inputErrMsg={ErrCnt}
        register={
          register &&
          register('content', {
            maxLength: {
              value: maxCnt!,
              message: '게시물 내용은 1000자 이내여야 합니다.',
            },
          })
        }
      />
    </Cont>
  );
};
const Cont = styled.article`
  gap: 30px;
  display: flex;
  flex-direction: column;
  input {
    font-size: 1.1rem;
    padding: 11px 12px;
  }
`;
