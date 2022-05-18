import type { NextPage } from 'next';
import { Btn } from '../../src/components/Btn';
import { Input } from '../../src/components/Input';
import { Form } from '../../styles/formStyle';

const Find_Pw: NextPage = () => {
  //

  return (
    <>
      <Form>
        <Input placeholder="아이디를 입력하세요." />
        <Btn type="submit" btnName="비밀번호 찾기" />
      </Form>
    </>
  );
};

export default Find_Pw;
