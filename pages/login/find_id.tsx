import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { Input } from '../../src/components/Input';
import useMutation from '../../src/libs/client/useMutation';
import { IFindIdRes, ITokenRes } from '../../src/types/login';
import { FindIdPageCont } from '../../styles/defaultStyle';
import { Form } from '../../styles/formStyle';

const Find_Id: NextPage = () => {
  //Post
  const [postFindId, { loading, data }] = useMutation<IFindIdRes>(
    `/api/user/login/find/userId`
  );
  console.log(data);
  const [postToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<ITokenRes>(`/api/user/login/find/tokenAuth`);

  //Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({ mode: 'onSubmit' });
  const onValid = ({ email }: any) => {
    if (loading) return;
    if (!email) setError('email', { message: '이메일을 입력해주세요.' });
    reset();
    return postFindId(email);
  };
  //
  const onTokenValid = ({ token }: any) => {
    if (tokenLoading) return;
    if (data?.ok) {
      if (!token) setError('token', { message: '토큰을 입력해주세요.' });
      return postToken(token);
    }
  };
  //
  return (
    <FindIdPageCont>
      {!data?.ok ? (
        <Form onSubmit={handleSubmit(onValid)}>
          <Input
            type="text"
            name="email"
            label="Email"
            placeholder="이메일을 입력하세요."
            errMsg={errors.email?.message}
            register={register('email', { required: '이메일을 입력하세요.' })}
          />
          <Btn type="submit" btnName="아이디 찾기" loading={loading} />
        </Form>
      ) : (
        <Form onSubmit={handleSubmit(onTokenValid)}>
          <Input
            type="text"
            name="token"
            label="Token"
            placeholder="6자리 토큰번호를 입력하세요."
            errMsg={errors.token?.message}
            register={register('token', {
              required: '6자리 토큰번호를 입력하세요.',
            })}
          />
          <Btn type="submit" btnName="토큰 인증하기" loading={tokenLoading} />
        </Form>
      )}
    </FindIdPageCont>
  );
};

export default Find_Id;
