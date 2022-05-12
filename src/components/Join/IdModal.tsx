import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '../../../pages/join';
import { useMutation } from '../../libs/client/useMutation';
import { Error, Input } from '../Input';

export const IdModal = ({
  handleData,
  userId,
  confirmClick,
  toggleClick,
}: any) => {
  //POST API
  const [postCheck, { loading, data, error }] = useMutation(
    '/api/user/join/userId_check'
  );

  //FORM SUBMIT
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onValid = ({ checkID }: any) => {
    if (loading) return;
    postCheck(checkID);
    setResult((p) => !p);
    // reset();
  };

  //GET VALUE
  useEffect(() => {
    setValue('checkID', userId);
    if (data?.ok) {
      setValue('userId', data?.userId);
      setValue('checkID', data?.userId);
      const value = getValues('checkID');
      handleData(value);
    }
    if (data?.error) {
      setValue('checkID', data?.userId);
    }
  }, [userId, data]);

  const [result, setResult] = useState(false);
  const clickRewrite = () => {
    setResult((p) => !p);
  };
  //
  return (
    <>
      <ModalCont>
        <button onClick={toggleClick}>❌</button>

        {result && data?.error && (
          <>
            <Error>{data?.error}</Error>
            <button onClick={clickRewrite}>Back</button>
          </>
        )}
        {result ? (
          <>
            {!data?.error && data?.userId && (
              <>
                <h2>
                  "{data?.userId}"는 사용가능한 아이디 입니다. 사용하시겠습니까?
                </h2>
                <button onClick={confirmClick}>YES</button>
                <button onClick={clickRewrite}>NO</button>
              </>
            )}
          </>
        ) : (
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register('checkID')}
              type="text"
              placeholder="아이디를 입력해주세요."
            />
            <button type="submit">
              {loading ? 'Loading...' : '아이디 중복체크'}
            </button>
          </Form>
        )}
      </ModalCont>
      <ModalClose onClick={toggleClick} />
    </>
  );
};
export const ModalCont = styled.article`
  position: absolute;
  top: 0;
  left: 0;
  //
  background-color: whitesmoke;
  z-index: 999;
  width: 700px;
  height: 300px;
`;
export const ModalClose = styled.article`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
`;
