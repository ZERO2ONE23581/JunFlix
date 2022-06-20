import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { useForm } from 'react-hook-form';
import { ErrorMsg } from '../../Style/ErrMsg';
import { InputWrap } from '../../Style/Input';
import { MutationRes } from '../../../types/mutation';
import { IEditProfileProps } from '../../../types/user';
import { Form, FormCont } from '../../../../styles/global';
import useMutation from '../../../libs/client/useMutation';

interface IEditUserInfoForm {
  username?: string;
  email?: string;
  name?: string;
  birth?: string;
  gender?: string;
  location?: string;
  NoInputError?: string;
}

export const EditUserInfo = ({ user }: IEditProfileProps) => {
  const router = useRouter();
  const [editUserInfo, { loading, data }] = useMutation<MutationRes>(
    `/api/user/${user?.id}/edit/user_info`
  );
  const {
    watch,
    register,
    setError,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditUserInfoForm>({ mode: 'onBlur' });
  const isValue = (type: string | any) => Boolean(getValues(type));

  const onValid = ({
    name,
    email,
    birth,
    gender,
    location,
    username,
  }: IEditUserInfoForm) => {
    const NoInput = Boolean(
      !name && !email && !birth && !gender && !location && !username
    );
    if (NoInput)
      return setError('NoInputError', { message: '수정할 항목이 없습니다.' });
    if (loading) return;
    editUserInfo({ name, email, birth, gender, location, username });
  };
  useEffect(() => {
    if (user?.username) setValue('username', user?.username);
    if (user?.email) setValue('email', user?.email);
    if (user?.name) setValue('name', user?.name);
    if (user?.birth) setValue('birth', user?.birth);
    if (user?.gender) setValue('gender', user?.gender);
    if (user?.location) setValue('location', user?.location);
    if (data?.ok) {
      alert('회원님의 정보가 수정되었습니다.');
      router.reload();
    }
  }, [user, data, router, setValue]);
  return (
    <Cont>
      <h1>Edit User Information</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <InputWrap
          id="username"
          type="text"
          label="Username"
          watch={watch('username')}
          isValue={isValue('username')}
          inputErrMsg={errors.username?.message}
          register={register('username', {
            maxLength: {
              value: 10,
              message: '유저의 이름은 10자를 초과할수 없습니다.',
            },
          })}
        />
        <InputWrap
          watch={watch('email')}
          id="email"
          type="email"
          label="Email"
          isValue={isValue('email')}
          inputErrMsg={errors.email?.message}
          register={register('email', {
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
            isValue={isValue('name')}
            inputErrMsg={errors.name?.message}
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
            isValue={isValue('birth')}
            register={register('birth')}
            inputErrMsg={errors.birth?.message}
          />
        </div>
        <div className="flex">
          <InputWrap
            isSelect
            id="gender"
            label="Gender"
            watch={watch('gender')}
            isValue={isValue('gender')}
            register={register('gender')}
            inputErrMsg={errors.gender?.message}
          >
            <>
              <option value="">성별을 선택해주세요.</option>
              <option value="male">남</option>
              <option value="female">여</option>
            </>
          </InputWrap>
          <InputWrap
            id="location"
            type="text"
            label="Location"
            watch={watch('location')}
            isValue={isValue('location')}
            inputErrMsg={errors.location?.message}
            register={register('location')}
          />
        </div>
        <HiddenInput disabled {...register('NoInputError')} />
        {errors.NoInputError && (
          <ErrorMsg error={errors.NoInputError.message} />
        )}
        {data?.error && <ErrorMsg error={data.error} />}
        <Btn name="유저정보 수정" type="submit" loading={loading} />
      </Form>
    </Cont>
  );
};
const Cont = styled(FormCont)``;
const HiddenInput = styled.input`
  display: none;
`;
