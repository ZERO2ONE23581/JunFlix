import {
  IUserIdCheckForm,
  IUserIdCheckProps,
  IUserIdCheckRes,
} from '../../../../types/join';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Btn } from '../../../Style/Button';
import useMutation from '../../../../libs/client/useMutation';
import { Errors, Form, FormCont, Input } from '../../../../../styles/global';

export const CheckUserId = ({
  confirmId,
  setConfirmId,
  setUserId,
}: IUserIdCheckProps) => {
  const [checkUserId, { loading, data }] = useMutation<IUserIdCheckRes>(
    '/api/user/check/user_id'
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserIdCheckForm>({
    mode: 'onSubmit',
  });
  const onValid = (userId: IUserIdCheckForm) => {
    if (loading) return;
    checkUserId(userId);
  };
  useEffect(() => {
    if (data?.ok) {
      setConfirmId((p: boolean) => !p);
      setUserId(data.userId);
    }
  }, [data, setConfirmId, setUserId]);

  //
  return (
    <>
      {!confirmId && (
        <FormCont>
          <h1>Create Your Account</h1>
          <h2>Step 1</h2>
          <Form onSubmit={handleSubmit(onValid)}>
            <div className="flex">
              <label htmlFor="userId" />
              <Input
                {...register('userId', {
                  required: '아이디를 입력해주세요.',
                  pattern: {
                    value: /^[A-Za-z]+[A-Za-z0-9]{5,19}$/g,
                    message: 'userid message',
                  },
                })}
                id="userId"
                name="userId"
                type="text"
                placeholder="User ID"
              />
              <Btn type="submit" name="아이디 제출" loading={loading} />
            </div>
            {errors.userId && (
              <Errors>
                <span>아이디는 기호를 제외한 영문자 또는 6~20자리</span>
                <span>숫자를 포함해야합니다!</span>
              </Errors>
            )}
            {data?.error && <Errors>{data?.error}</Errors>}
            <span className="info">
              * 아이디는 기호를 제외한 영문자 또는 6~20자리
              <br />
              숫자를 포함해야합니다.
            </span>
          </Form>
        </FormCont>
      )}
    </>
  );
};
