import Link from 'next/link';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../Style/Button';
import { useForm } from 'react-hook-form';
import { ErrorMsg } from '../../Style/ErrMsg';
import { InputWrap } from '../../Style/Input';
import { MutationRes } from '../../../types/mutation';
import useMutation from '../../../libs/client/useMutation';
import { Form, FormCont, Info } from '../../../../styles/global';
import { IEditProfileProps, IEditUserIdForm } from '../../../types/user';

export const EditUserId = ({ user }: IEditProfileProps) => {
  const router = useRouter();
  const [editUserId, { loading, data }] = useMutation<MutationRes>(
    `/api/user/${user?.id}/edit/user_id`
  );
  const {
    watch,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditUserIdForm>({ mode: 'onSubmit' });
  const isValue = (type: string | any) => Boolean(getValues(type));

  const onValid = ({ userId }: IEditUserIdForm) => {
    if (loading) return;
    const userID = userId?.toUpperCase();
    return editUserId({ userID });
  };
  useEffect(() => {
    if (user?.userId) setValue('userId', user?.userId);
    if (data?.ok) {
      alert('회원님의 아이디가 수정되었습니다.');
      router.reload();
    }
  }, [user, data, router, setValue]);
  return (
    <Cont>
      <h1>Edit ID</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <InputWrap
          id="userId"
          type="text"
          label="User ID"
          watch={watch('userId')}
          isValue={isValue('userId')}
          inputErrMsg={errors.userId?.message}
          register={register('userId', {
            required: '새로운 아이디를 입력해주세요.',
          })}
        />
        {data?.error && <ErrorMsg error={data.error} />}
        <Btn name="아이디 수정" type="submit" loading={loading} />
      </Form>
      <FindID>
        <span>아이디가 기억나지 않습니까?</span>
        <span>
          <Link href="/user/login/find/user_id">
            <a>&rarr; 아이디 찾기</a>
          </Link>
        </span>
      </FindID>
    </Cont>
  );
};
export const Cont = styled(FormCont)``;

const FindID = styled(Info)`
  margin-top: 20px;
  a {
    :hover {
      color: ${(p) => p.theme.color.font};
      font-weight: 600;
    }
  }
`;
