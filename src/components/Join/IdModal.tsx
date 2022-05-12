import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '../../../pages/join';
import { useMutation } from '../../libs/client/useMutation';
import { Error } from '../Input';

export const IdModal = ({ userId, confirmClick, toggleClick }: any) => {
  //POST API
  const [postCheck, { loading, data, error }] = useMutation(
    '/api/user/join/userId_check'
  );

  //FORM SUBMIT
  const { register, handleSubmit, setValue } = useForm();
  const onValid = ({ checkID }: any) => {
    if (loading) return;
    postCheck(checkID);
  };

  //GET VALUE
  useEffect(() => {
    setValue('checkID', userId);
    if (data?.ok) {
      setValue('userId', data?.userId);
    }
  }, [userId, data]);

  //
  return (
    <>
      <ModalCont>
        <button onClick={toggleClick}>❌</button>

        {data?.error && <Error>{data?.error}</Error>}
        {data?.ok ? (
          <>
            <h1>"{data?.userId}"는 사용가능한 아이디 입니다.</h1>
            <h2>사용하시겠습니까?</h2>
            <button onClick={confirmClick}>YES</button>
            <button onClick={confirmClick}>NO</button>
          </>
        ) : (
          <Form onSubmit={handleSubmit(onValid)}>
            <input {...register('checkID')} type="text" />
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
