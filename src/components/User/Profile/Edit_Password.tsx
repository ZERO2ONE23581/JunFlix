import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../Btn';
import { Input } from '../../Input';
import useUser from '../../../libs/client/loggedInUser';
import useMutation from '../../../libs/client/useMutation';
import { IProfileEditForm, IProfileEditRes } from '../../../types/edit-profile';
import { Form } from '../../../../styles/components/default';

export const Edit_Password = () => {
  const { loggedInUser, loggedInUserId } = useUser();
  //POST
  const [editPassword, { loading: passwordLoading, data: passwordData }] =
    useMutation<IProfileEditRes>(
      `/api/user/${loggedInUserId}/edit/profile/password`
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
    if (loggedInUser?.userId) setValue('userId', loggedInUser?.userId);
  }, [loggedInUser]);
  //
  return (
    <>
      <Form onSubmit={handleSubmit(onValid)}>
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
        <Btn type="submit" loading={passwordLoading} btnName="SAVE" />
      </Form>
    </>
  );
};
