import { BoxTitle } from './Title';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { IData } from '../../../types/global';
import { InputWrap } from '../../../Tools/Input';
import { ITheme } from '../../../../styles/theme';
import { ErrModal } from '../../../Tools/errorModal';
import useMutation from '../../../libs/client/useMutation';
import { IJoinForm, IUserForm } from '../../../types/user';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { isMemberVar, joinBoxVar } from '../../../../styles/variants';
import { Box } from '../../../../styles/global';
import { LoadingModal } from '../../../Tools/Modal/Loading';

interface IUserIdBox extends ITheme {
  isBox: boolean;
  setSaveID: Dispatch<SetStateAction<string>>;
  setNext: Dispatch<SetStateAction<boolean>>;
}
export const UserIdBox = ({ theme, isBox, setSaveID, setNext }: IUserIdBox) => {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const [postUserId, { loading, data }] = useMutation<IData>(
    '/api/user/create/userId'
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoinForm>({ mode: 'onSubmit' });

  const onValid = ({ userId }: IUserForm) => {
    setLoading(true);
    if (loading) return;
    postUserId(userId);
  };

  //data result
  const [dataErr, setDataErr] = useState('');
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      if (data.error) {
        setTimeout(() => {
          setDataErr(data.error!);
        }, 1000);
      }
      if (data.ok && data.userId) {
        setTimeout(() => {
          setNext(true);
          setSaveID(data.userId);
        }, 1000);
      }
    }
  }, [data, setNext, setSaveID, setDataErr, errors, setLoading]);
  //
  return (
    <AnimatePresence initial={false}>
      {isBox && (
        <>
          {!Loading && (
            <>
              <Cont
                className="box"
                exit="exit"
                initial="initial"
                animate="animate"
                custom={theme}
                variants={joinBoxVar}
              >
                <div className="wrapper">
                  <BoxTitle type="userId" theme={theme} />
                  <form onSubmit={handleSubmit(onValid)}>
                    <InputWrap
                      id="userId"
                      type="text"
                      theme={theme}
                      label="USER ID"
                      watch={watch('userId')}
                      register={register('userId', {
                        required: '아이디를 입력해주세요.',
                        pattern: {
                          value: /^[A-Za-z]+[A-Za-z0-9]{5,19}$/g,
                          message:
                            '아이디는 기호를 제외한 영문자 또는 6~20자리 숫자를 포함해야합니다.',
                        },
                      })}
                      error={errors.userId?.message}
                    />
                    <Btn name="Submit" type="submit" theme={theme} />
                  </form>
                </div>

                <LoginLink
                  className="login-link"
                  custom={theme}
                  initial="initial"
                  animate="animate"
                  variants={isMemberVar}
                  whileHover={'hover'}
                  onClick={() => router.push(`/login`)}
                >
                  <span>* 이미 회원입니까?</span>
                  <span>Already a member?</span>
                  <span>&rarr;</span>
                </LoginLink>
              </Cont>
              <ErrModal error={dataErr} theme={theme} setDataErr={setDataErr} />
            </>
          )}
          {Loading && <LoadingModal theme={theme} />}
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Box)`
  width: 420px;
  .wrapper {
    gap: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  form {
    //border: 1px solid yellow;
    .input-wrap {
      width: 100%;
      .err-msg {
        margin-top: 15px;
      }
    }
    button {
      width: 100%;
      padding: 8px;
      margin-top: 15px;
      font-size: 0.6em;
    }
  }
  .login-link {
    font-size: 1.1rem;
    // border: 2px solid red;
  }
`;
const LoginLink = styled(motion.div)`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  span {
    margin-right: 5px;
    font-style: italic;
  }
`;
