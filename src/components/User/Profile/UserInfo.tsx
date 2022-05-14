import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { Error, Form, UserInfoEditForm } from '../../../../styles/global';
import useMutation from '../../../libs/client/useMutation';
import { IProfileEditForm, IProfileEditRes } from '../../../types/edit-profile';
import { ILoggedInUser } from '../../../types/login';
import { Btn } from '../../Btn';
import { Input } from '../../Input';
import { Select } from '../../Select';

export const UserInfo = () => {
  //Get
  const { data: swr } = useSWR<ILoggedInUser>(`/api/user/login`);

  //Post
  const [postEdit, { loading, data }] = useMutation<IProfileEditRes>(
    `/api/user/profile/userinfo`
  );

  //Form
  const [message, setMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IProfileEditForm>({ mode: 'onSubmit' });
  //
  const onValid = (formData: IProfileEditForm) => {
    if (loading) return;
    postEdit(formData);
    setMessage(true);
    reset({ newPassword: '', newPasswordConfirm: '', name: '' });
  };

  //Set up
  useEffect(() => {
    if (swr?.loggedInUser?.userId) {
      setValue('userId', swr?.loggedInUser?.userId);
    }
    if (data?.ok) {
      setMessage(false);
    }
  }, [swr]);
  //
  return (
    <>
      <UserInfoEditForm onSubmit={handleSubmit(onValid)}>
        {message && <Error>{data?.message}</Error>}
        {data?.error && <Error>{data?.error}</Error>}

        <div className="input-wrap">
          <Input
            label="USERNAME"
            type="text"
            name="username"
            errMsg={errors.username?.message}
            placeholder="새로운 닉네임을 입력해주세요."
            register={register('userId')}
          />
          <Input
            label="NAME"
            type="text"
            name="name"
            errMsg={errors.name?.message}
            placeholder="새로운 이름을 입력해주세요."
            register={register('name')}
          />
        </div>
        <div className="input-wrap">
          <Input
            label="BIRTH"
            type="date"
            name="birth"
            errMsg={errors.birth?.message}
            placeholder="생년월일을 입력해주세요."
            register={register('birth')}
          />
          <Select
            options={['MALE', 'FEMALE']}
            label="GENDER"
            name="gender"
            errMsg={errors.gender?.message}
            placeholder="생년월일을 입력해주세요."
            register={register('gender')}
          />

          <Input
            label="LOCATION"
            type="text"
            name="location"
            errMsg={errors.location?.message}
            placeholder="거주지역을 입력해주세요."
            register={register('location')}
          />
        </div>
        <Input
          label="EMAIL"
          type="email"
          name="email"
          errMsg={errors.email?.message}
          placeholder="새로운 이메일을 입력해주세요."
          register={register('email')}
        />
        <Btn type="submit" loading={loading} btnName="수정사항 저장" />
      </UserInfoEditForm>
    </>
  );
};
