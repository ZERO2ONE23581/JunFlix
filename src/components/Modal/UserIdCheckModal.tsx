import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../Input';
import { Btn } from '../Btn';
import {
  ModalClose,
  ModalCont,
  UserIdCheckModalCont,
} from '../../../styles/components/modal';
import useMutation from '../../libs/client/useMutation';
import { ErrMsg, Flex, Form } from '../../../styles/components/default';

interface IIDModalForm {
  checkID?: string;
}

export const UserIdCheckModal = ({
  handleData,
  userId,
  confirmClick,
  toggleCheckModal,
  confirm,
}: any) => {
  //Post api
  const [postCheck, { loading, data }] = useMutation(
    '/api/user/join/userId_check'
  );

  //Submit Form
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IIDModalForm>({ mode: 'onSubmit' });

  const onValid = ({ checkID }: IIDModalForm) => {
    if (loading) return;
    postCheck(checkID);
    setSubmit((p) => !p);
    //로딩 -> fecth Post -> close modal
  };

  //Modal Control
  const [submit, setSubmit] = useState(false);
  const backClick = () => {
    setSubmit((p) => !p);
  };

  //Setting
  useEffect(() => {
    //초기모달 인풋데이터 === 회원가입폼 프랍데이터
    setValue('checkID', userId);
    //에러 발생뒤 뒤로가기 버튼 누를시
    if (data?.error) {
      setValue('checkID', data?.userId);
    }
    if (data?.ok) {
      //데이터 fetch로 받은후, 인풋데이터 = 받은데이터
      setValue('checkID', data?.userId);
      handleData(getValues('checkID'));
    }
  }, [data]);
  //
  return (
    <>
      <UserIdCheckModalCont>
        <Btn type="toggle" onClick={toggleCheckModal} btnName={'❌'} />
        {loading && <h2>Loading...</h2>}
        {!submit ? (
          <Form onSubmit={handleSubmit(onValid)}>
            <Input
              register={register('checkID', {
                required: '아이디를 입력해주세요.',
              })}
              type="text"
              name="checkID"
              placeholder="아이디를 입력해주세요."
              errMsg={errors.checkID?.message}
            />
            <Btn
              type="submit"
              btnName={
                loading
                  ? 'Loading...'
                  : confirm
                  ? '아이디 재확인'
                  : '아이디 중복체크'
              }
            />
          </Form>
        ) : (
          <>
            {!data?.error && data?.userId && (
              <SuccessCont>
                <h2>
                  <span>"{data?.userId}"</span> 은 사용가능한 아이디 입니다.
                </h2>
                <span>사용하시겠습니까?</span>
                <Flex>
                  <Btn type="idCheck" btnName="YES" onClick={confirmClick} />
                  <Btn type="idCheck" btnName="NO" onClick={backClick} />
                </Flex>
              </SuccessCont>
            )}
          </>
        )}
        {submit && data?.error && (
          <ErrCont>
            <ErrMsg>{data?.error}</ErrMsg>
            <Btn type="button" onClick={backClick} btnName="아이디 재확인" />
          </ErrCont>
        )}
      </UserIdCheckModalCont>
      <ModalClose onClick={toggleCheckModal} />
    </>
  );
};
const ErrCont = styled.article`
  padding: 0 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    font-weight: 600;
    font-size: 1.2rem;
  }
`;
const SuccessCont = styled(ErrCont)`
  padding: 0 50px;
  gap: 10px;
  h2 {
    text-align: center;
    span {
      color: ${(p) => p.theme.color.ok};
      font-weight: 600;
      font-style: italic;
    }
  }
`;
