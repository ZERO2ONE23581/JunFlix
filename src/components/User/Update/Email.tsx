import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { Form } from '../../../../styles/global';
import { InputWrap } from '../../../Tools/Input';
import { ErrMsg } from '../../../Tools/Error/Message';
import { IUpdateUser, IUserForm } from '../../../types/user';
import { useEffect } from 'react';

export const UpdateEmail = ({ _data }: IUpdateUser) => {
  const { User, type, update, theme, loading, setLoading } = _data;
  const {
    watch,
    register,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });
  //
  const onValid = async ({ email }: IUserForm) => {
    setLoading(true);
    if (loading) return;
    return update({ email });
  };
  useEffect(() => {
    if (User) {
      if (User.email) setValue('email', User.email);
    }
  }, [setValue, User]);
  return (
    <>
      {type === 'email' && (
        <Form onSubmit={handleSubmit(onValid)}>
          <InputWrap
            _data={{
              theme,
              id: 'email',
              clearErrors,
              type: 'text',
              label: 'Email',
              text: watch('email')!,
              register: register('email', {
                required: 'need_email',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'invalid_email',
                },
              }),
            }}
          />
          <ErrMsg error={errors.email?.message!} theme={theme} />
          <Btn item={{ theme, name: 'Edit' }} type="submit" />
        </Form>
      )}
    </>
  );
};
