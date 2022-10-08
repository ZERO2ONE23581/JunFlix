import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { IUserForm } from '../../../types/user';
import { ITheme } from '../../../../styles/theme';
import { InputWrap } from '../../../Tools/Input';
import useUser from '../../../libs/client/useUser';
import { Dispatch, SetStateAction, useEffect } from 'react';
import styled from '@emotion/styled';

interface IUserIdForm extends ITheme {
  loading: boolean;
  update: ({}) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export const Edit_UserId = ({
  theme,
  setLoading,
  loading,
  update,
}: IUserIdForm) => {
  const { loggedInUser } = useUser();
  const userId = loggedInUser?.userId;
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });
  //
  useEffect(() => {
    if (userId) setValue('userId', userId);
  }, [userId, setValue]);
  //
  const onValid = ({ userId }: IUserForm) => {
    if (loading) return;
    setLoading(true);
    if (userId) return update({ userId: userId.toUpperCase() });
  };
  //
  return (
    <>
      <Cont onSubmit={handleSubmit(onValid)}>
        <InputWrap
          type="text"
          id="userId"
          theme={theme}
          label="User ID"
          watch={watch('userId')}
          error={errors.userId?.message}
          register={register('userId', {
            required: '아이디를 입력해주세요.',
            pattern: {
              value: /^[A-Za-z]+[A-Za-z0-9]{5,19}$/g,
              message:
                '아이디는 기호를 제외한 영문자 또는 6~20자리 숫자를 포함해야합니다.',
            },
          })}
        />
        <Btn theme={theme} name="Update" type="submit" />
      </Cont>
    </>
  );
};
const Cont = styled.form`
  gap: 15px;
`;
