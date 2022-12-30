import { Title } from './Title';
import styled from '@emotion/styled';
import { FindUser } from '../../Find';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../../Tools/Button';
import { IRes } from '../../../../types/global';
import { AnimatePresence } from 'framer-motion';
import { IUserForm } from '../../../../types/user';
import { InputWrap } from '../../../../Tools/Input';
import { ErrTxt } from '../../../../Tools/ErrTxt';
import { Box, Form } from '../../../../../styles/global';
import { variants } from '../../../../../styles/variants';
import { MsgModal } from '../../../../Tools/Modal/Message';
import useMutation from '../../../../libs/client/useMutation';
import { LoadingModal } from '../../../../Tools/Modal/Loading';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IVerfiyID {
  _data: {
    isBox: boolean;
    theme: boolean;
    layoutId: string;
    setToken: Dispatch<SetStateAction<boolean>>;
  };
}
export const VerifyID = ({ _data }: IVerfiyID) => {
  const [msg, setMsg] = useState('');
  const [Loading, setLoading] = useState(false);
  const { isBox, setToken, theme, layoutId } = _data;
  const [POST, { loading, data }] = useMutation<IRes>(
    `/api/user/verify/userId`
  );
  const {
    watch,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });

  const onValid = ({ userId }: IUserForm) => {
    setLoading(true);
    if (loading) return;
    return POST({ userId });
  };
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
          <>
            <Cont
              exit="exit"
              initial="initial"
              animate="animate"
              className="box"
              custom={theme}
              variants={variants}
            >
              <Title theme={theme} type="password" />
              <Form onSubmit={handleSubmit(onValid)}>
                <InputWrap
                  _data={{
                    theme,
                    clearErrors,
                    id: 'userId',
                    type: 'text',
                    label: 'ID',
                    text: watch('userId')!,
                    register: register('userId', { required: 'need_userId' }),
                  }}
                />
                <ErrTxt theme={theme} error={errors.userId?.message!} />
                <Btn item={{ theme, name: 'Submit' }} type="submit" />
              </Form>
              <FindUser theme={theme} />
            </Cont>
          </>
        )}
        <MsgModal _data={{ msg, theme, layoutId }} />
        {isBox && Loading && <LoadingModal theme={theme} />}
      </>
    </AnimatePresence>
  );
};
const Cont = styled(Box)``;
