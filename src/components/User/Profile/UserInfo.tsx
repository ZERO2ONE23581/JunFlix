import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { Error } from '../../../../styles/global-style';
import { UserInfoEditForm } from '../../../../styles/profileEdit-style';
import useUser from '../../../libs/client/loggedInUser';
import useMutation from '../../../libs/client/useMutation';
import { IProfileEditForm, IProfileEditRes } from '../../../types/edit-profile';
import { ILoggedInUser } from '../../../types/login';
import { Btn } from '../../Btn';
import { Input, Select } from '../../Input';

export const UserInfo = () => {
  //Get
  const { loggedInUser } = useUser();

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
  } = useForm<IProfileEditForm>({ mode: 'onSubmit' });
  //
  const onValid = (formData: IProfileEditForm) => {
    if (loading) return;
    postEdit(formData);
    setMessage(true);
  };

  //Set up
  useEffect(() => {
    if (loggedInUser?.username) setValue('username', loggedInUser?.username);
    if (loggedInUser?.birth) setValue('birth', loggedInUser?.birth);
    if (loggedInUser?.gender) setValue('gender', loggedInUser?.gender);
    if (loggedInUser?.location) setValue('location', loggedInUser?.location);
    if (loggedInUser?.email) setValue('email', loggedInUser?.email);
    if (data?.ok) setMessage((p) => !p);
  }, [loggedInUser]);
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
            register={register('username')}
          />
          <Input
            label="BIRTH"
            type="date"
            name="birth"
            errMsg={errors.birth?.message}
            placeholder="생년월일을 입력해주세요."
            register={register('birth')}
          />
        </div>
        <div className="input-wrap">
          <Select
            options={['남', '녀']}
            label="GENDER"
            name="gender"
            errMsg={errors.gender?.message}
            placeholder="성별을 선택해주세요."
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
        <Btn type="submit" loading={loading} btnName="SAVE" />
      </UserInfoEditForm>
    </>
  );
};
