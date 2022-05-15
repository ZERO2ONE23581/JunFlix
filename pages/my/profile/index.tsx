import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../src/components/Btn';
import { Input, Select } from '../../../src/components/Input';
import useUser from '../../../src/libs/client/loggedInUser';
import useMutation from '../../../src/libs/client/useMutation';
import {
  IProfileEditForm,
  IProfileEditRes,
} from '../../../src/types/edit-profile';
import { Error, Form } from '../../../styles/global-style';
import {
  InputsWrap,
  InputWrap,
  ProEditPgCont,
} from '../../../styles/profileEdit-style';

const Profile: NextPage = () => {
  //Get
  const { loggedInUser } = useUser();

  //Post
  const [method, setMethod] = useState({
    userId: false,
    password: false,
    userInfo: false,
  });
  const methodClick = (type: string) => {
    if (type === 'userId')
      setMethod((prev) => ({
        ...prev,
        userId: true,
        password: false,
        userInfo: false,
      }));
    if (type === 'password')
      setMethod((prev) => ({
        ...prev,
        password: true,
        userId: false,
        userInfo: false,
      }));
    if (type === 'userInfo')
      setMethod((prev) => ({
        ...prev,
        userInfo: true,
        userId: false,
        password: false,
      }));
  };
  // const method = 'userId' || 'password' || 'userInfo';
  const [postEdit, { loading, data }] = useMutation<IProfileEditRes>(
    `/api/user/profile/edit`
  );

  //Form
  const [message, setMessage] = useState(false);
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
    if (loading) return;
    if (method.userId) {
      console.log('일번');
      return;
      if (!userId)
        return setError('userId', { message: '아이디를 입력해주세요.' });
      const userID = userId?.toUpperCase();
      postEdit({ userID, method });
      setMessage(true);
      reset({ newPassword: '', newPasswordConfirm: '', oldPassword: '' });
    }
    if (method.password) {
      console.log('2번');
      return;
    }
    if (method.userInfo) {
      console.log('3번');
      return;
    }
  };

  //Set up
  useEffect(() => {
    if (loggedInUser?.userId) setValue('userId', loggedInUser?.userId);
    if (data?.ok) setMessage(false);
  }, [loggedInUser]);

  //
  return (
    <ProEditPgCont>
      <>
        <Form onSubmit={handleSubmit(onValid)}>
          {message && <Error>{data?.message}</Error>}
          {data?.error && <Error>{data?.error}</Error>}
          <Input
            label="ID"
            type="text"
            name="userId"
            errMsg={errors.userId?.message}
            placeholder="새로운 아이디를 입력해주세요."
            register={register(
              'userId',
              method.userId
                ? { required: '새로운 아이디를 입력해주세요.' }
                : { required: false }
            )}
          />
          <Btn
            onClick={() => methodClick('userId')}
            type="submit"
            loading={loading}
            btnName="SAVE"
          />
        </Form>
      </>

      <>
        <Form onSubmit={handleSubmit(onValid)}>
          {message && <Error>{data?.message}</Error>}
          {data?.error && <Error>{data?.error}</Error>}
          <Input
            label="Old Password"
            type="password"
            name="oldPassword"
            errMsg={errors.oldPassword?.message}
            placeholder="현재 비밀번호를 입력해주세요."
            register={register(
              'oldPassword',
              method.password
                ? { required: '현재 비밀번호를 입력해주세요.' }
                : { required: false }
            )}
          />
          <InputWrap>
            <Input
              label="Password"
              type="password"
              name="newPassword"
              errMsg={errors.newPassword?.message}
              placeholder="새로운 비밀번호를 입력해주세요."
              register={register(
                'newPassword',
                method.password
                  ? { required: '새로운 비밀번호를 입력해주세요.' }
                  : { required: false }
              )}
            />
            <Input
              label="Password Confirm"
              type="password"
              name="newPasswordConfirm"
              errMsg={errors.newPasswordConfirm?.message}
              placeholder="새로운 비밀번호를 재입력해주세요."
              register={register(
                'newPasswordConfirm',
                method.password
                  ? { required: '새로운 비밀번호를 재입력해주세요.' }
                  : { required: false }
              )}
            />
          </InputWrap>
          <Btn
            onClick={() => methodClick('password')}
            type="submit"
            loading={loading}
            btnName="SAVE"
          />
        </Form>
      </>

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
          <Btn
            onClick={() => methodClick('userInfo')}
            type="submit"
            loading={loading}
            btnName="SAVE"
          />
        </Form>
      </>
    </ProEditPgCont>
  );
};

export default Profile;
