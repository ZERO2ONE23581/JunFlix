import { Title } from '../Title';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../../../Tools/Button';
import { AnimatePresence } from 'framer-motion';
import { InputWrap } from '../../../../../Tools/Input';
import { MsgModal } from '../../../../../Tools/msg_modal';
import { ErrMsg } from '../../../../../Tools/Error/Message';
import { variants } from '../../../../../../styles/variants';
import useMutation from '../../../../../libs/client/useMutation';
import { IFindPostRes, IUserForm } from '../../../../../types/user';
import { Box, Form } from '../../../../../../styles/global';
import { LoadingModal } from '../../../../../Tools/Modal/loading_modal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IVerifyEmail {
  _data: {
    isBox: boolean;
    theme: boolean;
    layoutId: string;
    setToken: Dispatch<SetStateAction<boolean>>;
  };
}
export const Email = ({ _data }: IVerifyEmail) => {
  const [msg, setMsg] = useState('');
  const [Loading, setLoading] = useState(false);
  const { isBox, theme, layoutId, setToken } = _data;
  const [post, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/verify/email`
  );
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
      {isBox && !Loading && (
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          className="loading"
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
                label: 'email',
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
            <ErrMsg theme={theme} error={errors.email?.message!} />
            <Btn item={{ theme, name: 'Submit' }} type="submit" />
          </Form>
        </Cont>
      )}
      {isBox && Loading && <LoadingModal theme={theme} />}
      <MsgModal _data={{ msg, theme, layoutId }} />
    </AnimatePresence>
  );
};
const Cont = styled(Box)`
  max-width: 500px;
`;
