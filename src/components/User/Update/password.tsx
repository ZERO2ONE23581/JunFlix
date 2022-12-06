import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { InputWrap } from '../../../Tools/Input';
import { ErrMsg } from '../../../Tools/Error/Message';
import { IUpdateUser, IUserForm } from '../../../types/user';
import { Flex, FlexCol, Form } from '../../../../styles/global';

export const UpdatePassword = ({ _data }: IUpdateUser) => {
  const { type, update, theme, loading, setLoading } = _data;
  const {
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });

  const onValid = ({ password, new_password, password_confirm }: IUserForm) => {
    if (loading) return;
    const isMatch = Boolean(new_password === password_confirm);
    if (!isMatch)
      return setError('password_confirm', { message: 'pw_unmatch' });
    setLoading(true);
    update({ password, new_password, password_confirm });
  };
  //
  return (
    <>
      {type === 'password' && (
        <Cont onSubmit={handleSubmit(onValid)}>
          <FlexCol className="inp_err_wrap">
            <InputWrap
              _data={{
                theme,
                clearErrors,
                id: 'password',
                type: 'password',
                label: 'Password',
                text: watch('password')!,
                register: register!('password', { required: 'need_password' }),
              }}
            />
            <ErrMsg error={errors.password?.message!} theme={theme} />
          </FlexCol>
          <Flex className="flex">
            <FlexCol className="inp_err_wrap">
              <InputWrap
                _data={{
                  theme,
                  clearErrors,
                  id: 'new_password',
                  type: 'password',
                  label: 'New Password',
                  text: watch('new_password')!,
                  register: register!('new_password', {
                    required: 'need_new_password',
                    minLength: { value: 8, message: 'min_password' },
                    maxLength: { value: 16, message: 'max_password' },
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/,
                      message: 'invalid_password',
                    },
                  }),
                }}
              />
              <ErrMsg error={errors.new_password?.message!} theme={theme} />
            </FlexCol>
            <FlexCol className="inp_err_wrap">
              <InputWrap
                _data={{
                  theme,
                  clearErrors,
                  type: 'password',
                  id: 'password_confirm',
                  label: 'Confirm',
                  text: watch('password_confirm')!,
                  register: register('password_confirm', {
                    required: 'need_password_confirm',
                  }),
                }}
              />
              <ErrMsg error={errors.password_confirm?.message!} theme={theme} />
            </FlexCol>
          </Flex>
          <Btn item={{ theme, name: 'Edit' }} type="submit" />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Form)`
  gap: 0;
  .flex {
    gap: 0.8rem;
  }
  .inp_err_wrap {
    gap: 1rem;
  }
  button {
    margin-top: 1rem;
  }
`;
