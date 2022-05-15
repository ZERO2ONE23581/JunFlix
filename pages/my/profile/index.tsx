import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useUser from '../../../src/libs/client/loggedInUser';
import useMutation from '../../../src/libs/client/useMutation';
import { Form } from '../../../styles/global-style';
import { ProEditPgCont } from '../../../styles/profileEdit-style';
import {
  IProfileEditForm,
  IProfileEditRes,
} from '../../../src/types/edit-profile';
import {
  EditInputPassword,
  EditInputUserId,
  EditInputUserInfo,
} from '../../../src/components/User/Profile/Edit_Input';
import { Delete_Account } from '../../../src/components/User/Profile/Delete_Account';

const Profile: NextPage = () => {
  //Get
  const { loggedInUser } = useUser();

  //Post
  const [postEdit, { loading, data }] = useMutation<IProfileEditRes>(
    `/api/user/profile/edit`
  );

  //Category
  const [category, setCategory] = useState({
    userId: false,
    password: false,
    userInfo: false,
  });
  const categorySelect = (type: string) => {
    if (type === 'userId')
      setCategory((prev) => ({
        ...prev,
        userId: true,
        password: false,
        userInfo: false,
      }));
    if (type === 'password')
      setCategory((prev) => ({
        ...prev,
        password: true,
        userId: false,
        userInfo: false,
      }));
    if (type === 'userInfo')
      setCategory((prev) => ({
        ...prev,
        userInfo: true,
        userId: false,
        password: false,
      }));
  };

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
  const onValid = ({
    userId,
    oldPassword,
    newPassword,
    newPasswordConfirm,
    avatar,
    username,
    name,
    birth,
    gender,
    location,
    email,
  }: IProfileEditForm) => {
    //
    if (loading) return;
    //
    if (category.userId) {
      if (!userId)
        return setError('userId', { message: '아이디를 입력해주세요.' });
      const userID = userId?.toUpperCase();
      postEdit({ category, userID });
    }
    //
    if (category.password) {
      if (newPassword !== newPasswordConfirm)
        return setError('newPasswordConfirm', {
          message: '비밀번호가 일치하지 않습니다.',
        });
      postEdit({ category, oldPassword, newPassword, newPasswordConfirm });
      reset({ newPassword: '', newPasswordConfirm: '', oldPassword: '' });
    }
    //
    if (category.userInfo) {
      postEdit({
        category,
        username,
        name,
        birth,
        gender,
        location,
        email,
        avatar,
      });
    }
  };

  //Set up
  useEffect(() => {
    if (loggedInUser?.userId) setValue('userId', loggedInUser?.userId);
    if (loggedInUser?.username) setValue('username', loggedInUser?.username);
    if (loggedInUser?.name) setValue('name', loggedInUser?.name);
    if (loggedInUser?.birth) setValue('birth', loggedInUser?.birth);
    if (loggedInUser?.gender) setValue('gender', loggedInUser?.gender);
    if (loggedInUser?.location) setValue('location', loggedInUser?.location);
    if (loggedInUser?.email) setValue('email', loggedInUser?.email);
  }, [loggedInUser]);

  //
  return (
    <ProEditPgCont>
      <section className="form-wrapper">
        <Form onSubmit={handleSubmit(onValid)}>
          <EditInputUserId
            Type={data?.type}
            errExists={Boolean(data?.error)}
            dataErrMsg={data?.error}
            errMsg={errors.userId?.message}
            register={register(
              'userId',
              category.userId
                ? { required: '새로운 아이디를 입력해주세요.' }
                : { required: false }
            )}
            onClick={() => categorySelect('userId')}
            loading={data?.type === 'userId' && loading}
          />
        </Form>
        <Form onSubmit={handleSubmit(onValid)}>
          <EditInputPassword
            Type={data?.type}
            errExists={Boolean(data?.error)}
            dataErrMsg={data?.error}
            errMsg={errors.oldPassword?.message}
            errMsg1={errors.newPassword?.message}
            errMsg2={errors.newPasswordConfirm?.message}
            register={register(
              'oldPassword',
              category.password
                ? { required: '현재 비밀번호를 입력해주세요.' }
                : { required: false }
            )}
            register1={register(
              'newPassword',
              category.password
                ? { required: '새로운 비밀번호를 입력해주세요.' }
                : { required: false }
            )}
            register2={register(
              'newPasswordConfirm',
              category.password
                ? { required: '새로운 비밀번호를 재입력해주세요.' }
                : { required: false }
            )}
            onClick={() => categorySelect('password')}
            loading={data?.type === 'password' && loading}
          />
        </Form>
        <Form onSubmit={handleSubmit(onValid)}>
          <EditInputUserInfo
            Type={data?.type}
            errExists={Boolean(data?.error)}
            dataErrMsg={data?.error}
            errMsg={errors.username?.message}
            errMsg1={errors.name?.message}
            errMsg2={errors.birth?.message}
            errMsg3={errors.gender?.message}
            errMsg4={errors.location?.message}
            errMsg5={errors.email?.message}
            register={register('username')}
            register1={register('name')}
            register2={register('birth')}
            register3={register('gender')}
            register4={register('location')}
            register5={register('email')}
            onClick={() => categorySelect('userInfo')}
            loading={data?.type === 'userInfo' && loading}
          />
        </Form>
      </section>
      <Delete_Account />
    </ProEditPgCont>
  );
};

export default Profile;
