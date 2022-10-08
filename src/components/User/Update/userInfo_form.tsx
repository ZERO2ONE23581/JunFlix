import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { IUserForm } from '../../../types/user';
import { ITheme } from '../../../../styles/theme';
import { InputWrap } from '../../../Tools/Input';
import useUser from '../../../libs/client/useUser';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Flex } from '../../../../styles/global';
import styled from '@emotion/styled';
import { SelectWrap } from '../../../Tools/Input/Select';

interface IEdit_UserInfo extends ITheme {
  loading: boolean;
  update: ({}) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export const Edit_UserInfo = ({
  theme,
  update,
  loading,
  setLoading,
}: IEdit_UserInfo) => {
  const { loggedInUser } = useUser();
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });
  //
  useEffect(() => {
    const user = loggedInUser;
    if (user) {
      if (user.name) setValue('name', user?.name);
      if (user.email) setValue('email', user?.email);
      if (user.birth) setValue('birth', user?.birth);
      if (user.gender) setValue('gender', user?.gender);
      if (user.username) setValue('username', user?.username);
      if (user.location) setValue('location', user?.location);
    }
  }, [loggedInUser, setValue]);
  //
  const onValid = ({
    name,
    email,
    birth,
    gender,
    location,
    username,
  }: IUserForm) => {
    if (loading) return;
    setLoading(true);
    update({ name, email, birth, gender, location, username });
  };
  //
  return (
    <>
      <Cont onSubmit={handleSubmit(onValid)}>
        <InputWrap
          theme={theme}
          id="username"
          type="text"
          label="Username"
          watch={watch('username')}
          error={errors.username?.message}
          register={register('username', {
            maxLength: {
              value: 10,
              message: '유저의 이름은 10자를 초과할수 없습니다.',
            },
          })}
        />
        <InputWrap
          theme={theme}
          id="email"
          type="email"
          label="Email"
          watch={watch('email')}
          error={errors.email?.message}
          register={register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: '이메일 형식이 올바르지 않습니다.',
            },
          })}
        />
        <Flex className="flex">
          <InputWrap
            theme={theme}
            id="name"
            type="text"
            label="Name"
            watch={watch('name')}
            error={errors.name?.message}
            register={register('name', {
              maxLength: {
                value: 10,
                message: '이름은 10자를 초과할수 없습니다.',
              },
            })}
          />
          <InputWrap
            theme={theme}
            id="birth"
            type="date"
            label="Birth"
            watch={watch('birth')}
            error={errors.birth?.message}
            register={register('birth')}
          />
        </Flex>
        <Flex className="flex">
          <SelectWrap
            id="gender"
            theme={theme}
            error={errors.gender?.message}
            watch={Boolean(watch('gender'))}
            register={register('gender')}
          />
          <InputWrap
            theme={theme}
            id="location"
            type="text"
            label="Location"
            error={errors.location?.message}
            watch={watch('location')}
            register={register('location')}
          />
        </Flex>
        <Btn theme={theme} name="Update" type="submit" />
      </Cont>
    </>
  );
};
const Cont = styled.form`
  gap: 20px;
  display: flex;
  .flex {
    gap: 15px;
    align-items: flex-start;
  }
`;
