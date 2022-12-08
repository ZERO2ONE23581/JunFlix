import { Title } from './Title';
import styled from '@emotion/styled';
import { FindUser } from '../../Find';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Btn } from '../../../../Tools/Button';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { InputWrap } from '../../../../Tools/Input';
import { MsgModal } from '../../../../Tools/msg_modal';
import { Box, Form } from '../../../../../styles/global';
import { ErrMsg } from '../../../../Tools/Error/Message';
import { variants } from '../../../../../styles/variants';
import useMutation from '../../../../libs/client/useMutation';
import { IFindID, IUserForm } from '../../../../types/user';
import { LoadingModal } from '../../../../Tools/Modal/loading_modal';

interface VerifyToken {
  _data: {
    type: string;
    isBox: boolean;
    theme: boolean;
    layoutId: string;
    setUserId: Dispatch<SetStateAction<string>>;
    setVerify: Dispatch<SetStateAction<boolean>>;
  };
}
export const Token = ({ _data }: VerifyToken) => {
  const [msg, setMsg] = useState('');
  const [Loading, setLoading] = useState(false);
  const { isBox, theme, type, setUserId, setVerify, layoutId } = _data;
  const [post, { loading, data }] = useMutation<IFindID>(
    `/api/user/verify/token`
  );
  const {
    watch,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });

  const onValid = ({ token }: IUserForm) => {
    setLoading(true);
    if (loading) return;
    const digits = Number(token);
    return post({ digits });
  };
  //
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) setMsg(data.error);
        if (data.ok) {
          setVerify(data.ok);
          setUserId(data.found!);
        }
      }, 1000);
    }
  }, [data, setVerify, setTimeout, setLoading, setMsg]);
  //
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
          <Title theme={theme} type={type} />
          <Form onSubmit={handleSubmit(onValid)}>
            <InputWrap
              _data={{
                theme,
                clearErrors,
                id: 'token',
                type: 'number',
                label: 'Token',
                text: watch('token')!,
                register: register('token', {
                  required: 'need_token',
                  maxLength: { value: 6, message: 'max_token' },
                }),
              }}
            />
            <ErrMsg error={errors.token?.message!} theme={theme} />
            <Btn item={{ theme, name: 'Submit' }} type="submit" />
          </Form>
          <FindUser theme={theme} />
        </Cont>
      )}
      <MsgModal _data={{ msg, theme, layoutId }} />
      {isBox && Loading && <LoadingModal theme={theme} />}
    </AnimatePresence>
  );
};
const Cont = styled(Box)`
  max-width: 500px;
`;
