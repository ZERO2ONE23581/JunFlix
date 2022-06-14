import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Errors, Form, FormCont, Input } from '../../../../styles/global';
import useMutation from '../../../libs/client/useMutation';
import { MutationRes } from '../../../types/mutation';
import { Btn } from '../../Button/def';

interface IUserIdCheckForm {
  userId: string;
}
interface IUserIdCheckProps {
  confirmId: boolean;
  setConfirmId: any;
  setUserId: any;
}
interface IUserIdCheckRes extends MutationRes {
  userId?: string;
}
export const UserIdCheck = ({
  confirmId,
  setConfirmId,
  setUserId,
}: IUserIdCheckProps) => {
  const [checkUserId, { loading, data }] =
    useMutation<IUserIdCheckRes>('/api/join/id_check');
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
        <JoinFormCont>
          <h1>Create Your Account</h1>
          <h2>Step 1</h2>
          <Form onSubmit={handleSubmit(onValid)}>
            <div className="flex">
              <label htmlFor="userId" />
              <Input
                {...register('userId', {
                  required: '아이디를 입력해주세요.',
                  pattern: {
                    value: /^[a-z]+[a-z0-9]{5,19}$/g,
                    message:
                      '아이디는 기호를 제외한 영문자 또는 6~20자리 숫자를 포함해야합니다.',
                  },
                })}
                id="userId"
                name="userId"
                type="text"
                placeholder="User ID"
              />
              <Btn type="submit" name="아이디 제출" loading={loading} />
            </div>
            {errors.userId && <Errors>{errors.userId?.message}</Errors>}
            {data?.error && <Errors>{data?.error}</Errors>}
            <span className="info">
              * 아이디는 기호를 제외한 영문자 또는 6~20자리 숫자를
              포함해야합니다.
            </span>
          </Form>
        </JoinFormCont>
      )}
    </>
  );
};
export const JoinFormCont = styled(FormCont)`
  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
  }
  form {
    h3 {
      font-size: 0.9rem;
      font-weight: 600;
    }
    .user-id {
      color: #b2bec3;
    }
    .flex {
      gap: 20px;
      width: 100%;
      display: flex;
      align-items: center;
      input {
        width: 80%;
      }
    }
  }
`;
