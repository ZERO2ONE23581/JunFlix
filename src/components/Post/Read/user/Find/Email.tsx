import { useForm } from 'react-hook-form';
import { Btn } from '../../../../../Tools/Button';
import { InputWrap } from '../../../../../Tools/Input';
import { ErrorMsg } from '../../../../../Tools/Errors';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useMutation from '../../../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../../../types/user';
import styled from '@emotion/styled';
import { Box } from '../../../../../../styles/global';
import { LoadingModal } from '../../../../../Tools/Modal/loading';
import { FindUserWrap } from '../Links/Find';
import { ITheme } from '../../../../../../styles/theme';
import { BoxTitle } from '../../../../../Tools/Title';
import { AnimatePresence } from 'framer-motion';
import { MessageModal } from '../../../../../Tools/msg_modal';
import { joinBoxVar } from '../../../../../../styles/variants';

interface IEmail extends ITheme {
  isBox: boolean;
  setToken: Dispatch<SetStateAction<boolean>>;
}
export const Email = ({ isBox, theme, setToken }: IEmail) => {
  const [dataErr, setDataErr] = useState('');
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
        if (data.error) setDataErr(data.error);
        if (data.ok) setToken(data.ok);
      }, 1000);
    }
  }, [data, setToken, setDataErr, setLoading, setTimeout]);

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
                variants={joinBoxVar}
              >
                <BoxTitle theme={theme} type="find_userId" />
                <form onSubmit={handleSubmit(onValid)}>
                  <InputWrap
                    id="email"
                    type="text"
                    label="Email"
                    theme={theme}
                    watch={watch('email')}
                    error={errors.email?.message}
                    register={register('email', {
                      required: '이메일을 입력하세요.',
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: '이메일 형식이 올바르지 않습니다.',
                      },
                    })}
                  />
                  <Btn theme={theme} type="submit" name="SUBMIT" />
                </form>
                <FindUserWrap />
              </Cont>
              <MessageModal
                error={dataErr}
                theme={theme}
                setDataErr={setDataErr}
              />
            </>
          )}
          {Loading && <LoadingModal theme={theme} />}
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Box)`
  width: 40vw;
  height: 50vh;
  form {
    //border: 3px solid yellow;
    height: 100%;
    gap: 10px;
    align-items: center;
    justify-content: center;
    .err-msg {
      margin-top: 10px;
    }
  }
`;
