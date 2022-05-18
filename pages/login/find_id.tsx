import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { Btn } from '../../src/components/Btn';
import { Input } from '../../src/components/Input';
import useMutation from '../../src/libs/client/useMutation';
import { IFindIdRes } from '../../src/types/login';
import { FindIdPageCont } from '../../styles/defaultStyle';
import { Form } from '../../styles/formStyle';

const Find_Id: NextPage = () => {
  //Post
  const [postFindId, { loading, data }] = useMutation<IFindIdRes>(
    `/api/user/login/findId`
  );

  //Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });
  const onValid = ({ email }: any) => {
    if (loading) return;
    postFindId(email);
  };
  //
  return (
    <FindIdPageCont>
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
    </FindIdPageCont>
  );
};

export default Find_Id;
