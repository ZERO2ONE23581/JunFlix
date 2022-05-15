import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Error, Form } from '../../../../styles/global-style';
import { InputsWrap, InputWrap } from '../../../../styles/profileEdit-style';
import useUser from '../../../libs/client/loggedInUser';
import useMutation from '../../../libs/client/useMutation';
import { IProfileEditForm, IProfileEditRes } from '../../../types/edit-profile';
import { Btn } from '../../Btn';
import { Input, Select } from '../../Input';

export const Edit_UserInfo = () => {
  //Get
  const { loggedInUser } = useUser();

  //Post
  const postType = 'userInfo';
  const [postEdit, { loading, data }] = useMutation<IProfileEditRes>(
    `/api/user/profile/edit`
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
  const onValid = ({
    avatar,
    username,
    name,
    birth,
    gender,
    location,
    email,
  }: IProfileEditForm) => {
    if (loading) return;
    postEdit({
      postType,
      avatar,
      username,
      name,
      birth,
      gender,
      location,
      email,
    });
    setMessage(true);
  };

  //Set up
  useEffect(() => {
    if (loggedInUser?.username) setValue('username', loggedInUser?.username);
    if (loggedInUser?.name) setValue('name', loggedInUser?.name);
    if (loggedInUser?.birth) setValue('birth', loggedInUser?.birth);
    if (loggedInUser?.gender) setValue('gender', loggedInUser?.gender);
    if (loggedInUser?.location) setValue('location', loggedInUser?.location);
    if (loggedInUser?.email) setValue('email', loggedInUser?.email);
    if (data?.ok) setMessage((p) => !p);
  }, [loggedInUser]);
  //
  return (
    <>
      <Form onSubmit={handleSubmit(onValid)}>
        {message && <Error>{data?.message}</Error>}
        {data?.error && <Error>{data?.error}</Error>}

        <InputWrap>
          <Input
            label="USERNAME"
            type="text"
            name="username"
            errMsg={errors.username?.message}
            placeholder="새로운 닉네임을 입력해주세요."
            register={register('username')}
          />
          <Input
            label="NAME"
            type="text"
            name="name"
            errMsg={errors.name?.message}
            placeholder="이름을 입력해주세요."
            register={register('name')}
          />
        </InputWrap>
        <InputsWrap>
          <Input
            label="BIRTH"
            type="date"
            name="birth"
            errMsg={errors.birth?.message}
            placeholder="생년월일을 입력해주세요."
            register={register('birth')}
          />
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
        </InputsWrap>
        <Input
          label="EMAIL"
          type="email"
          name="email"
          errMsg={errors.email?.message}
          placeholder="새로운 이메일을 입력해주세요."
          register={register('email')}
        />
        <Btn type="submit" loading={loading} btnName="SAVE" />
      </Form>
    </>
  );
};
