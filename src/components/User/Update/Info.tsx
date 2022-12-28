import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { InputWrap } from '../../../Tools/Input';
import { ErrTxt } from '../../../Tools/ErrTxt';
import { Flex, Form } from '../../../../styles/global';
import { SelectWrap } from '../../../Tools/Input/Select';
import { IUpdateUser, IUserForm } from '../../../types/user';
import { useCapLetters } from '../../../libs/client/useTools';

export const UserInfo = ({ _data }: IUpdateUser) => {
  const { User, type, update, theme, loading, setLoading } = _data;
  const {
    watch,
    setValue,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });
  //
  useEffect(() => {
    if (User) {
      if (User.name) setValue('name', User?.name);
      if (User.birth) setValue('birth', User?.birth);
      if (User.gender) setValue('gender', User?.gender);
      if (User.location) setValue('location', User?.location);
      if (User.username) setValue('username', useCapLetters(User?.username));
    }
  }, [User, setValue]);

  const onValid = ({ name, birth, gender, location, username }: IUserForm) => {
    const isAny = Boolean(name || birth || gender || location || username);
    if (!isAny) return setError('gender', { message: 'need_userInfo' });
    if (loading) return;
    setLoading(true);
    update({ name, birth, gender, location, username });
  };
  return (
    <>
      {type === 'userInfo' && (
        <Cont onSubmit={handleSubmit(onValid)}>
          <InputWrap
            _data={{
              theme,
              clearErrors,
              type: 'text',
              id: 'username',
              label: 'username',
              text: watch('username')!,
              register: register('username', {
                maxLength: { value: 20, message: 'max_username' },
              }),
            }}
          />
          <InputWrap
            _data={{
              theme,
              clearErrors,
              type: 'text',
              id: 'name',
              label: 'name',
              text: watch('name')!,
              register: register('name', {
                maxLength: { value: 20, message: 'max_name' },
              }),
            }}
          />
          <SelectWrap
            _data={{
              theme,
              clearErrors,
              id: 'gender',
              text: watch('gender'),
              error: errors.gender?.message,
              register: register('gender'),
            }}
          />

          <InputWrap
            _data={{
              theme,
              clearErrors,
              type: 'date',
              id: 'birth',
              label: 'Birth',
              text: watch('birth')!,
              register: register('birth'),
            }}
          />
          <ErrTxt error={errors.name?.message!} theme={theme} />
          <InputWrap
            _data={{
              theme,
              clearErrors,
              type: 'text',
              id: 'location',
              label: 'location',
              text: watch('location')!,
              register: register('location'),
            }}
          />
          <ErrTxt error={errors.username?.message!} theme={theme} />
          <Btn item={{ theme, name: 'Save' }} type="submit" />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Form)`
  gap: 0;
  button {
    margin-top: 1rem;
  }
  .flex {
    gap: 0.5rem;
    .select-wrap {
      margin-top: 1rem;
    }
  }
`;
