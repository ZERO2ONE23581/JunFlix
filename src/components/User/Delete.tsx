import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { IUserForm } from '../../types/user';
import { ConfirmModal } from '../../Tools/Modal';
import useUser from '../../libs/client/useUser';
import useMutation from '../../libs/client/useMutation';
import { Errors } from '../../Tools/Errors';
import { UserBox } from './Update/UserId og';
import { Svg } from '../../Tools/Svg';
import { Answer } from '../../Tools/Modal/Answer';
import { Btn } from '../../Tools/Button';

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
  const [answer, setAnswer] = useState(false);
  return (
    <>
      {answer && <Answer type="delete-account" closeModal={setAnswer} />}
      <form onSubmit={handleSubmit(onValid)}>
        <Cont>
          <h1>
            <Svg size="2rem" type="danger" onClick={() => setAnswer(true)} />
            <span>계정 삭제</span>
            <span className="small">DELETE ACCOUNT</span>
          </h1>
          <Btn name="DELETE" type="button" onClick={() => setDelModal(true)} />
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
  h1 {
    span {
      font-size: 1.3em;
    }
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  width: 300px;
  height: 200px;
`;
