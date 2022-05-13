import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '../../libs/client/useMutation';
import { Error, Input } from '../Input';
import { Btn } from '../Btn';
import { ModalClose, ModalCont } from '../../../styles/modal-style';
import { Form } from '../../../styles/join-style';

interface IIDModalForm {
  checkID?: string;
}

export const IdCheckModal = ({
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
  console.log(data?.userId);
  //
  return (
    <>
      <Cont>
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
          <article className="pass">
            {!data?.error && data?.userId && (
              <>
                <h2>"{data?.userId}"는 사용가능한 아이디 입니다.</h2>
                <p>사용하시겠습니까?</p>
                <div className="btn-wrap">
                  <Btn type="button" btnName="YES" onClick={confirmClick} />
                  <Btn type="button" btnName="NO" onClick={backClick} />
                </div>
              </>
            )}
          </article>
        )}
        {submit && data?.error && (
          <article className="error">
            <Error>{data?.error}</Error>
            <Btn type="button" onClick={backClick} btnName="아이디 재확인" />
          </article>
        )}
      </Cont>
      <ModalClose onClick={toggleCheckModal} />
    </>
  );
};

const Cont = styled(ModalCont)`
  .pass,
  .error {
    width: 60%;
    text-align: center;
  }
  .pass {
    .btn-wrap {
      display: flex;
      gap: 10px;
    }
  }
`;
