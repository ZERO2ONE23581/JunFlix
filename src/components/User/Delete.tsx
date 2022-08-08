import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { IUserForm } from '../../types/user';
import { ConfirmModal } from '../Tools/Modal';
import useUser from '../../libs/client/useUser';
import { IconBtn } from '../Tools/Button/Icon';
import useMutation from '../../libs/client/useMutation';
import { Errors } from '../Tools/Errors';
import { Title } from './Create/Title';
import { Box } from '../../../styles/global';
import { UserBox } from './Update/UserId';
import { Svg } from '../Tools/Svg';

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
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <Svg type="danger" size="2rem" fill={'red'} />
          <Title type="delete-account" eng="Delete Account" />
          <IconBtn
            size="2rem"
            type="button"
            svgType="trash"
            onClick={() => setDelModal((p: boolean) => !p)}
          />
        </Cont>
        {delModal && (
          <ConfirmModal
            watch={watch}
            loading={loading}
            type="delete-user"
            register={register}
            closeModal={setDelModal}
          />
        )}
        <Errors errors={errors} />
      </form>
    </>
  );
};
const Cont = styled(UserBox)`
  width: 400px;
  height: 100px;
  padding: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${(p) => p.theme.color.logo};
  border: thick double ${(p) => p.theme.color.logo};
`;
