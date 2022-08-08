import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { InputWrap } from '../../../Tools/Input';
import { Errors } from '../../../Tools/Errors';
import { Dispatch, SetStateAction } from 'react';
import useMutation from '../../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../../types/user';
import styled from '@emotion/styled';
import { Title } from '../../Create/Title';
import { Box } from '../../../../../styles/global';
import { LoadingModal } from '../../../Tools/Modal/Loading';
import { FindLink } from '../Links/Find';

interface IToken {
  isFindID?: boolean;
  isFindPW?: boolean;
  setUserId: Dispatch<SetStateAction<string>> | any;
  setConfirm: Dispatch<SetStateAction<boolean>>;
}
export const Token = ({
  isFindID,
  isFindPW,
  setUserId,
  setConfirm,
}: IToken) => {
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
    if (loading) return;
    return verifyToken(token);
  };
  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok) {
      setConfirm(data.ok);
      setUserId(data.FoundUserID);
    }
  }, [data, setConfirm]);
  return (
    <>
      {!loading && (
        <form onSubmit={handleSubmit(onValid)}>
          <Cont>
            <Title
              type="verify-token"
              kor={isFindID ? '아이디 찾기' : isFindPW ? '비밀번호 찾기' : ''}
              eng={isFindID ? 'Find ID' : isFindPW ? 'Find Password' : ''}
            />
            <h2>
              <span>Step 2.</span>
              <span className="kor">토큰 확인</span>
              <span>Confirm Token</span>
            </h2>
            <InputWrap
              watch={watch('token')}
              id="token"
              type="number"
              label="Token Number"
              register={register('token', {
                required: '6자리 토큰번호를 입력하세요.',
                maxLength: {
                  value: 6,
                  message:
                    '인증번호는 6자리 숫자입니다. 이메일을 확인해주세요.',
                },
              })}
            />
            <Btn type="submit" name="SUBMIT" CLASSNAME="submit-btn" />
            <Errors errors={errors} />
            <FindLink />
          </Cont>
        </form>
      )}
      {loading && <LoadingModal type="verify-token" zIndex={1} />}
    </>
  );
};
const Cont = styled(Box)``;
