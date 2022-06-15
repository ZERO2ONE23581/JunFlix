import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrMsg, Form, InputWrap, OkMsg } from '../../../../styles/default';
import useMutation from '../../../../libs/client/useMutation';
import useUser from '../../../../libs/client/useUser';
import { Btn } from '../../../Button';
import { Input, Select } from '../../../Input';

interface IEditUserInfoForm {
  username?: string;
  name?: string;
  birth?: string;
  gender?: string;
  location?: string;
  NoInputError?: string;
}
interface IEditUserIdRes {
  ok: boolean;
  error?: string;
}

export const Edit_UserInfo = () => {
  const { loggedInUser } = useUser();
  //POST
  const [editUserInfo, { loading, data }] = useMutation<IEditUserIdRes>(
    `/api/user/${loggedInUser?.id}/edit/userInfo`
  );
  //Form
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditUserInfoForm>({ mode: 'onSubmit' });

  const onValid = ({
    username,
    name,
    birth,
    gender,
    location,
  }: IEditUserInfoForm) => {
    if (Boolean(!username && !name && !birth && !gender && !location))
      return setError('NoInputError', { message: '수정할 항목이 없습니다.' });
    if (loading) return;
    editUserInfo({ username, name, birth, gender, location });
  };

  //Set up
  useEffect(() => {
    if (loggedInUser?.username) setValue('username', loggedInUser?.username);
    if (loggedInUser?.name) setValue('name', loggedInUser?.name);
    if (loggedInUser?.birth) setValue('birth', loggedInUser?.birth);
    if (loggedInUser?.gender) setValue('gender', loggedInUser?.gender);
    if (loggedInUser?.location) setValue('location', loggedInUser?.location);
    if (data?.ok) {
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  }, [loggedInUser, data]);
  //
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      {data?.error && <ErrMsg>{data?.error}</ErrMsg>}
      {data?.ok && <OkMsg>프로필 정보가 수정되었습니다.</OkMsg>}
      {errors.NoInputError && <ErrMsg>{errors.NoInputError.message}</ErrMsg>}

      <InputWrap>
        <input
          {...register('NoInputError')}
          disabled
          style={{ display: 'none' }}
        />
        <Input
          type="text"
          name="username"
          label="Username"
          placeholder="새로운 닉네임을 입력해주세요."
          register={register('username')}
          errMsg={errors.username?.message}
        />
        <Input
          type="text"
          name="name"
          label="Name"
          placeholder="이름을 입력해주세요."
          register={register('name')}
          errMsg={errors.name?.message}
        />
      </InputWrap>
      <InputWrap>
        <Input
          type="date"
          name="birth"
          label="Birth"
          placeholder="생년월일을 입력해주세요."
          register={register('birth')}
          errMsg={errors.birth?.message}
        />
        <Select
          name="gender"
          label="Gender"
          options={['남', '여']}
          placeholder="성별을 선택해주세요."
          register={register('gender')}
          errMsg={errors.gender?.message}
        />
      </InputWrap>
      <Input
        type="text"
        name="location"
        label="Location"
        placeholder="거주지역을 입력해주세요."
        register={register('location')}
        errMsg={errors.location?.message}
      />

      <Btn type="submit" loading={loading} btnName="SAVE" />
    </Form>
  );
};
