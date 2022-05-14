import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { Error, Input } from '../../src/components/Input';
import useMutation from '../../src/libs/client/useMutation';
import { Container } from '../../styles/global';
import { Form } from '../../styles/join-style';

interface IProfileEditRes {
  ok: boolean;
  error?: string;
}
interface IProfileEditForm {
  userId: string;
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

const Profile: NextPage = () => {
  //Post
  const [postEdit, { loading, data }] =
    useMutation<IProfileEditRes>(`/api/user/profile`);

  console.log(data);

  //Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileEditForm>({ mode: 'onSubmit' });
  //
  const onValid = (formData: IProfileEditForm) => {
    if (loading) return;
    postEdit(formData);
  };
  //
  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(onValid)}>
          {data?.error && <Error>{data?.error}</Error>}
          <Input
            label="ID"
            type="text"
            name="userId"
            errMsg={errors.userId?.message}
            placeholder="수정할 아이디를 입력해주세요."
            register={register('userId', {
              required: '수정할 아이디를 입력해주세요.',
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
          <Btn type="submit" loading={loading} btnName="수정사항 저장" />
        </Form>
      </Container>
    </>
  );
};

export default Profile;
