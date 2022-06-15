import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IEditProfileProps } from '../../../../pages/user/my/profile/edit';
import {
  Errors,
  Form,
  FormCont,
  Input,
  Select,
} from '../../../../styles/global';
import useMutation from '../../../libs/client/useMutation';
import { MutationRes } from '../../../types/mutation';
import { Btn } from '../../Button';

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
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditUserInfoForm>({ mode: 'onBlur' });

  const onValid = (formData: IEditUserInfoForm) => {
    if (!formData)
      return setError('NoInputError', { message: '수정할 항목이 없습니다.' });
    if (loading) return;
    editUserInfo(formData);
  };
  const [editUserInfo, { loading, data }] = useMutation<MutationRes>(
    `/api/user/${user?.id}/edit/user_info`
  );
  console.log(data);
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
  }, [user, data, router]);
  return (
    <FormCont>
      <h1>Edit User Information</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="username" />
        <Input
          {...register('username', {
            maxLength: {
              value: 10,
              message: '유저의 이름은 10자를 초과할수 없습니다.',
            },
          })}
          type="text"
          id="username"
          name="username"
          placeholder="Username"
        />
        {errors.username && <Errors>{errors.username?.message}</Errors>}

        <label htmlFor="email" />
        <Input
          {...register('email', {
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: '이메일 형식이 올바르지 않습니다.',
            },
          })}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
        />
        {errors.email && <Errors>{errors.email?.message}</Errors>}

        <div className="flex">
          <label htmlFor="name" />
          <Input
            {...register('name', {
              maxLength: {
                value: 10,
                message: '이름은 10자를 초과할수 없습니다.',
              },
            })}
            type="text"
            id="name"
            name="name"
            placeholder="Name"
          />
          {errors.name && <Errors>{errors.name?.message}</Errors>}

          <label htmlFor="birth" />
          <Input
            {...register('birth')}
            type="date"
            id="birth"
            name="birth"
            placeholder="Birth"
          />
          {errors.birth && <Errors>{errors.birth?.message}</Errors>}
        </div>

        <div className="flex">
          <label htmlFor="gender" />
          <Select {...register('gender')} name="gender" id="gender">
            <option value="">성별을 선택해주세요.</option>
            <option value="male">남</option>
            <option value="female">여</option>
          </Select>
          {errors.birth && <Errors>{errors.birth?.message}</Errors>}

          <label htmlFor="location" />
          <Input
            {...register('location')}
            type="text"
            id="location"
            name="location"
            placeholder="Location"
          />
          {errors.location && <Errors>{errors.location?.message}</Errors>}
        </div>

        <input
          {...register('NoInputError')}
          disabled
          style={{ display: 'none' }}
        />
        {data?.error && <Errors>{data.error}</Errors>}
        <div className="btn-flex">
          <Btn name="유저정보 수정" type="submit" loading={loading} />
        </div>
      </Form>
    </FormCont>
  );
};
