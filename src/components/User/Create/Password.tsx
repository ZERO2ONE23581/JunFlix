import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import useMutation from '../../../libs/client/useMutation';
import { Errors } from '../../../Tools/Errors';
import { InputWrap } from '../../../Tools/Input';
import { IFindForm, IFindPostRes } from '../../../types/user';
import { LoadingModal } from '../../../Tools/Modal/Loading';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { ITheme } from '../../../../styles/theme';
import { BoxTitle } from '../../../Tools/Title';
import { Box } from '../../../../styles/global';
import { joinBoxVar } from '../../../../styles/variants';
import { ErrModal } from '../../../Tools/errorModal';

interface INewPassword extends ITheme {
  isBox: boolean;
  userId: string;
  setModal: Dispatch<SetStateAction<boolean>>;
}
export const NewPassword = ({
  isBox,
  theme,
  userId,
  setModal,
}: INewPassword) => {
  const [dataErr, setDataErr] = useState('');
  const [Loading, setLoading] = useState(false);
  const [create, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/login/new_password`
  );
  const {
    watch,
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFindForm>({ mode: 'onSubmit' });

  const onValid = ({ password, confirmPassword }: IFindForm) => {
    if (loading) return;
    if (!userId) return;
    if (password !== confirmPassword)
      return setError('confirmPassword', {
        message: '확인 비밀번호가 일치하지 않습니다.',
      });
    setLoading(true);
    return create({ password, userId });
  };
  //
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.ok) setModal(data.ok);
        if (data.error) setDataErr(data.error);
      }, 1000);
    }
  }, [data, setModal, setDataErr, setLoading, setTimeout]);
  console.log(data);
  return (
    <AnimatePresence>
      {isBox && (
        <>
          {!Loading && (
            <Cont
              exit="exit"
              initial="initial"
              animate="animate"
              className="loading"
              custom={theme}
              variants={joinBoxVar}
            >
              <BoxTitle theme={theme} type="new-password" />
              <form onSubmit={handleSubmit(onValid)}>
                <InputWrap
                  theme={theme}
                  id="password"
                  type="password"
                  label="New Password"
                  watch={watch('password')}
                  error={errors.password?.message}
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
                  theme={theme}
                  type="password"
                  id="confirmPassword"
                  label="Confirm Password"
                  watch={watch('confirmPassword')}
                  error={errors.confirmPassword?.message}
                  register={register('confirmPassword', {
                    required: '새 비밀번호 재입력하세요.',
                  })}
                />
                <Btn type="submit" theme={theme} name="Submit" />
              </form>
              <ErrModal error={dataErr} theme={theme} setDataErr={setDataErr} />
            </Cont>
          )}
          {Loading && <LoadingModal theme={theme} />}
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Box)`
  max-width: 35vw;
  min-width: 500px;
  min-height: 50vh;
  form {
    //border: 3px solid yellow;
    height: 100%;
    gap: 20px;
    align-items: center;
    justify-content: center;
    .err-msg {
      margin-top: 20px;
    }
  }
`;
