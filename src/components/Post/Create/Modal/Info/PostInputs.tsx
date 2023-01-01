import { InputWrap } from '../../../../../Tools/Input';
import { IPostUseform } from '../../../../../types/post';
import { UseCapLetter } from '../../../../../libs/client/useTools';
import { TextAreaWrap } from '../../../../../Tools/Input/TextArea';

interface IPostInputs extends IPostUseform {
  theme: boolean;
}
export const PostInputs = ({ _useform, theme }: IPostInputs) => {
  const { watch, errors, register, clearErrors } = _useform;
  const __data = (id: string | any, required: string | undefined) => ({
    id,
    theme,
    min: 100,
    max: 1000,
    type: 'text',
    text: watch!(id),
    label: UseCapLetter(id),
    clearErrors: clearErrors!,
    register: register!(id, { required }),
  });
  const __title = {
    ...__data('title', 'need_title'),
    error: errors?.title?.message!,
  };
  const __desc = {
    ...__data('description', undefined),
    error: errors?.description?.message,
  };
  const __hash = {
    ...__data('hashtags', undefined),
    error: errors?.hashtags?.message!,
  };
  const __link = {
    ...__data('pageLink', undefined),
    error: errors?.pageLink?.message!,
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
