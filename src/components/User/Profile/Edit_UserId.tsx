import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Error, Form } from '../../../../styles/global-style';
import useUser from '../../../libs/client/loggedInUser';
import useMutation from '../../../libs/client/useMutation';
import { IProfileEditForm, IProfileEditRes } from '../../../types/edit-profile';
import { Btn } from '../../Btn';
import { Input } from '../../Input';

export const Edit_UserId = () => {
  //Get
  const { loggedInUser } = useUser();

  //Post
  const postType = 'userId';
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
    // if (!userId) setError('userId', { message: '아이디를 입력해주세요.' });
    const userID = userId?.toUpperCase();
    postEdit({ userID, postType });
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
          {message && <Error>{data?.message}</Error>}
          {data?.error && <Error>{data?.error}</Error>}
          <Input
            label="ID"
            type="text"
            name="userId"
            errMsg={errors.userId?.message}
            placeholder="새로운 아이디를 입력해주세요."
            register={register('userId')}
            // register={register('userId', {
            //   required: '새로운 아이디를 입력해주세요.',
            // })}
          />
          <Btn type="submit" loading={loading} btnName="SAVE" />
        </Form>
      </>
    </>
  );
};
