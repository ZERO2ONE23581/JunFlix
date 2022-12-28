import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Btn } from '../../../Tools/Button';
import { useForm } from 'react-hook-form';
import { InputWrap } from '../../../Tools/Input';
import { ErrTxt } from '../../../Tools/ErrTxt';
import { Dispatch, SetStateAction } from 'react';
import { opacityVar } from '../../../../styles/variants';
import { IUserForm, IUserType } from '../../../types/user';
import { BtnWrap, Flex, FlexCol, Form } from '../../../../styles/global';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';

interface IDeleteUser {
  _data: {
    type: string;
    theme: boolean;
    User: IUserType;
    loading: boolean;
    update: ({}) => void;
    delAcct: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setDelAcct: Dispatch<SetStateAction<boolean>>;
  };
}
export const DeleteUser = ({ _data }: IDeleteUser) => {
  const {
    User,
    type,
    theme,
    loading,
    setLoading,
    delAcct,
    setDelAcct,
    update: POST,
  } = _data;
  const {
    watch,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });
  const onValid = ({ password }: IUserForm) => {
    if (loading) return;
    setLoading(true);
    return POST({ password });
  };
  const error = errors.password?.message!;
  return (
    <>
      {type === 'delete' && (
        <Cont onSubmit={handleSubmit(onValid)}>
          <StepOne _data={{ theme, delAcct, setDelAcct }} />
          <StepTwo
            _data={{ theme, User, delAcct, setDelAcct }}
            _useform={{ error, watch, register, clearErrors }}
          />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Form)`
  padding: 0;
`;
