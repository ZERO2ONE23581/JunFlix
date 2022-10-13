import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { IEditUser, IUserForm } from '../../../types/user';
import { Flex, Form } from '../../../../styles/global';
import { InputWrap } from '../../../Tools/Input';
import useUser from '../../../libs/client/useUser';
import { SelectWrap } from '../../../Tools/Input/Select';
import { useEffect } from 'react';
import { useCapLetters } from '../../../libs/client/useTools';

export const UserInfo_Form = ({ dataWrap }: IEditUser) => {
  const type = dataWrap.type;
  const post = dataWrap.post;
  const theme = dataWrap.theme;
  const loading = dataWrap.loading;
  const setLoading = dataWrap.setLoading;
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
      if (user.location) setValue('location', user?.location);
      if (user.username) setValue('username', useCapLetters(user?.username));
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
    post({ name, email, birth, gender, location, username });
  };
  //
  return (
    <>
      {type === 'userInfo' && (
        <Cont onSubmit={handleSubmit(onValid)}>
          <InputWrap
            theme={theme}
            id="username"
            type="text"
            label="Username"
            error={errors.username?.message}
            watch={Boolean(watch('username'))}
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
            watch={Boolean(watch('email'))}
            error={errors.email?.message}
            register={register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: '이메일 형식이 올바르지 않습니다.',
              },
            })}
          />
          <SelectWrap
            id="gender"
            theme={theme}
            error={errors.gender?.message}
            watch={Boolean(watch('gender'))}
            register={register('gender')}
          />
          <Flex className="flex">
            <InputWrap
              theme={theme}
              id="name"
              type="text"
              label="Name"
              watch={Boolean(watch('name'))}
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
              watch={Boolean(watch('birth'))}
              error={errors.birth?.message}
              register={register('birth')}
            />
            <InputWrap
              theme={theme}
              id="location"
              type="text"
              label="Location"
              error={errors.location?.message}
              watch={Boolean(watch('location'))}
              register={register('location')}
            />
          </Flex>
          <Btn item={{ theme, name: 'Edit' }} type="submit" />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Form)`
  gap: 22px;
  .flex {
    .birth {
      height: 40px;
    }
  }
`;
