import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useUser from '../../../src/libs/client/loggedInUser';
import useMutation from '../../../src/libs/client/useMutation';
import {
  IProfileEditForm,
  IProfileEditRes,
} from '../../../src/types/edit-profile';
import { Delete_Account } from '../../../src/components/User/Profile/Delete_Account';
import { DataResult, EditForm, Form } from '../../../styles/formStyle';
import { ProEditPgCont } from '../../../styles/defaultStyle';
import { Input, Select } from '../../../src/components/Input';
import { Btn } from '../../../src/components/Btn';
import { InputWrap } from '../../../styles/inputStyle';

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
  let dataOkMsg = '프로필이 성공적으로 업데이트 되었습니다.';
  const dataConditon = (type: string, ok: boolean) => {
    if (ok) return data?.type === type && !data?.error; //메시지
    if (!ok) return data?.type === type && data?.error; //에러메시지
  };
  //
  return (
    <ProEditPgCont>
      <section className="form-wrapper">
        <EditForm onSubmit={handleSubmit(onValid)}>
          <article className="layer-one">
            {data && (
              <DataResult>
                {dataConditon('userId', true) && <p>{dataOkMsg}</p>}
                {dataConditon('userId', false) && <p>{data?.error}</p>}
              </DataResult>
            )}
            <Input
              label="ID"
              type="text"
              name="userId"
              errMsg={errors.userId?.message}
              register={register(
                'userId',
                category.userId
                  ? { required: '새로운 아이디를 입력해주세요.' }
                  : { required: false }
              )}
              placeholder="새로운 아이디를 입력해주세요."
            />
          </article>
          <Btn
            onClick={() => categorySelect('userId')}
            type="submit"
            loading={Boolean(data?.type === 'userId' && loading)}
            btnName="SAVE"
          />
        </EditForm>
        <EditForm onSubmit={handleSubmit(onValid)}>
          <article className="layer-one">
            {data && (
              <DataResult>
                {dataConditon('password', true) && <p>{dataOkMsg}</p>}
                {dataConditon('password', false) && <p>{data?.error}</p>}
              </DataResult>
            )}
            <>
              <Input
                label="Old Password"
                type="password"
                name="oldPassword"
                errMsg={errors.oldPassword?.message}
                placeholder="현재 비밀번호를 입력해주세요."
                register={register(
                  'oldPassword',
                  category.password
                    ? { required: '현재 비밀번호를 입력해주세요.' }
                    : { required: false }
                )}
              />
              <Input
                label="Password"
                type="password"
                name="newPassword"
                errMsg={errors.newPassword?.message}
                placeholder="새로운 비밀번호를 입력해주세요."
                register={register(
                  'newPassword',
                  category.password
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
                  category.password
                    ? { required: '새로운 비밀번호를 재입력해주세요.' }
                    : { required: false }
                )}
              />
            </>
          </article>
          <Btn
            onClick={() => categorySelect('password')}
            type="submit"
            loading={Boolean(data?.type === 'password' && loading)}
            btnName="SAVE"
          />
        </EditForm>
        <EditForm onSubmit={handleSubmit(onValid)}>
          <article className="layer-one">
            {data && (
              <DataResult>
                {dataConditon('userInfo_noUsername', true) && (
                  <p>유저이름 미입력시 'Anonymous'로 저장됩니다.</p>
                )}
                {dataConditon('userInfo', true) && <p>{dataOkMsg}</p>}
                {dataConditon('userInfo', false) && <p>{data?.error}</p>}
              </DataResult>
            )}
            <>
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
                  options={['남', '녀']}
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
              <Input
                label="Email"
                type="email"
                name="email"
                errMsg={errors.email?.message}
                placeholder="새로운 이메일을 입력해주세요."
                register={register('email')}
              />
            </>
          </article>
          <Btn
            onClick={() => categorySelect('userInfo')}
            type="submit"
            loading={Boolean(data?.type === 'userInfo' && loading)}
            btnName={'SAVE'}
          />
        </EditForm>
      </section>
      <Delete_Account />
    </ProEditPgCont>
  );
};

export default Profile;
