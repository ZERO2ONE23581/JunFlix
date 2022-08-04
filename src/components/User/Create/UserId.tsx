import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputWrap } from '../../Tools/Input';
import useMutation from '../../../libs/client/useMutation';
import { IUserIdCheckForm, IUserIdCheckRes } from '../../../types/join';
import { IconBtn } from '../../Tools/Button/Icon';
import styled from '@emotion/styled';
import { LoginLink } from '../Read/Links/Login';
import { Heading } from './Heading';
import { Errors } from '../../Tools/Errors';

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
      <Heading
        type="createId"
        h1="Create Account"
        h2="Step 1. Check ID (아이디 중복확인)"
      />
      <form onSubmit={handleSubmit(onValid)}>
        <Flex>
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
          <IconBtn size="2.5rem" type="submit" svgType="circle-arrow" />
        </Flex>
      </form>
      <LoginLink />
      <Errors errors={errors} />
    </>
  );
};
const Flex = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
`;
