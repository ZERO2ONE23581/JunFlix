import { useEffect } from 'react';
import { Btn } from '../../Style/Button';
import { useForm } from 'react-hook-form';
import { InputWrap } from '../../Style/Input';
import { ErrorMsg } from '../../Style/ErrMsg';
import useMutation from '../../../libs/client/useMutation';
import { Form, Info, JoinCont } from '../../../../styles/global';
import {
  IUserIdCheckForm,
  IUserIdCheckProps,
  IUserIdCheckRes,
} from '../../../types/join';

export const CheckUserId = ({
  setSavedUserID,
  setOpenCreateUser,
}: IUserIdCheckProps) => {
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
    if (data?.ok && data.userId) {
      setOpenCreateUser((p: boolean) => !p);
      setSavedUserID(data.userId);
    }
  }, [data, setOpenCreateUser, setSavedUserID]);
  return (
    <JoinCont>
      <h1>Create Your Account</h1>
      <h2>Step 1. 사용할 아이디를 입력해주세요.</h2>
      <Form onSubmit={handleSubmit(onValid)}>
        <InputWrap
          watch={watch('userId')}
          id="userId"
          type="text"
          label="USER ID"
          inputErrMsg={errors.userId?.message}
          register={register('userId', {
            required: '아이디를 입력해주세요.',
            pattern: {
              value: /^[A-Za-z]+[A-Za-z0-9]{5,19}$/g,
              message:
                '* 아이디는 기호를 제외한 영문자 또는 6~20자리 숫자를 포함해야합니다.',
            },
          })}
        />
        {data?.error && <ErrorMsg error={data.error} />}
        <Btn type="submit" name="중복확인" loading={loading} />
        <Info>
          <span>* 아이디는 기호를 제외한 영문자 또는 6~20자리 숫자</span>
          <span style={{ marginLeft: '10px' }}>를 포함해야합니다.</span>
          <span>* 아이디는 대소문자를 구분하지 않습니다.</span>
        </Info>
      </Form>
    </JoinCont>
  );
};
