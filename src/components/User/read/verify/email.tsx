import { useForm } from 'react-hook-form';
import { Btn } from '../../../../Tools/Button';
import { InputWrap } from '../../../../Tools/Input';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useMutation from '../../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../../types/user';
import styled from '@emotion/styled';
import { Box, Form } from '../../../../../styles/global';
import { LoadingModal } from '../../../../Tools/Modal/loading_modal';
import { ITheme } from '../../../../../styles/theme';
import { BoxTitle } from '../../../../Tools/box_title';
import { AnimatePresence } from 'framer-motion';
import { MessageModal } from '../../../../Tools/msg_modal';
import { variants } from '../../../../../styles/variants';

interface IVerifyEmail extends ITheme {
  isBox: boolean;
  setToken: Dispatch<SetStateAction<boolean>>;
}
export const VerifyEmail = ({ isBox, theme, setToken }: IVerifyEmail) => {
  const [message, setMessage] = useState('');
  const [Loading, setLoading] = useState(false);
  const [verify, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/login/verify/email`
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFindForm>({ mode: 'onSubmit' });

  const onValid = ({ email }: IFindForm) => {
    setLoading(true);
    if (loading) return;
    return verify(email);
  };
  //
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.ok) setToken(data.ok);
        if (data.error) setMessage(data.error);
      }, 1000);
    }
  }, [data, setToken, setMessage, setLoading, setTimeout]);

  return (
    <AnimatePresence>
      {isBox && (
        <>
          {!Loading && (
            <>
              <Cont
                exit="exit"
                initial="initial"
                animate="animate"
                className="loading"
                custom={theme}
                variants={variants}
              >
                <BoxTitle theme={theme} type="verify-email" />
                <Form onSubmit={handleSubmit(onValid)}>
                  <InputWrap
                    id="email"
                    type="text"
                    label="Email"
                    theme={theme}
                    error={errors.email?.message}
                    watch={Boolean(watch('email'))}
                    register={register('email', {
                      required: '이메일을 입력하세요.',
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: '이메일 형식이 올바르지 않습니다.',
                      },
                    })}
                  />
                  <Btn item={{ theme, name: 'Submit' }} type="submit" />
                </Form>
              </Cont>
              <MessageModal
                theme={theme}
                message={message}
                setMessage={setMessage}
              />
            </>
          )}
          {Loading && <LoadingModal theme={theme} />}
        </>
      )}
    </AnimatePresence>
  );
};
export const Cont = styled(Box)`
  gap: 20px;
  form {
    gap: 20px;
    .input-wrap {
      gap: 20px;
    }
  }
`;
