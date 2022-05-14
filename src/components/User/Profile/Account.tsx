import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { Error, Form } from '../../../../styles/global-style';
import { AccountEditForm } from '../../../../styles/profileEdit-style';
import useUser from '../../../libs/client/loggedInUser';
import useMutation from '../../../libs/client/useMutation';
import { IProfileEditForm, IProfileEditRes } from '../../../types/edit-profile';
import { ILoggedInUser } from '../../../types/login';
import { Btn } from '../../Btn';
import { Input } from '../../Input';

export const Account = () => {
  //Get
  const { loggedInUser } = useUser();

  //Post
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
    reset,
  } = useForm<IProfileEditForm>({ mode: 'onSubmit' });
  //
  const onValid = (formData: IProfileEditForm) => {
    if (loading) return;
    postEdit(formData);
    setMessage(true);
    reset({ newPassword: '', newPasswordConfirm: '', oldPassword: '' });
  };

  //Set up
  useEffect(() => {
    if (loggedInUser?.userId) setValue('userId', loggedInUser?.userId);
    if (data?.ok) setMessage(false);
  }, [loggedInUser]);
  //
  return (
    <>
      <>
        <AccountEditForm onSubmit={handleSubmit(onValid)}>
          {message && <Error>{data?.message}</Error>}
          {data?.error && <Error>{data?.error}</Error>}
          <Input
            label="ID"
            type="text"
            name="userId"
            errMsg={errors.userId?.message}
            placeholder="새로운 아이디를 입력해주세요."
            register={register('userId', {
              required: '새로운 아이디를 입력해주세요.',
            })}
          />
          <Input
            label="Old Password"
            type="password"
            name="oldPassword"
            errMsg={errors.oldPassword?.message}
            placeholder="현재 비밀번호를 입력해주세요."
            register={register('oldPassword', {
              required: '현재 비밀번호를 입력해주세요.',
            })}
          />
          <div className="input-wrap">
            <Input
              label="Password"
              type="password"
              name="newPassword"
              errMsg={errors.newPassword?.message}
              placeholder="새로운 비밀번호를 입력해주세요."
              register={register('newPassword', {
                required: '새로운 비밀번호를 입력해주세요.',
              })}
            />
            <Input
              label="Password Confirm"
              type="password"
              name="newPasswordConfirm"
              errMsg={errors.newPasswordConfirm?.message}
              placeholder="새로운 비밀번호를 재입력해주세요."
              register={register('newPasswordConfirm', {
                required: '새로운 비밀번호를 재입력해주세요.',
              })}
            />
          </div>
          <Btn type="submit" loading={loading} btnName="SAVE" />
        </AccountEditForm>
      </>
    </>
  );
};