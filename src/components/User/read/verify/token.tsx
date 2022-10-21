import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../../Tools/Button';
import { InputWrap } from '../../../../Tools/Input';
import { Dispatch, SetStateAction } from 'react';
import { Box, Form } from '../../../../../styles/global';
import { LoadingModal } from '../../../../Tools/Modal/loading_modal';
import useMutation from '../../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../../types/user';
import { BoxTitle } from '../../../../Tools/box_title';
import { ITheme } from '../../../../../styles/theme';
import { AnimatePresence } from 'framer-motion';
import { MsgModal } from '../../../../Tools/msg_modal';
import { Cont } from './email';
import { variants } from '../../../../../styles/variants';

interface VerifyToken extends ITheme {
  isBox: boolean;
  titleType: string;
  setUserId: Dispatch<SetStateAction<string>>;
  setVerify: Dispatch<SetStateAction<boolean>>;
}
export const VerifyToken = ({
  isBox,
  theme,
  titleType,
  setUserId,
  setVerify,
}: VerifyToken) => {
  const [msg, setMsg] = useState('');
  const [Loading, setLoading] = useState(false);
  const [verifyToken, { loading, data }] = useMutation<IFindPostRes>(
    `/api/user/login/verify/token`
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFindForm>({ mode: 'onSubmit' });

  const onValid = ({ token }: IFindForm) => {
    setLoading(true);
    if (loading) return;
    return verifyToken(token);
  };
  //
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) setMsg(data.error);
        if (data.ok) {
          setVerify(data.ok);
          setUserId(data.FoundUserID!);
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
          <BoxTitle type={titleType} theme={theme} />
          <Form onSubmit={handleSubmit(onValid)}>
            <InputWrap
              id="token"
              type="number"
              theme={theme}
              label="Token Number"
              watch={watch('token')}
              error={errors.token?.message}
              register={register('token', {
                required: '6자리 토큰번호를 입력하세요.',
                maxLength: {
                  value: 6,
                  message:
                    '인증번호는 6자리 숫자입니다. 이메일을 확인해주세요.',
                },
              })}
            />
            <Btn item={{ theme, name: 'Submit' }} type="submit" />
          </Form>
        </Cont>
      )}
      <MsgModal
        msg={msg}
        theme={theme}
        Loading={isBox && Loading}
        closeModal={() => setMsg('')}
      />
      {isBox && Loading && <LoadingModal theme={theme} />}
    </AnimatePresence>
  );
};
