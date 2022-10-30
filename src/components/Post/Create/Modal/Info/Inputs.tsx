import {
  UseFormWatch,
  UseFormRegister,
  UseFormClearErrors,
} from 'react-hook-form';
import { InputWrap } from '../../../../../Tools/Input';
import { useCapLetter } from '../../../../../libs/client/useTools';
import { TextAreaWrap } from '../../../../../Tools/Input/TextArea';
import { IPostForm, IPostFormErr } from '../../../../../types/post';

interface IPostInputs {
  theme: boolean;
  _useform: {
    errors: IPostFormErr;
    watch: UseFormWatch<IPostForm>;
    register: UseFormRegister<IPostForm>;
    clearErrors: UseFormClearErrors<IPostForm>;
  };
}
export const PostInputs = ({ _useform, theme }: IPostInputs) => {
  const watch = _useform?.watch!;
  const errors = _useform?.errors!;
  const register = _useform?.register!;
  const clearErrors = _useform?.clearErrors!;
  const __data = (id: string | any, required: string | undefined) => ({
    id,
    theme,
    min: 100,
    max: 1000,
    type: 'text',
    text: watch!(id),
    label: useCapLetter(id),
    clearErrors: clearErrors!,
    register: register(id, { required }),
  });
  const __title = {
    ...__data('title', '제목을 입력하세요'),
    error: errors.title?.message!,
  };
  const __desc = {
    ...__data('description', undefined),
    error: errors.description?.message,
  };
  const __hash = {
    ...__data('hashtags', undefined),
    error: errors.hashtags?.message!,
  };
  const __link = {
    ...__data('pageLink', undefined),
    error: errors.pageLink?.message!,
  };
  return (
    <>
      <InputWrap _data={{ ...__title }} />
      <TextAreaWrap _data={{ ...__desc }} />
      <InputWrap _data={{ ...__hash }} />
      <InputWrap _data={{ ...__link }} />
    </>
  );
};
