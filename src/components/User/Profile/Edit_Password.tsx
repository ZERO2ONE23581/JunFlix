import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrMsg, Form } from '../../../../styles/global-style';
import { InputWrap } from '../../../../styles/profileEdit-style';
import useUser from '../../../libs/client/loggedInUser';
import useMutation from '../../../libs/client/useMutation';
import { IProfileEditForm, IProfileEditRes } from '../../../types/edit-profile';
import { Btn } from '../../Btn';
import { Input } from '../../Input';

export const Edit_Password = () => {
  //Get
  const { loggedInUser } = useUser();

  //Post
  const postType = 'password';
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
    setError,
    reset,
  } = useForm<IProfileEditForm>({ mode: 'onSubmit' });
  //
  const onValid = ({
    oldPassword,
    newPassword,
    newPasswordConfirm,
  }: IProfileEditForm) => {
    if (loading) return;
    if (newPassword !== newPasswordConfirm)
      return setError('newPasswordConfirm', {
        message: '비밀번호가 일치하지 않습니다.',
      });
    postEdit({ postType, oldPassword, newPassword, newPasswordConfirm });
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
        <Form onSubmit={handleSubmit(onValid)}>
          {message && <ErrMsg>{data?.}</ErrMsg>}
          {data?.error && <ErrMsg>{data?.error}</ErrMsg>}
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
          <InputWrap>
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
          </InputWrap>

          <Btn type="submit" loading={loading} btnName="SAVE" />
        </Form>
      </>
    </>
  );
};
