import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../Tools/Button';
import { Form } from '../../../../styles/global';
import useMutation from '../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../types/login';
import { ErrorMsg } from '../../Tools/ErrMsg';
import { InputWrap } from '../../Tools/Input';
import { Heading } from './Heading';

interface ICreateNewPasswordFormProps {
  userId: string;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}
export const CreatePassword = ({
  userId,
  setOpenModal,
}: ICreateNewPasswordFormProps) => {
  const [create, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/login/create/new_password`
  );
  const {
    watch,
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFindForm>({ mode: 'onSubmit' });
  const onValid = ({ password, confirmPassword }: IFindForm) => {
    if (!userId) return;
    if (password !== confirmPassword)
      return setError('confirmPassword', {
        message: '확인 비밀번호가 일치하지 않습니다.',
      });
    return create({ password, userId });
  };
  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok) setOpenModal(data?.ok);
  }, [data, setOpenModal]);
  return (
    <>
      <Heading
        type="newPassword"
        h1="Find Password (비밀번호 찾기)"
        h2="Step 3. Create New Password (새 비밀번호 만들기)"
      />
      <Form onSubmit={handleSubmit(onValid)}>
        <InputWrap
          id="password"
          type="password"
          label="New Password"
          watch={watch('password')}
          register={register('password', {
            required: '새 비밀번호 입력하세요.',
            minLength: {
              value: 8,
              message: '비밀번호는 최소 8자리여야 합니다.',
            },
            maxLength: {
              value: 16,
              message: '비밀번호는 최대 16자리여야 합니다.',
            },
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/,
              message:
                '비밀번호는 최소 1개이상의 숫자, 문자, 정의된 특수문자를 포함해야 합니다.',
            },
          })}
        />
        <InputWrap
          type="password"
          id="confirmPassword"
          label="Confirm Password"
          watch={watch('confirmPassword')}
          register={register('confirmPassword', {
            required: '새 비밀번호 재입력하세요.',
          })}
        />
        <Btn type="submit" loading={loading} name="새로운 비밀번호 만들기" />
      </Form>
      {errors.password && <ErrorMsg error={errors.password?.message} />}
      {errors.confirmPassword && (
        <ErrorMsg error={errors.confirmPassword?.message} />
      )}
    </>
  );
};
