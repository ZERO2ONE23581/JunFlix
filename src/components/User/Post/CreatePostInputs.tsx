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
  maxTitle?: number;
  ErrCnt?: string;
  ErrTitle?: string;
  watch: UseFormWatch<IPostForm>;
  getValues: UseFormGetValues<IPostForm>;
  register: UseFormRegister<IPostForm>;
}
export const PostInputs = ({
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
        id="title"
        type="text"
        label="Post Title"
        max={maxTitle}
        watch={watch('title')}
        isValue={Boolean(getValues('title'))}
        inputErrMsg={ErrTitle}
        register={register('title', {
          required: '게시물 제목을 입력해주세요.',
          maxLength: {
            value: maxTitle!,
            message: '게시물 제목은 20자 이내여야 합니다.',
          },
        })}
      />
      <TextAreaWrap
        id="content"
        type="text"
        label="Content"
        max={maxCnt}
        watch={watch('content')}
        placeholder="포스트 내용을 입력해주세요."
        inputErrMsg={ErrCnt}
        register={register('content', {
          maxLength: {
            value: maxCnt!,
            message: '게시물 내용은 1000자 이내여야 합니다.',
          },
        })}
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
