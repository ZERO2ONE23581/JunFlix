import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../Tools/Button';
import useMutation from '../../../libs/client/useMutation';
import { ErrorMsg, Errors } from '../../Tools/Errors';
import { InputWrap } from '../../Tools/Input';
import { IFindForm, IFindPostRes } from '../../../types/user';
import { Title } from './Title';
import { LoadingModal } from '../../Tools/Modal/Loading';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface ICreateNewPasswordFormProps {
  userId: string;
  setcloseModal: Dispatch<SetStateAction<boolean>>;
}
export const CreatePassword = ({
  userId,
  setcloseModal,
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
    if (data?.ok) setcloseModal(data?.ok);
  }, [data, setcloseModal]);
  return (
    <>
      {!loading && (
        <form onSubmit={handleSubmit(onValid)}>
          <Cont>
            <Title
              type="create-password"
              eng="Create Password"
              kor="새 비밀번호 생성"
            />
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
            <Btn type="submit" CLASSNAME="submit-btn" name="CREATE" />
            <Errors errors={errors} />
          </Cont>
        </form>
      )}
      {loading && <LoadingModal type="create-password" zIndex={1} />}
    </>
  );
};
const Cont = styled(motion.div)``;
