import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputWrap } from '../../../Tools/Input';
import useMutation from '../../../libs/client/useMutation';
import { Errors } from '../../../Tools/Errors';
import { Btn } from '../../../Tools/Button';
import { IJoinForm, IUserForm, IUserIdCheckForm } from '../../../types/user';
import styled from '@emotion/styled';
import { LoadingModal } from '../../../Tools/Modal/Loading';
import { motion } from 'framer-motion';
import { ITheme } from '../../../../styles/theme';
import { useRouter } from 'next/router';
import {
  isMemberVar,
  joinBoxVar,
  themeColorTrans,
} from '../../../../styles/variants';
import { Svg } from '../../../Tools/Svg';
import { Answer } from '../../../Tools/Modal/Answer';
import { IData } from '../../../types/global';
import { ErrModal } from '../../../Tools/errorModal';

interface IUserIdBox extends ITheme {
  setSecond: Dispatch<SetStateAction<boolean>>;
  setSaveId: Dispatch<SetStateAction<string>>;
}
export const UserIdBox = ({ theme, setSaveId, setSecond }: IUserIdBox) => {
  const router = useRouter();
  const [postUserId, { loading, data }] = useMutation<IData>(
    '/api/user/create/userId'
  );
  const {
    watch,
    register,
    setError,
    reset,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoinForm>({ mode: 'onSubmit' });

  const onValid = ({ userId }: IUserForm) => {
    if (loading) return;
    const reg = /^[A-Za-z]+[A-Za-z0-9]{5,19}$/g;
    //아이디 필요
    if (!userId) {
      setError('userId', {
        type: 'userId-req',
      });
    }
    //아이디 정규식 체크
    else if (!reg.test(userId!)) {
      setError('userId', {
        type: 'userId-pattern',
      });
    } else return postUserId(userId);
  };
  //
  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok && data.userId) {
      setSecond((p: boolean) => !p);
      setSaveId(data.userId);
    }
  }, [data, setSecond, setSaveId]);
  //
  const [answer, setAnswer] = useState(false);
  const clickTest = () => {
    clearErrors();
  };
  //
  console.log(errors.userId?.type);
  return (
    <>
      {!loading && (
        <>
          <Box
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            variants={joinBoxVar}
            //
            className="box"
          >
            <div className="box-title">
              <h1>Create Account</h1>
              <h2>
                <span>Step 1. 아이디 체크 (ID Check)</span>
                <Svg
                  size="1.3em"
                  theme={theme!}
                  type="question"
                  onClick={() => setAnswer(true)}
                />
              </h2>
            </div>
            <form onSubmit={handleSubmit(onValid)}>
              <InputWrap
                theme={theme}
                id="userId"
                type="text"
                label="USER ID"
                watch={watch('userId')}
                register={register('userId')}
              />
              <Btn name="Submit" type="submit" theme={theme} />
            </form>

            <IsMember
              className="is-member"
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
            </IsMember>
            <ErrModal
              theme={theme}
              clearErrors={clearErrors}
              type={errors.userId?.type!}
            />
          </Box>
          <Answer
            theme={theme}
            isAnswer={answer}
            type="join-userId"
            closeModal={setAnswer}
          />
        </>
      )}
      <LoadingModal isLoading={loading} theme={theme} />
    </>
  );
};
export const Box = styled(motion.div)`
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  font-size: 1.8em;
  font-size: 2em;
  padding: 40px;
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  border: 1px solid ${(p) => p.theme.color.font};
  .box-title {
    h1,
    h2 {
      display: flex;
      align-items: center;
    }
    h1 {
      font-weight: 500;
      margin-bottom: 5px;
    }
    h2 {
      display: flex;
      font-size: 0.7em;
      padding-right: 5px;
      align-items: center;
      justify-content: space-between;
    }
  }
  .userId {
    //padding: 20px;
  }
  .is-member {
    font-size: 0.7em;
  }
  form {
    input {
      border: none;
    }
    button {
      width: 100%;
      padding: 7px;
      font-size: 0.7em;
    }
  }
`;
const IsMember = styled(motion.div)`
  margin-top: 20px;
  border-radius: 5px;
  display: flex;
  cursor: pointer;
  font-size: 0.8em;
  align-items: center;
  span {
    margin-right: 5px;
    font-style: italic;
  }
`;
