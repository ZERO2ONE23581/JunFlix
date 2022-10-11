import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { BoxTitle } from '../../../Tools/Title';
import { AnimatePresence } from 'framer-motion';
import { Box, Form } from '../../../../styles/global';
import { InputWrap } from '../../../Tools/Input';
import { ITheme } from '../../../../styles/theme';
import { MessageModal } from '../../../Tools/msg_modal';
import { joinBoxVar } from '../../../../styles/variants';
import useMutation from '../../../libs/client/useMutation';
import { LoadingModal } from '../../../Tools/Modal/loading';
import { IFindPostRes, IUserForm } from '../../../types/user';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ICreatePassword extends ITheme {
  isBox: boolean;
  userId: string;
  setModal: Dispatch<SetStateAction<boolean>>;
}
export const CreatePassword = ({
  isBox,
  theme,
  userId,
  setModal,
}: ICreatePassword) => {
  const [message, setMessage] = useState('');
  const [Loading, setLoading] = useState(false);
  const [create, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/create/password`
  );
  const {
    watch,
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });

  const onValid = ({ password, pw_confirm }: IUserForm) => {
    if (loading) return;
    if (!userId) return;
    if (password !== pw_confirm)
      return setError('pw_confirm', {
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
        if (data.error) setMessage(data.error);
      }, 1000);
    }
  }, [data, setModal, setMessage, setLoading, setTimeout]);

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
              <BoxTitle theme={theme} type="create-password" />
              <Form onSubmit={handleSubmit(onValid)}>
                <InputWrap
                  theme={theme}
                  id="password"
                  type="password"
                  label="New Password"
                  watch={Boolean(watch('password'))}
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
                  id="pw_confirm"
                  label="Confirm Password"
                  error={errors.pw_confirm?.message}
                  watch={Boolean(watch('pw_confirm'))}
                  register={register('pw_confirm', {
                    required: '새 비밀번호 재입력하세요.',
                  })}
                />
                <Btn type="submit" theme={theme} name="Submit" />
              </Form>
              <MessageModal
                theme={theme}
                message={message}
                setMessage={setMessage}
              />
            </Cont>
          )}
          {Loading && <LoadingModal theme={theme} />}
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Box)`
  width: 500px;
  form {
    gap: 15px;
    .input-wrap {
      gap: 15px;
    }
  }
`;
