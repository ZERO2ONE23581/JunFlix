import { useForm } from 'react-hook-form';
import { Btn } from '../../../Tools/Button';
import { InputWrap } from '../../../Tools/Input';
import { Form } from '../../../../styles/global';
import { ICreateUser, IUserIdForm } from '../../../types/user';
import { LoginLink } from '../../../Tools/login_link';

export const CreateUserId = ({ wrap, isType }: ICreateUser) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserIdForm>({ mode: 'onSubmit' });
  //
  const onValid = ({ userId }: IUserIdForm) => {
    wrap.setLoading(true);
    if (wrap.loading) return;
    wrap.post({ userId: userId.toUpperCase() });
  };
  //
  return (
    <>
      {isType && (
        <>
          <Form onSubmit={handleSubmit(onValid)}>
            <InputWrap
              id="userId"
              type="text"
              theme={wrap.theme}
              label="USER ID"
              watch={Boolean(watch('userId'))}
              register={register('userId', {
                required: '아이디를 입력해주세요.',
                pattern: {
                  value: /^[A-Za-z]+[A-Za-z0-9]{5,19}$/g,
                  msg: '아이디는 기호를 제외한 영문자 또는 6~20자리 숫자를 포함해야합니다.',
                },
              })}
              error={errors.userId?.msg}
            />
            <Btn item={{ theme: wrap.theme, name: 'Submit' }} type="submit" />
          </Form>
          <LoginLink theme={wrap.theme} />
        </>
      )}
    </>
  );
};
