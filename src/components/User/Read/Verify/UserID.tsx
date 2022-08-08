import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { Errors } from '../../../Tools/Errors';
import { InputWrap } from '../../../Tools/Input';
import { Dispatch, SetStateAction, useEffect } from 'react';
import useMutation from '../../../../libs/client/useMutation';
import { IFindForm, IFindPostRes } from '../../../../types/user';
import { Title } from '../../Create/Title';
import { Box } from '../../../../../styles/global';
import { LoadingModal } from '../../../Tools/Modal/Loading';
import { FindLink } from '../Links/Find';

interface IVerify {
  setToken: Dispatch<SetStateAction<boolean>>;
}
export const VerifyUserId = ({ setToken }: IVerify) => {
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
    if (loading) return;
    return verifyUserId(userId);
  };
  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok) setToken(data?.ok);
  }, [data, setToken]);
  return (
    <>
      {!loading && (
        <form onSubmit={handleSubmit(onValid)}>
          <Box>
            <Title type="verify-id" kor="비밀번호 찾기" eng="Find Password" />
            <h2>
              <span>Step 1.</span>
              <span className="kor">아이디 인증하기</span>
              <span>Verify your id</span>
            </h2>
            <InputWrap
              watch={watch('userId')}
              type="text"
              id="userId"
              label="USER ID"
              register={register('userId', {
                required: '아이디를 입력해주세요.',
              })}
            />
            <Btn
              type="submit"
              loading={loading}
              name="SUBMIT"
              CLASSNAME="submit-btn"
            />
            <Errors errors={errors} />
            <FindLink />
          </Box>
        </form>
      )}
      {loading && <LoadingModal type="verify-id" zIndex={1} />}
    </>
  );
};
