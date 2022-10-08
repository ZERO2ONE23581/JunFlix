import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { IUserForm } from '../../../types/user';
import { ITheme } from '../../../../styles/theme';
import { InputWrap } from '../../../Tools/Input';
import useUser from '../../../libs/client/useUser';
import { Dispatch, SetStateAction, useEffect } from 'react';
import styled from '@emotion/styled';

interface IPasswordForm extends ITheme {
  loading: boolean;
  remove: ({}) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export const Delete_User = ({
  theme,
  remove,
  loading,
  setLoading,
}: IPasswordForm) => {
  const { loggedInUser } = useUser();
  const userId = loggedInUser?.userId;
  const {
    watch,
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });
  //
  const onValid = ({ userId }: IUserForm) => {
    if (loading) return;
    if (!userId) return;
    setLoading(true);
    return remove({ userId: userId.toUpperCase() });
  };
  //
  return (
    <>
      <Cont onSubmit={handleSubmit(onValid)}>
        <InputWrap
          id="userId"
          type="text"
          theme={theme}
          label="USER ID"
          watch={watch('userId')}
          error={errors.userId?.message}
          register={register('userId', {
            required: '아이디를 입력해 주세요.',
          })}
        />
        <Btn theme={theme} name="Delete" type="submit" />
      </Cont>
    </>
  );
};
const Cont = styled.form`
  gap: 15px;
`;
