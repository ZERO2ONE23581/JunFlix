import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { useForm } from 'react-hook-form';
import { InputWrap } from '../../Style/Input';
import { MutationRes } from '../../../types/mutation';
import { Form, Container, FormCont } from '../../../../styles/global';
import useMutation from '../../../libs/client/useMutation';
import { SelectWrap } from '../../Style/Input/SelectWrap';
import useUser from '../../../libs/client/useUser';
import { Errors } from '../../Review/Create/Error';
import { Heading } from '../Join/Heading';
import { IUserForm } from '../../../types/user';
import { Box } from './UserId';

export const UserInfo = () => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const [Edit, { loading, data }] = useMutation<MutationRes>(
    `/api/user/${loggedInUser?.id}/edit/user_info`
  );
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onBlur' });

  const user = loggedInUser;
  useEffect(() => {
    if (user?.email) setValue('email', user?.email);
    if (user?.username) setValue('username', user?.username);
    if (user?.name) setValue('name', user?.name);
    if (user?.birth) setValue('birth', user?.birth);
    if (user?.gender) setValue('gender', user?.gender);
    if (user?.location) setValue('location', user?.location);
  }, [user, setValue]);

  const onValid = ({
    name,
    email,
    birth,
    gender,
    location,
    username,
  }: IUserForm) => {
    if (loading) return;
    Edit({ name, email, birth, gender, location, username });
  };

  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok) alert('회원정보를 업데이트 했습니다.');
  }, [data, router]);

  return (
    <>
      <Cont>
        <Heading type="edit-userInfo" h1="Info (회원정보)" />
        <Form onSubmit={handleSubmit(onValid)}>
          <InputWrap
            id="username"
            type="text"
            label="Username"
            watch={watch('username')}
            register={register('username', {
              maxLength: {
                value: 10,
                message: '유저의 이름은 10자를 초과할수 없습니다.',
              },
            })}
          />
          <InputWrap
            id="email"
            type="email"
            label="Email"
            watch={watch('email')}
            register={register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: '이메일 형식이 올바르지 않습니다.',
              },
            })}
          />
          <div className="flex">
            <InputWrap
              id="name"
              type="text"
              label="Name"
              watch={watch('name')}
              register={register('name', {
                maxLength: {
                  value: 10,
                  message: '이름은 10자를 초과할수 없습니다.',
                },
              })}
            />
            <InputWrap
              id="birth"
              type="date"
              label="Birth"
              watch={watch('birth')}
              register={register('birth')}
            />
          </div>
          <div className="flex">
            <SelectWrap
              id="gender"
              watch={watch('gender')!}
              register={register('gender')}
            />
            <InputWrap
              id="location"
              type="text"
              label="Location"
              watch={watch('location')}
              register={register('location')}
            />
          </div>
          <Btn name="유저정보 수정" type="submit" loading={loading} />
        </Form>
      </Cont>
      <Errors errors={errors} />
    </>
  );
};
const Cont = styled(Box)`
  width: 400px;
  max-width: 400px;
`;
