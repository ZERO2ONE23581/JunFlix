import {
  UseFormWatch,
  UseFormRegister,
  UseFormClearErrors,
} from 'react-hook-form';
import styled from '@emotion/styled';
import { Btn } from '../../../Tools/Button';
import { IForm } from '../../../types/global';
import { Flex, Flex_ } from '../../../../styles/global';
import { InputWrap } from '../../../Tools/Input';
import { SelectWrap } from '../../../Tools/Input/Select';

interface IInputs {
  _data: {
    theme: boolean;
    isDesk: boolean;
    err_title: string;
    watch: UseFormWatch<IForm>;
    register: UseFormRegister<IForm>;
    clearErrors: UseFormClearErrors<IForm>;
  };
}
export const Inputs = ({ _data }: IInputs) => {
  const { theme, watch, register, clearErrors, err_title, isDesk } = _data;
  return (
    <Cont className="inputs" isDesk={isDesk}>
      <InputWrap
        _data={{
          theme,
          clearErrors,
          id: 'title',
          type: 'text',
          label: 'Title',
          text: watch('title'),
          error: err_title!,
          register: register('title', { required: 'need_title' }),
        }}
      />
      <SelectWrap
        _data={{
          theme,
          clearErrors,
          id: 'genre',
          text: watch('genre'),
          register: register('genre'),
        }}
      />
    </Cont>
  );
};
const Cont = styled(Flex_)`
  gap: 1.2rem;
  align-items: flex-end;
`;
