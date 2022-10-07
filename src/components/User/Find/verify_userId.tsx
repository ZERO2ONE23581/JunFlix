import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { Errors } from '../../../Tools/Errors';
import { InputWrap } from '../../../Tools/Input';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useMutation from '../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../types/user';
import { Box } from '../../../../styles/global';
import { LoadingModal } from '../../../Tools/Modal/Loading';
import { ITheme } from '../../../../styles/theme';
import { BoxTitle } from '../Create/title';
import { FindUserWrap } from '../Read/Links/Find';
import { AnimatePresence } from 'framer-motion';
import { joinBoxVar } from '../../../../styles/variants';
import styled from '@emotion/styled';
import { ErrModal } from '../../../Tools/errorModal';

interface IVerfiyID extends ITheme {
  isBox: boolean;
  setToken: Dispatch<SetStateAction<boolean>>;
}
export const VerifyUserID = ({ isBox, setToken, theme }: IVerfiyID) => {
  const [dataErr, setDataErr] = useState('');
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
        if (data.error) setDataErr(data.error);
      }, 1000);
    }
  }, [data, setToken, setDataErr, setLoading, setTimeout]);
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
              <BoxTitle theme={theme} type="verify_userId" />
              <form onSubmit={handleSubmit(onValid)}>
                <InputWrap
                  type="text"
                  id="userId"
                  theme={theme}
                  label="USER ID"
                  error={errors.userId?.message}
                  watch={watch('userId')}
                  register={register('userId', {
                    required: '아이디를 입력해주세요.',
                  })}
                />
                <Btn type="submit" theme={theme} name="Submit" />
              </form>
              <FindUserWrap />
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
  min-width: 500px;
  min-height: 50vh;
  form {
    //border: 3px solid yellow;
    gap: 10px;
    .err-msg {
      margin-top: 10px;
    }
  }
`;
