import styled from '@emotion/styled';
import { Box } from './Update/UserId';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Heading } from './Create/Heading';
import { useEffect, useState } from 'react';
import { IUserForm } from '../../types/user';
import { ConfirmModal } from '../Tools/Modal';
import useUser from '../../libs/client/useUser';
import { IconBtn } from '../Tools/Button/Icon';
import useMutation from '../../libs/client/useMutation';
import { ErrorMsg } from '../Tools/Errors';

export const DeleteUser = () => {
  const [delModal, setDelModal] = useState(false);
  const router = useRouter();
  const { loggedInUser } = useUser();
  const [deleteAcct, { data, loading }] = useMutation(
    `/api/user/${loggedInUser?.id}/delete`
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });

  const onValid = ({ userId }: IUserForm) => {
    if (loading) return;
    return deleteAcct({ userId });
  };
  useEffect(() => {
    if (data?.error) alert(data.error);
    if (data?.ok) {
      alert('계정이 삭제되었습니다.');
      router.push('/');
    }
  }, [data, router]);
  return (
    <>
      <Cont>
        <form onSubmit={handleSubmit(onValid)}>
          <Heading type="delete-acct" h1="Delete Account (계정삭제)" />
          <IconBtn
            size="2rem"
            type="button"
            svgType="trash"
            onClick={() => setDelModal((p: boolean) => !p)}
          />
          {delModal && (
            <ConfirmModal
              watch={watch}
              loading={loading}
              type="delete-user"
              register={register}
              closeModal={setDelModal}
            />
          )}
        </form>
        {errors.userId && <ErrorMsg error={errors.userId.message} />}
      </Cont>
    </>
  );
};
const Cont = styled(Box)`
  width: 400px;
  padding: 20px;
  max-width: 400px;
  min-height: 100px;
  color: ${(p) => p.theme.color.logo};
  .heading {
    margin: 0 auto;
    .flex {
      gap: 8px;
      h1 {
        font-size: 1.4rem;
      }
    }
  }
`;
