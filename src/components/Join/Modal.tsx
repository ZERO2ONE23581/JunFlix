import Link from 'next/link';
import { ModalClose, ModalCont } from '../../../styles/modal-style';

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
