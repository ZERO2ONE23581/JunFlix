import {
  UseFormWatch,
  UseFormSetError,
  UseFormRegister,
  UseFormClearErrors,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { Inputs } from './Inputs';
import { Private } from './Private';
import { IForm } from '../../../types/global';
import { Form } from '../../../../styles/global';
import { Dispatch, SetStateAction } from 'react';
import { useUser } from '../../../libs/client/useUser';
import { useLength, useResponsive } from '../../../libs/client/useTools';
import { TextAreaWrap } from '../../../Tools/Input/TextArea';
import styled from '@emotion/styled';

export const UpdateForm = ({ _data, _useform }: IUpdateForm) => {
  const { user_id } = useUser();
  const { err_desc, err_title } = _useform?.errors!;
  const { POST, theme, setLoading, loading } = _data;
  const { setError, handleSubmit, watch, register, clearErrors } = _useform;
  const onValid = async ({ title, genre, onPrivate, description }: IForm) => {
    const title_len = useLength(title);
    const desc_len = useLength(description!);
    if (title_len >= 30)
      return setError('title', { message: 'max_board_title' });
    if (desc_len >= 700)
      return setError('description', { message: 'max_board_desc' });
    setLoading(true);
    if (loading) return;
    return POST({ title, genre, onPrivate, description, user_id });
  };
  const { isDesk } = useResponsive();
  return (
    <Cont isDesk={isDesk} onSubmit={handleSubmit(onValid)}>
      <Inputs
        _data={{ watch, theme, register, err_title, clearErrors, isDesk }}
      />
      <TextAreaWrap
        _data={{
          theme,
          min: 200,
          max: 700,
          clearErrors,
          error: err_desc,
          id: 'description',
          label: 'Description',
          text: watch('description'),
          register: register('description'),
        }}
      />
    </Cont>
  );
};
const Cont = styled.form<{ isDesk: boolean }>`
  width: 100%;
  display: flex;
  overflow-y: auto;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .inputs {
    margin: ${(p) => (p.isDesk ? '0' : '2rem auto')};
    flex-direction: ${(p) => (p.isDesk ? 'row' : 'column')};
  }
`;
interface IUpdateForm {
  _data: {
    theme: boolean;
    loading: boolean;
    POST: ({}) => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
  _useform: {
    watch: UseFormWatch<IForm>;
    setError: UseFormSetError<IForm>;
    register: UseFormRegister<IForm>;
    clearErrors: UseFormClearErrors<IForm>;
    handleSubmit: UseFormHandleSubmit<IForm>;
    errors: { err_title: string; err_desc: string };
  };
}
