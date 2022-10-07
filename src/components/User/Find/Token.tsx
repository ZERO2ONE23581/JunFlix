import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { Errors } from '../../../Tools/Errors';
import { InputWrap } from '../../../Tools/Input';
import { Dispatch, SetStateAction } from 'react';
import { Box } from '../../../../styles/global';
import { LoadingModal } from '../../../Tools/Modal/Loading';
import useMutation from '../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../types/user';
import { BoxTitle } from '../Create/title';
import { ITheme } from '../../../../styles/theme';
import { FindUserWrap } from '../Read/Links/Find';
import { AnimatePresence } from 'framer-motion';
import { ErrModal } from '../../../Tools/errorModal';
import { joinBoxVar } from '../../../../styles/variants';

interface IToken extends ITheme {
  isBox: boolean;
  setUserId: Dispatch<SetStateAction<string>> | any;
  setVerify: Dispatch<SetStateAction<boolean>>;
}
export const Token = ({ isBox, setUserId, setVerify, theme }: IToken) => {
  const [dataErr, setDataErr] = useState('');
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
        if (data.error) setDataErr(data.error);
        if (data.ok) {
          setVerify(data.ok);
          setUserId(data.FoundUserID);
        }
      }, 1000);
    }
  }, [data, setVerify, setTimeout, setLoading, setDataErr]);
  //
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
              <BoxTitle type="email_token" theme={theme} />
              <form onSubmit={handleSubmit(onValid)}>
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
                <Btn theme={theme} type="submit" name="Submit" />
              </form>
              <ErrModal error={dataErr} theme={theme} setDataErr={setDataErr} />
            </Cont>
          )}
          {Loading && <LoadingModal theme={theme} />}
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Box)`
  width: 40vw;
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
