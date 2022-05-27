import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../Btn';
import { Input, Select } from '../../Input';
import useUser from '../../../libs/client/loggedInUser';
import useMutation from '../../../libs/client/useMutation';
import { IProfileEditForm, IProfileEditRes } from '../../../types/edit-profile';
import { Form, InputWrap } from '../../../../styles/components/default';

export const Edit_UserInfo = () => {
  const { loggedInUser, loggedInUserId } = useUser();
  //POST
  const [editUserInfo, { loading: userInfoLoading, data: userInfoData }] =
    useMutation<IProfileEditRes>(
      `/api/user/${loggedInUserId}/edit/profile/userinfo`
    );
  //Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm<IProfileEditForm>({ mode: 'onSubmit' });
  //
  const onValid = ({ userId }: IProfileEditForm) => {
    console.log(userId);
  };

  //Set up
  useEffect(() => {
    if (loggedInUser?.username) setValue('username', loggedInUser?.username);
    if (loggedInUser?.name) setValue('name', loggedInUser?.name);
    if (loggedInUser?.birth) setValue('birth', loggedInUser?.birth);
    if (loggedInUser?.gender) setValue('gender', loggedInUser?.gender);
    if (loggedInUser?.location) setValue('location', loggedInUser?.location);
  }, [loggedInUser]);
  //
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <InputWrap>
        <Input
          label="Username"
          type="text"
          name="username"
          errMsg={errors.username?.message}
          placeholder="새로운 닉네임을 입력해주세요."
          register={register('username')}
        />
        <Input
          label="Name"
          type="text"
          name="name"
          errMsg={errors.name?.message}
          placeholder="이름을 입력해주세요."
          register={register('name')}
        />
      </InputWrap>
      <InputWrap>
        <Input
          label="Birth"
          type="date"
          name="birth"
          errMsg={errors.birth?.message}
          placeholder="생년월일을 입력해주세요."
          register={register('birth')}
        />
        <Select
          options={['남', '여']}
          label="Gender"
          name="gender"
          errMsg={errors.gender?.message}
          placeholder="성별을 선택해주세요."
          register={register('gender')}
        />
      </InputWrap>
      <Input
        label="Location"
        type="text"
        name="location"
        errMsg={errors.location?.message}
        placeholder="거주지역을 입력해주세요."
        register={register('location')}
      />

      <Btn type="submit" loading={userInfoLoading} btnName="SAVE" />
    </Form>
  );
};
