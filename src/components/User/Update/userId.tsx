import { useForm } from 'react-hook-form';
import { IEditUser, IUserForm } from '../../../types/user';
import { InputWrap } from '../../../Tools/Input';
import { Btn } from '../../../Tools/Button';
import { Form } from '../../../../styles/global';

export const UserId_Form = ({ dataWrap }: IEditUser) => {
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
  const onValid = async ({ userId }: IUserForm) => {
    setLoading(true);
    if (loading) return;
    return post({ userId });
  };
  //
  return (
    <>
      {type === 'userId' && (
        <Form onSubmit={handleSubmit(onValid)}>
          <InputWrap
            type="text"
            id="userId"
            theme={theme}
            label="User ID"
            error={errors.userId?.message}
            watch={Boolean(watch('userId'))}
            register={register('userId', {
              required: '아이디를 입력해주세요.',
              pattern: {
                value: /^[A-Za-z]+[A-Za-z0-9]{5,19}$/g,
                message:
                  '아이디는 기호를 제외한 영문자 또는 6~20자리 숫자를 포함해야합니다.',
              },
            })}
          />
          <Btn item={{ theme, name: 'Edit' }} type="submit" />
        </Form>
      )}
    </>
  );
};
