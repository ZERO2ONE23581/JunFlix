import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { InputWrap } from '../../../Tools/Input';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useMutation from '../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../types/user';
import { Box, Form } from '../../../../styles/global';
import { LoadingModal } from '../../../Tools/Modal/loading';
import { ITheme } from '../../../../styles/theme';
import { BoxTitle } from '../../../Tools/Title';
import { FindUserWrap } from '../../post/Read/user/Links/Find';
import { AnimatePresence } from 'framer-motion';
import { joinBoxVar } from '../../../../styles/variants';
import styled from '@emotion/styled';
import { MessageModal } from '../../../Tools/msg_modal';
import { Cont } from './email';

interface IVerfiyID extends ITheme {
  isBox: boolean;
  setToken: Dispatch<SetStateAction<boolean>>;
}
export const VerifyUserID = ({ isBox, setToken, theme }: IVerfiyID) => {
  const [message, setMessage] = useState('');
  const [Loading, setLoading] = useState(false);
  const [verifyUserId, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/login/verify/user_id`
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFindForm>({ mode: 'onSubmit' });

  const onValid = ({ userId }: IFindForm) => {
    setLoading(true);
    if (loading) return;
    return verifyUserId(userId);
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
            <Cont
              exit="exit"
              initial="initial"
              animate="animate"
              className="loading"
              custom={theme}
              variants={joinBoxVar}
            >
              <BoxTitle theme={theme} type="verify-userId" />
              <Form onSubmit={handleSubmit(onValid)}>
                <InputWrap
                  type="text"
                  id="userId"
                  theme={theme}
                  label="USER ID"
                  error={errors.userId?.message}
                  watch={Boolean(watch('userId'))}
                  register={register('userId', {
                    required: '아이디를 입력해주세요.',
                  })}
                />
                <Btn type="submit" theme={theme} name="Submit" />
              </Form>
              <FindUserWrap />
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
