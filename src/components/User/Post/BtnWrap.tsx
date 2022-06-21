import styled from '@emotion/styled';
import { Btn } from '../../Style/Button';
import { Dispatch, SetStateAction } from 'react';

interface IBtnWrapProps {
  next: boolean;
  loading: boolean | null;
  setNext: Dispatch<SetStateAction<boolean>>;
  openModal: Dispatch<SetStateAction<boolean>>;
}
export const BtnWrap = ({
  next,
  loading,
  setNext,
  openModal,
}: IBtnWrapProps) => {
  return (
    <>
      <Cont>
        {!next ? (
          <Btn type="button" name="BACK" onClick={() => openModal(true)} />
        ) : (
          <Btn type="button" name="Back" onClick={() => setNext(false)} />
        )}
        <h1>Create Post</h1>
        {!next && (
          <Btn type="button" name="Next" onClick={() => setNext(true)} />
        )}
        {next && <Btn type="submit" name="포스트 생성" loading={loading} />}
      </Cont>
    </>
  );
};
const Cont = styled.article`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #404040;
  h1 {
    font-weight: 600;
    font-size: 1.5rem;
  }
  button {
    padding: 6px 15px;
  }
`;
