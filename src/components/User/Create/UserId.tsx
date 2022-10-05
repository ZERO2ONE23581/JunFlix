import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputWrap } from '../../Tools/Input';
import useMutation from '../../../libs/client/useMutation';
import { Errors } from '../../Tools/Errors';
import { Btn } from '../../Tools/Button';
import { IUserIdCheckForm, IUserIdCheckRes } from '../../../types/user';
import { LoginLink } from '../Read/Links/Login';
import styled from '@emotion/styled';
import { LoadingModal } from '../../Tools/Modal/Loading';
import { motion } from 'framer-motion';
import { ITheme } from '../../../../styles/theme';

interface ICreateId extends ITheme {
  setSecond: Dispatch<SetStateAction<boolean>>;
  setSaveId: Dispatch<SetStateAction<string>>;
}
export const CreateId = ({ theme, setSaveId, setSecond }: ICreateId) => {
  const [checkUserId, { loading, data }] = useMutation<IUserIdCheckRes>(
    '/api/user/check/user_id'
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserIdCheckForm>({
    mode: 'onSubmit',
  });
  const onValid = ({ userId }: IUserIdCheckForm) => {
    if (loading) return;
    checkUserId(userId.toUpperCase());
  };
  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok && data.userId) {
      setSecond((p: boolean) => !p);
      setSaveId(data.userId);
    }
  }, [data, setSecond, setSaveId]);

  return (
    <>
      {!loading && (
        <form onSubmit={handleSubmit(onValid)}>
          <Cont className="box">
            <h1>
              <span>Create Account</span>
              <span>Step 1. 아이디 체크 (Check your ID)</span>
            </h1>

            <InputWrap
              theme={theme}
              id="userId"
              type="text"
              label="USER ID"
              watch={watch('userId')}
              register={register('userId', {
                required: '아이디를 입력해주세요.',
                pattern: {
                  value: /^[A-Za-z]+[A-Za-z0-9]{5,19}$/g,
                  message:
                    '* 아이디는 기호를 제외한 영문자 또는 6~20자리 숫자를 포함해야합니다.',
                },
              })}
            />
            <Btn name="Check" type="submit" CLASSNAME="submit" />
            <LoginLink />
            <Errors errors={errors} />
          </Cont>
        </form>
      )}
      {loading && <LoadingModal type="loading" zIndex={1} />}
    </>
  );
};
const Cont = styled(motion.div)``;
