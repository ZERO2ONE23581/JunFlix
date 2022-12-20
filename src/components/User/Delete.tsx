import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Btn } from '../../Tools/Button';
import { useForm } from 'react-hook-form';
import { InputWrap } from '../../Tools/Input';
import { ErrTxt } from '../../Tools/ErrTxt';
import { Dispatch, SetStateAction } from 'react';
import { opacityVar } from '../../../styles/variants';
import { IUserForm, IUserType } from '../../types/user';
import { BtnWrap, Flex, FlexCol, Form } from '../../../styles/global';

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
  return (
    <>
      {type === 'delete' && (
        <Cont onSubmit={handleSubmit(onValid)}>
          {!delAcct && (
            <One
              exit="exit"
              animate="animate"
              initial="initial"
              variants={opacityVar}
            >
              <Btn
                type="button"
                onClick={() => setDelAcct(true)}
                item={{ theme, name: 'Delete' }}
              />
            </One>
          )}
          {delAcct && (
            <IsConfirm
              exit="exit"
              animate="animate"
              initial="initial"
              variants={opacityVar}
            >
              <InputWrap
                _data={{
                  theme,
                  clearErrors,
                  id: 'password',
                  type: 'password',
                  label: 'Password',
                  text: watch('password')!,
                  register: register!('password', {
                    required: 'need_password',
                  }),
                }}
              />
              <ErrTxt error={errors.password?.message!} theme={theme} />
              <BtnWrap className="btn_wrap">
                <Btn
                  type="button"
                  onClick={() => setDelAcct(false)}
                  item={{ theme, name: 'Cancel' }}
                />
                <Btn type="submit" item={{ theme, name: 'Delete' }} />
              </BtnWrap>
            </IsConfirm>
          )}
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Form)`
  gap: 0;
  width: 100%;
`;
const IsConfirm = styled(motion.article)`
  .btn_wrap {
    margin-top: 1rem;
    button {
      min-width: 100px;
      width: fit-content;
    }
  }
  .err_msg {
    gap: 1rem;
    margin-top: 1rem;
  }
`;
const One = styled(Flex)`
  width: 100%;
  button {
    min-width: 120px;
    margin-top: 1rem;
    width: fit-content;
  }
`;
const Warning = styled(FlexCol)`
  font-size: 1.1rem;
  margin-top: 0.4rem;
  font-style: italic;
  align-items: flex-start;
  color: ${(p) => p.theme.color.logo};
`;
