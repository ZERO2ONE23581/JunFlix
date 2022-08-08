import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputWrap } from '../../Tools/Input';
import useMutation from '../../../libs/client/useMutation';
import { Errors } from '../../Tools/Errors';
import { Btn } from '../../Tools/Button';
import { IUserIdCheckForm, IUserIdCheckRes } from '../../../types/user';
import { Box } from '../../../../styles/global';
import { LoginLink } from '../Read/Links/Login';
import styled from '@emotion/styled';
import { Title } from './Title';
import { LoadingModal } from '../../Tools/Modal/Loading';

interface ICreateId {
  setUserId: Dispatch<SetStateAction<boolean>>;
  setSaveId: Dispatch<SetStateAction<string>>;
}
export const CreateId = ({ setSaveId, setUserId }: ICreateId) => {
  const [checkUserId, { loading, data }] = useMutation<IUserIdCheckRes>(
    '/api/user/check/user_id'
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserIdCheckForm>({
    mode: 'onSubmit',
  });
  const onValid = ({ userId }: IUserIdCheckForm) => {
    if (loading) return;
    checkUserId(userId.toUpperCase());
  };
  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok && data.userId) {
      setUserId((p: boolean) => !p);
      setSaveId(data.userId);
    }
  }, [data, setUserId, setSaveId]);

  return (
    <>
      {!loading && (
        <form onSubmit={handleSubmit(onValid)}>
          <Cont>
            <Title type="create-user-id" eng="Create Account" kor="계정생성" />
            <h2>
              <span>Step 1.</span>
              <span className="kor">아이디 중복확인</span>
              <span>Check your ID</span>
            </h2>
            <InputWrap
              id="userId"
              type="text"
              label="USER ID"
              watch={watch('userId')}
              register={register('userId', {
                required: '아이디를 입력해주세요.',
                pattern: {
                  value: /^[A-Za-z]+[A-Za-z0-9]{5,19}$/g,
                  message:
                    '* 아이디는 기호를 제외한 영문자 또는 6~20자리 숫자를 포함해야합니다.',
                },
              })}
            />
            <Btn name="Check" type="submit" CLASSNAME="submit" />
            <LoginLink />
            <Errors errors={errors} />
          </Cont>
        </form>
      )}
      {loading && <LoadingModal type="loading" zIndex={1} />}
    </>
  );
};
const Cont = styled(Box)`
  max-width: 440px;
  .submit {
    margin-top: 12px;
  }
`;
