import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Btn } from '../../Tools/Button';
import { IEditUser, IUserForm } from '../../types/user';
import { InputWrap } from '../../Tools/Input';

export const DeleteUser_Form = ({ dataWrap }: IEditUser) => {
  const type = dataWrap.type;
  const post = dataWrap.post;
  const theme = dataWrap.theme;
  const loading = dataWrap.loading;
  const setLoading = dataWrap.setLoading;
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });
  //
  const onValid = ({ userId }: IUserForm) => {
    if (loading) return;
    if (!userId) return;
    setLoading(true);
    return post({ userId: userId.toUpperCase() });
  };
  //
  return (
    <>
      {type === 'delete' && (
        <Cont onSubmit={handleSubmit(onValid)}>
          <InputWrap
            id="userId"
            type="text"
            theme={theme}
            label="USER ID"
            watch={Boolean(watch('userId'))}
            error={errors.userId?.message}
            register={register('userId', {
              required: '아이디를 입력해 주세요.',
            })}
          />
          <Btn theme={theme} name="Delete" type="submit" />
        </Cont>
      )}
    </>
  );
};
const Cont = styled.form`
  gap: 15px;
`;
