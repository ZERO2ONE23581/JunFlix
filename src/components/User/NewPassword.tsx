import { FindUser } from './Find';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Btn } from '../../Tools/Button';
import { IRes } from '../../types/global';
import { IUserForm } from '../../types/user';
import { InputWrap } from '../../Tools/Input';
import { AnimatePresence } from 'framer-motion';
import { MsgModal } from '../../Tools/Modal/Message';
import { Box, Form } from '../../../styles/global';
import { ErrTxt } from '../../Tools/ErrTxt';
import { variants } from '../../../styles/variants';
import useMutation from '../../libs/client/useMutation';
import { LoadingModal } from '../../Tools/Modal/Loading';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Title } from './Title';

interface INewPassword {
  _data: {
    isBox: boolean;
    theme: boolean;
    userId: string;
    layoutId: string;
    setModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const NewPassord = ({ _data }: INewPassword) => {
  const [msg, setMsg] = useState('');
  const [Loading, setLoading] = useState(false);
  const { isBox, theme, userId, layoutId, setModal } = _data;
  const [POST, { loading, data }] = useMutation<IRes>(
    `/api/user/create/new_pw`
  );
  const {
    watch,
    setError,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });

  const onValid = ({ password, password_confirm }: IUserForm) => {
    if (loading) return;
    if (!userId) return;
    const isMatch = Boolean(password === password_confirm);
    if (!isMatch)
      return setError('password_confirm', { message: 'pw_unmatch' });
    setLoading(true);
    return POST({ password, password_confirm, userId });
  };
  //
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.ok) setModal(data.ok);
        if (data.error) setMsg(data.error);
      }, 1000);
    }
  }, [data, setModal, setMsg, setLoading, setTimeout]);

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
            <Title theme={theme} type="new_password" />
            <Form onSubmit={handleSubmit(onValid)}>
              <InputWrap
                _data={{
                  theme,
                  clearErrors,
                  id: 'password',
                  type: 'password',
                  label: 'New Password',
                  text: watch('password')!,
                  register: register!('password', {
                    required: 'need_password',
                    minLength: { value: 8, message: 'min_password' },
                    maxLength: { value: 16, message: 'max_password' },
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/,
                      message: 'invalid_password',
                    },
                  }),
                }}
              />
              <ErrTxt theme={theme} error={errors.password?.message!} />
              <InputWrap
                _data={{
                  theme,
                  clearErrors,
                  type: 'password',
                  label: 'Confirm',
                  id: 'password_confirm',
                  text: watch('password_confirm')!,
                  register: register('password_confirm', {
                    required: 'need_password_confirm',
                  }),
                }}
              />
              <ErrTxt theme={theme} error={errors.password_confirm?.message!} />
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
