import { Title } from './User/Title';
import styled from '@emotion/styled';
import { FindUser } from './User/Find';
import { useForm } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import { Btn } from '../Tools/Button';
import { IRes } from '../types/global';
import { IUserForm } from '../types/user';
import { InputWrap } from '../Tools/Input';
import { MsgModal } from '../Tools/Modal/Message';
import { Box, Form } from '../../styles/global';
import { ErrTxt } from '../Tools/ErrTxt';
import { variants } from '../../styles/variants';
import useMutation from '../libs/client/useMutation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LoadingModal } from '../Tools/Modal/Loading';

interface IVerifyEmail {
  _data: {
    isBox: boolean;
    theme: boolean;
    layoutId: string;
    setToken: Dispatch<SetStateAction<boolean>>;
  };
}
export const VerifyEmail = ({ _data }: IVerifyEmail) => {
  const [msg, setMsg] = useState('');
  const [Loading, setLoading] = useState(false);
  const { isBox, theme, layoutId, setToken } = _data;
  const [post, { loading, data }] = useMutation<IRes>(`/api/user/verify/email`);
  const {
    watch,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });

  const onValid = ({ email }: IUserForm) => {
    setLoading(true);
    if (loading) return;
    return post({ email });
  };
  //
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.ok) setToken(data.ok);
        if (data.error) setMsg(data.error);
      }, 1000);
    }
  }, [data, setToken, setMsg, setLoading, setTimeout]);
  return (
    <AnimatePresence>
      <>
        {isBox && !Loading && (
          <Cont
            exit="exit"
            className="box"
            initial="initial"
            animate="animate"
            custom={theme}
            variants={variants}
          >
            <Title theme={theme} type="email" />
            <Form onSubmit={handleSubmit(onValid)}>
              <InputWrap
                _data={{
                  theme,
                  clearErrors,
                  id: 'email',
                  type: 'text',
                  label: 'Email',
                  text: watch('email'),
                  register: register('email', {
                    required: 'need_email',
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: '이메일 형식이 올바르지 않습니다.',
                    },
                  }),
                }}
              />
              <ErrTxt theme={theme} error={errors.email?.message!} />
              <Btn item={{ theme, name: 'Submit' }} type="submit" />
            </Form>
            <FindUser theme={theme} />
          </Cont>
        )}
        <MsgModal _data={{ msg, theme, layoutId }} />
        {isBox && Loading && <LoadingModal theme={theme} />}
      </>
    </AnimatePresence>
  );
};
const Cont = styled(Box)``;
