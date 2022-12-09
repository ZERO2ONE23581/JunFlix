import {
  UseFormWatch,
  UseFormRegister,
  UseFormClearErrors,
} from 'react-hook-form';
import styled from '@emotion/styled';
import { Btn } from '../../../Tools/Button';
import { InputWrap } from '../../../Tools/Input';
import { Flex } from '../../../../styles/global';
import { IBoardForm } from '../../../types/board';
import { SelectWrap } from '../../../Tools/Input/Select';

interface ICreateBoardWrap {
  _data: {
    error: string;
    theme: boolean;
    watch: UseFormWatch<IBoardForm>;
    register: UseFormRegister<IBoardForm>;
    clearErrors: UseFormClearErrors<IBoardForm>;
  };
}

export const Wrap = ({ _data }: ICreateBoardWrap) => {
  const { theme, clearErrors, watch, register, error } = _data;
  return (
    <Cont>
      <InputWrap
        _data={{
          theme,
          error,
          clearErrors,
          id: 'title',
          type: 'text',
          label: 'Title',
          text: watch('title'),
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
      <Btn type="submit" item={{ theme, name: 'Save' }} />
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 15px;
  align-items: flex-end;
  .select-wrap {
    width: fit-content;
  }
  button {
    width: fit-content;
    padding: 11px 30px;
  }
`;
