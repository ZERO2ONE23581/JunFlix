import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Btn } from '../Button';
import { Dispatch, SetStateAction } from 'react';
import { AnswerModal, DimBackground } from '../../../../styles/global';
import useUser from '../../../libs/client/useUser';
import useMutation from '../../../libs/client/useMutation';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { IUserForm } from '../../../types/user';
import { InputWrap } from '../Input';
import { IconBtn } from '../Button/IconBtn';
import { ErrorMsg } from '../ErrMsg';
import { LoadingModal } from './LoadingModal';

interface IDelModal {
  setDelAcct: Dispatch<SetStateAction<boolean>>;
}
export const DelModal = ({ setDelAcct }: IDelModal) => {
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
      {!loading && (
        <form onSubmit={handleSubmit(onValid)}>
          <Cont>
            <IconBtn
              size="2rem"
              type="button"
              svgType="close"
              onClick={() => setDelAcct(false)}
            />
            <span>삭제를 하려면 아이디를 인증하세요.</span>
            <span>Please verify your id to delete this account.</span>
            <Flex>
              <InputWrap
                id="userId"
                type="text"
                label="Verify ID"
                watch={watch('userId')}
                register={register('userId', {
                  required: '계정을 삭제하려면 아이디를 입력해주세요.',
                })}
              />
              <Btn name="Delete" type="submit" />
            </Flex>
          </Cont>
          {errors.userId && (
            <ErrorMsg type="delete" error={errors.userId?.message} />
          )}
        </form>
      )}
      {loading && (
        <LoadingModal
          zIndex={111}
          text={{ kor: '계정 삭제중...', eng: 'Deleting account...' }}
        />
      )}
      <DimBackground zIndex={1} onClick={() => setDelAcct(false)} />
    </>
  );
};
const Cont = styled(AnswerModal)`
  opacity: 1;
  .close {
    top: 8px;
    right: 8px;
    position: absolute;
  }
`;
const Flex = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  margin: 20px 0;
`;
