import styled from '@emotion/styled';
import Link from 'next/link';

export const JoinModal = ({ toggleClick }: any) => {
  return (
    <>
      <ModalCont>
        <button onClick={toggleClick}>❌</button>
        <h1>회원가입이 성공적으로 완료되었습니다.</h1>
        <h2>로그인 페이지로 이동하시겠습니까?</h2>
        <div>
          <button>
            <Link href="/login">
              <a>
                <span>YES</span>
              </a>
            </Link>
          </button>
          <button>
            <Link href="/">
              <a>
                <span>NO</span>
              </a>
            </Link>
          </button>
        </div>
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
